import z from "zod";

export const loadStorageSchema = z.object({
	S3_BUCKET: z.string(),
	S3_BUCKET_ASSETS: z.string(),
	S3_REGION: z.string(),
	S3_ENDPOINT: z.url(),
	S3_ACCESS_KEY_ID: z.string(),
	S3_SECRET_ACCESS_KEY: z.string(),
	S3_FORCE_PATH_STYLE: z.stringbool().default(true),
	S3_PUBLIC_BASE_URL: z.url().optional(),
	S3_MAX_FILE_SIZE_BYTES: z.coerce.number().default(25 * 1024 * 1024),
	S3_UPLOAD_URL_EXPIRES_IN: z.coerce.number().default(300),
	S3_DOWNLOAD_URL_EXPIRE_IN: z.coerce.number().default(300),
});

export type StorageConfig = z.infer<typeof loadStorageConfig>;

export const loadStorageConfig = (env: unknown) => loadStorageSchema.parse(env);
