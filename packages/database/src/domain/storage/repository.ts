import { and, asc, eq, inArray, lte, or } from "drizzle-orm";
import {
	type StorageEntityType,
	storageAttachments,
	storageEntityTypes,
	storageObjects,
} from "@/db/storage/table";
import { db } from "@/main";

const DEFAULT_ORPHAN_RETENTION_DAYS = 7;

const assertEntityType: (value: string) => asserts value is StorageEntityType =
	(value) => {
		if (!storageEntityTypes.includes(value as StorageEntityType)) {
			throw new Error(`Invalid storage entity type: ${value}`);
		}
	};

export async function findStorageObjectById(id: string) {
	const [object] = await db
		.select({
			id: storageObjects.id,
			objectKey: storageObjects.objectKey,
			originalName: storageObjects.originalName,
			expectedSize: storageObjects.expectedSize,
			contentType: storageObjects.contentType,
			status: storageObjects.status,
		})
		.from(storageObjects)
		.where(eq(storageObjects.id, id))
		.limit(1);

	return object ?? null;
}

export const createPendingStorageObject = async (input: {
	objectKey: string;
	originalName: string;
	contentType: string;
	expectedSize: number;
	bucket: string;
	isPrivate: boolean;
}) => {
	const [object] = await db
		.insert(storageObjects)
		.values({
			objectKey: input.objectKey,
			contentType: input.contentType,
			originalName: input.originalName,
			expectedSize: input.expectedSize,
			size: 0,
			status: "PENDING",
			isLocked: false,
			bucket: input.bucket,
			isPrivate: input.isPrivate,
		})
		.returning();

	if (!object) {
		throw new Error("Failed to create storage object");
	}
	return object;
};

export const confirmStorageUpload = async (input: {
	id: string;
	verifiedSize: number;
	verifiedContentType: string;
}) => {
	return db.transaction(async (tx) => {
		const [object] = await tx
			.select()
			.from(storageObjects)
			.where(and(eq(storageObjects.id, input.id)))
			.for("update")
			.limit(1);
		if (!object) {
			throw new Error("Storage object not found");
		}
		if (object.status !== "PENDING") {
			throw new Error(`Cannot confirm upload from status ${object.status}`);
		}

		if (input.verifiedSize !== object.expectedSize) {
			throw new Error("Uploaded file size does not match");
		}

		if (input.verifiedContentType !== object.contentType) {
			throw new Error("Uploaded file type does not match");
		}

		const now = new Date();

		const [updated] = await tx
			.update(storageObjects)
			.set({
				status: "ACTIVE",
				size: input.verifiedSize,
				contentType: input.verifiedContentType,
			})
			.where(eq(storageObjects.id, object.id))
			.returning();

		if (!updated) {
			throw new Error("Failed to confirm storage upload");
		}

		return updated;
	});
};

export const attachStorageObject = async (input: {
	storageObjectId: string;
	entityType: string;
	entityId: string;
	purpose?: string;
}) => {
	assertEntityType(input.entityType);

	return db.transaction(async (tx) => {
		const [object] = await tx
			.select()
			.from(storageObjects)
			.where(eq(storageObjects.id, input.storageObjectId))
			.for("update")
			.limit(1);

		if (!object) {
			throw new Error("Storage object not found");
		}

		if (object.status !== "ACTIVE") {
			throw new Error("Only active objects can be attached");
		}

		await tx
			.insert(storageAttachments)
			.values({
				storageObjectId: object.id,
				entityType: input.entityType,
				entityId: input.entityId,
			})
			.onConflictDoNothing();

		const [attachment] = await tx
			.select()
			.from(storageAttachments)
			.where(
				and(
					eq(storageAttachments.storageObjectId, object.id),
					eq(storageAttachments.entityType, input.entityType),
					eq(storageAttachments.entityId, input.entityId),
				),
			)
			.limit(1);

		if (!attachment) {
			throw new Error("Failed to create storage attachment");
		}
		await tx
			.select()
			.from(storageObjects)
			.where(eq(storageObjects.id, object.id));

		return attachment;
	});
};

