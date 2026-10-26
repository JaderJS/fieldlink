import { createObjectKey, sanitizeFilename } from "./keys";
import type { createStorage } from "./uploads";

type PendingStorageObject = {
	id: string;
	objectKey: string;
	originalName: string;
	expectedSize: number;
	contentType: string;
	status: string;
};

type StorageRepository = {
	createPendingStorageObject(input: {
		objectKey: string;
		originalName: string;
		contentType: string;
		expectedSize: number;
		isPrivate: boolean;
		bucket: string;
	}): Promise<{ id: string; objectKey: string }>;

	findStorageObjectById(id: string): Promise<PendingStorageObject | null>;

	confirmStorageUpload(input: {
		id: string;
		verifiedSize: number;
		verifiedContentType: string;
	}): Promise<unknown>;

	markStorageUploadFailed(input: { id: string; reason: string }): Promise<void>;
};

type StorageClient = Pick<
	ReturnType<typeof createStorage>,
	| "createPreassignedUpload"
	| "uploadBuffer"
	| "headObject"
	| "getDownloadUrl"
	| "deleteObject"
	| "getPublicUrl"
	| "bucket"
>;

export type StorageErrorCode =
	| "NOT_FOUND"
	| "INVALID_STATE"
	| "OBJECT_MISSING"
	| "SIZE_MISMATCH"
	| "TYPE_MISMATCH";

export class StorageServiceError extends Error {
	readonly code: StorageErrorCode;

	constructor(code: StorageErrorCode, message: string) {
		super(message);
		this.name = "StorageServiceError";
		this.code = code;
	}
}

function isNotFound(error: unknown) {
	if (typeof error !== "object" || error === null) return false;

	const e = error as { name?: string; $metadata?: { httpStatusCode?: number } };

	return (
		e.name === "NotFound" ||
		e.name === "NoSuchKey" ||
		e.$metadata?.httpStatusCode === 404
	);
}

export function createStorageService(input: {
	storage: StorageClient;
	repository: StorageRepository;
}) {
	const { storage, repository } = input;

	async function markFailed({ id, reason }: { id: string; reason: string }) {
		await repository
			.markStorageUploadFailed({ id: id, reason: reason })
			.catch(() => {});
	}

	async function getRecord(id: string) {
		const record = await repository.findStorageObjectById(id);

		if (!record) {
			throw new StorageServiceError("NOT_FOUND", "Storage object not found");
		}

		return record;
	}

	async function uploadBuffer(file: {
		filename: string;
		contentType: string;
		body: Uint8Array;
		prefix?: string;
	}) {
		const objectKey = createObjectKey(file.filename, file.prefix);

		const pending = await repository.createPendingStorageObject({
			objectKey: objectKey,
			originalName: sanitizeFilename(file.filename),
			contentType: file.contentType,
			expectedSize: file.body.byteLength,
			bucket: storage.bucket,
			isPrivate: false,
		});

		await storage.uploadBuffer({ ...file, objectKey });

		const uploaded = await storage.headObject(objectKey);

		const confirmed = await repository.confirmStorageUpload({
			id: pending.id,
			verifiedSize: uploaded.size,
			verifiedContentType: uploaded.contentType,
		});

		return {
			id: pending.id,
			objectKey: objectKey,
			uploaded: uploaded,
			confirmed: confirmed,
		};
	}

	async function getDownloadUrl(id: string, filename?: string) {
		const record = await getRecord(id);

		if (record.status !== "ACTIVE") {
			throw new StorageServiceError(
				"INVALID_STATE",
				`Object is not available (status ${record.status})`,
			);
		}

		return storage.getDownloadUrl(
			record.objectKey,
			filename ?? record.originalName,
		);
	}

	return {
		uploadBuffer,
		getPublicUrl: storage.getPublicUrl,
		getDownloadUrl,
	};
}
