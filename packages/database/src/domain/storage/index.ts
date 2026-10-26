export type { StorageEntityType } from "@/db/storage/table";

export {
	storageAttachments,
	storageEntityTypes,
	storageObjects,
} from "@/db/storage/table";

export type { StorageCleanupCandidate } from "./repository";

export {
	attachStorageObject,
	claimStorageCleanupCandidates,
	confirmStorageUpload,
	createPendingStorageObject,
	detachStorageObject,
	findStorageObjectById,
	markStorageDeletionFailed,
	markStorageObjectDeleted,
	markStorageUploadFailed,
} from "./repository";
