import {
	confirmStorageUpload,
	createPendingStorageObject,
	findStorageObjectById,
	markStorageUploadFailed,
} from "@fieldlink/database/storage";
import {
	findDeletePendingObjects,
	findExpiredObjects,
	markDeleteObjects,
} from "node_modules/@fieldlink/database/src/domain/storage/repository";
import { createGarbageCollector } from "@/garbage.collector/garbage.service";
import { createStorage, loadStorageConfig } from "./src";
import { createStorageService } from "./src/storage.services";

export const storageService = createStorageService({
	storage: createStorage(
		loadStorageConfig({
			...process.env,
			S3_BUCKET: process.env.S3_BUCKET ?? process.env.S3_BUCKET,
		}),
		"private",
	),
	repository: {
		createPendingStorageObject: createPendingStorageObject,
		markStorageUploadFailed: markStorageUploadFailed,
		findStorageObjectById: findStorageObjectById,
		confirmStorageUpload: confirmStorageUpload,
	},
});

export const assetStorageService = createStorageService({
	storage: createStorage(
		loadStorageConfig({
			...process.env,
			S3_BUCKET: process.env.S3_BUCKET ?? process.env.S3_BUCKET,
		}),
		"assets",
	),
	repository: {
		createPendingStorageObject: createPendingStorageObject,
		markStorageUploadFailed: markStorageUploadFailed,
		findStorageObjectById: findStorageObjectById,
		confirmStorageUpload: confirmStorageUpload,
	},
});

export const garbageCollectorService = createGarbageCollector({
	storage: {
		delete: async (objectKey) => {
			const s = createStorage(
				loadStorageConfig({
					...process.env,
					S3_BUCKET: process.env.S3_BUCKET ?? process.env.S3_BUCKET,
				}),
				"assets",
			);
			await s.deleteObject(objectKey);
		},
	},
	repository: {
		findDeletePendingObjects: findDeletePendingObjects,
		findExpiredObjects: findExpiredObjects,
		markDeleteObjects: markDeleteObjects,
	},
});
