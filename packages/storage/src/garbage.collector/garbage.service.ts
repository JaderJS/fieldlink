type CreateGarbageCollectorDeps = {
	repository: {
		findExpiredObjects(
			limit: number,
		): Promise<{ id: string; objectKey: string }[]>;
		findDeletePendingObjects(): Promise<{ id: string; objectKey: string }[]>;
		markDeleteObjects(ids: string[]): Promise<void>;
	};
	storage: {
		delete(objectKey: string): Promise<void>;
	};
};

export function createGarbageCollector({
	repository,
	storage,
}: CreateGarbageCollectorDeps) {
	async function run() {
		const expired = await repository.findExpiredObjects(100);
		const deletePending = await repository.findDeletePendingObjects();

		const candidates = [...expired, ...deletePending];

		const result = {
			scanned: candidates.length,
			deleted: 0,
			skipped: 0,
			failed: 0,
		};

		const markDeleteIds = [];

		for (const candidate of candidates) {
			try {
				await storage.delete(candidate.objectKey);
				markDeleteIds.push(candidate.id);
				result.deleted++;
			} catch (error) {
				result.failed++;
			}
		}
		await repository.markDeleteObjects(markDeleteIds);
	}

	return {
		run,
	};
}
