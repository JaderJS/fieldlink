// packages/storage/src/cleanup.ts

export type CleanupCandidate = {
	id: string;
	objectKey: string;
};

export type StorageCleanupRepository = {
	claimOrphans(input: {
		olderThan: Date;
		limit: number;
	}): Promise<CleanupCandidate[]>;

	markDeleted(id: string): Promise<void>;

	markDeleteFailed(id: string, error: string): Promise<void>;
};

export async function cleanupOrphanedObjects(input: {
	storage: {
		deleteObject(key: string): Promise<void>;
	};
	repository: StorageCleanupRepository;
	olderThan: Date;
	limit?: number;
}) {
	const candidates = await input.repository.claimOrphans({
		olderThan: input.olderThan,
		limit: input.limit ?? 100,
	});

	const results = {
		deleted: 0,
		failed: 0,
	};

	for (const candidate of candidates) {
		try {
			await input.storage.deleteObject(candidate.objectKey);
			await input.repository.markDeleted(candidate.id);
			results.deleted++;
		} catch (error) {
			results.failed++;

			await input.repository.markDeleteFailed(
				candidate.id,
				error instanceof Error ? error.message : "Unknown storage error",
			);
		}
	}

	return results;
}
