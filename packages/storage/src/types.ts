import type z from "zod";
import type { loadStorageSchema } from "./config";

export type StorageConfig = z.infer<typeof loadStorageSchema>;

export type PresignedUploadInput = {
	filename: string;
	contentType: string;
	size: number;
	prefix?: string;
};

export type PresignedUploadResult = {
	objectKey: string;
	uploadUrl: string;
	expiresIn: number;
	originalName: string;
	contentType: string;
	size: number;
};

export type StoredObject = {
	objectKey: string;
	contentType: string;
	size: number;
	etag?: string;
};