export const detachStorageObject = async (input: {
	storageObjectId: string;
	entityType: StorageEntityType;
	entityId: string;
	retentionDays?: number;
}) => {
	assertEntityType(input.entityType);

	return db.transaction(async (tx) => {
		const [object] = await tx
			.select()
			.from(storageObjects)
			.where(eq(storageObjects.id, input.storageObjectId))
			.for("update")
			.limit(1);

		if (!object) {
			throw new Error("Storage object not found");
		}

		if (object.status !== "ACTIVE") {
			throw new Error("Only active objects can be detached");
		}

		const [removed] = await tx
			.delete(storageAttachments)
			.where(
				and(
					eq(storageAttachments.storageObjectId, object.id),
					eq(storageAttachments.entityType, input.entityType),
					eq(storageAttachments.entityId, input.entityId),
				),
			)
			.returning({ id: storageAttachments.id });

		if (!removed) {
			return {
				detached: false,
			};
		}

		const [remaining] = await tx
			.select({ id: storageAttachments.id })
			.from(storageAttachments)
			.where(eq(storageAttachments.storageObjectId, object.id))
			.limit(1);

		const deleteAfter = remaining
			? null
			: new Date(
					Date.now() +
						(input.retentionDays ?? DEFAULT_ORPHAN_RETENTION_DAYS) *
							24 *
							60 *
							60 *
							1000,
				);

		await tx
			.select()
			.from(storageObjects)
			.where(eq(storageObjects.id, object.id));

		return {
			detached: true,
			deleteAfter,
		};
	});
};

export type StorageCleanupCandidate = {
	id: string;
	objectKey: string;
};

/**
 * Reserva objetos sem vínculos para exclusão.
 *
 * pendingBefore: uploads abandonados.
 * orphanBefore: objetos não utilizados há tempo suficiente.
 * retryBefore: exclusões que falharam anteriormente.
 */
export async function claimStorageCleanupCandidates(input: {
	pendingBefore: Date;
	orphanBefore: Date;
	retryBefore: Date;
	limit?: number;
}): Promise<StorageCleanupCandidate[]> {
	const limit = input.limit ?? 100;

	return db.transaction(async (tx) => {
		const candidates = await tx
			.select({
				id: storageObjects.id,
				objectKey: storageObjects.objectKey,
				status: storageObjects.status,
			})
			.from(storageObjects)
			.where(
				or(
					and(
						eq(storageObjects.status, "PENDING"),
						lte(storageObjects.createdAt, input.pendingBefore),
					),
					and(eq(storageObjects.status, "FAILED")),
					and(eq(storageObjects.status, "DELETED_PENDING")),
				),
			)
			.orderBy(asc(storageObjects.createdAt))
			.limit(limit)
			.for("update", { skipLocked: true });

		const claimed: StorageCleanupCandidate[] = [];

		for (const candidate of candidates) {
			const [attachment] = await tx
				.select({ id: storageAttachments.id })
				.from(storageAttachments)
				.where(eq(storageAttachments.storageObjectId, candidate.id))
				.limit(1);

			if (attachment) {
				continue;
			}

			const [reserved] = await tx
				.update(storageObjects)
				.set({
					status: "DELETED_PENDING",
				})
				.where(eq(storageObjects.id, candidate.id))
				.returning({
					id: storageObjects.id,
					objectKey: storageObjects.objectKey,
				});

			if (reserved) {
				claimed.push(reserved);
			}
		}

		return claimed;
	});
}

/**
 * Registra a conclusão da exclusão física.
 */
export async function markStorageObjectDeleted(id: string) {
	const now = new Date();

	const [updated] = await db
		.update(storageObjects)
		.set({
			status: "DELETED",
		})
		.where(
			and(
				eq(storageObjects.id, id),
				eq(storageObjects.status, "DELETED_PENDING"),
			),
		)
		.returning();

	if (!updated) {
		throw new Error("Storage object was not in DELETE_PENDING state");
	}

	return updated;
}

/**
 * Registra a falha, preservando o estado para nova tentativa.
 */
export async function markStorageDeletionFailed(id: string, error: string) {
	const [updated] = await db
		.select()
		.from(storageObjects)
		.where(
			and(
				eq(storageObjects.id, id),
				eq(storageObjects.status, "DELETED_PENDING"),
			),
		);

	return updated ?? null;
}

export async function markStorageUploadFailed({
	id,
	reason,
}: {
	id: string;
	reason: string;
}) {
	const [updated] = await db
		.select()
		.from(storageObjects)
		.where(
			and(
				eq(storageObjects.id, id),
				eq(storageObjects.status, "DELETED_PENDING"),
			),
		);

	return updated ?? null;
}

export async function findDeletePendingObjects() {
	const rows = await db
		.select()
		.from(storageObjects)
		.where(
			and(
				eq(storageObjects.isLocked, false),
				eq(storageObjects.status, "DELETED_PENDING"),
			),
		);

	return rows;
}

export async function findExpiredObjects(limitInDays: number) {
	const now = new Date(Date.now() - 24 * 60 * limitInDays * 1000);
	const rows = await db
		.select()
		.from(storageObjects)
		.where(
			and(
				eq(storageObjects.isLocked, false),
				eq(storageObjects.status, "PENDING"),
				lte(storageObjects.createdAt, now),
			),
		);

	return rows;
}

export async function markDeleteObjects(ids: string[]) {
	if (ids.length === 0) return;

	await db
		.update(storageObjects)
		.set({ status: "DELETED" })
		.where(and(inArray(storageObjects.id, ids)));
}
