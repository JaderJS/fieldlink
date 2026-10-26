import {
	DeleteObjectCommand,
	GetObjectCommand,
	HeadObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { createS3Client } from "./client";
import { createObjectKey, sanitizeFilename } from "./keys";
import type { StorageConfig } from "./types";
import { validateFileBuffer, validateFileMetadata } from "./validation";

export function createStorage(
	config: StorageConfig,
	bucketType: "assets" | "private",
) {
	const client = createS3Client(config);
	const maxSize = config.S3_MAX_FILE_SIZE_BYTES ?? 25 * 1024 * 1024;
	const bucket =
		bucketType === "assets" ? config.S3_BUCKET_ASSETS : config.S3_BUCKET;

	function validate(input: { contentType: string; size: number }) {
		validateFileMetadata({
			...input,
			maxSize,
		});
	}

	async function createPreassignedUpload(input: {
		filename: string;
		contentType: string;
		size: number;
		prefix?: string;
	}) {
		validate(input);

		const objectKey = createObjectKey(input.filename, input.prefix);

		const expiresIn = config.S3_UPLOAD_URL_EXPIRES_IN ?? 300;

		const uploadUrl = await getSignedUrl(
			client,
			new PutObjectCommand({
				Bucket: bucket,
				Key: objectKey,
				ContentType: input.contentType,
			}),
			{ expiresIn },
		);

		return {
			objectKey,
			uploadUrl,
			expiresIn,
			originalName: sanitizeFilename(input.filename),
			contentType: input.contentType,
			size: input.size,
		};
	}

	async function uploadBuffer(input: {
		filename: string;
		contentType: string;
		body: Uint8Array;
		objectKey?: string;
		prefix?: string;
	}) {
		validate({
			contentType: input.contentType,
			size: input.body.byteLength,
		});

		await validateFileBuffer(input.body, input.contentType);

		const objectKey =
			input.objectKey ?? createObjectKey(input.filename, input.prefix);

		await client.send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: objectKey,
				Body: input.body,
				ContentType: input.contentType,
			}),
		);

		return {
			objectKey,
			originalName: sanitizeFilename(input.filename),
			contentType: input.contentType,
			size: input.body.byteLength,
		};
	}

	async function headObject(objectKey: string) {
		const result = await client.send(
			new HeadObjectCommand({
				Bucket: bucket,
				Key: objectKey,
			}),
		);

		return {
			objectKey,
			contentType: result.ContentType ?? "application/octet-stream",
			size: result.ContentLength ?? 0,
			etag: result.ETag,
		};
	}

	async function getDownloadUrl(objectKey: string, filename?: string) {
		return getSignedUrl(
			client,
			new GetObjectCommand({
				Bucket: bucket,
				Key: objectKey,
				ResponseContentDisposition: filename
					? `attachment; filename="${sanitizeFilename(filename)}"`
					: undefined,
			}),
			{ expiresIn: config.S3_DOWNLOAD_URL_EXPIRE_IN ?? 300 },
		);
	}

	function getPublicUrl(objectKey: string) {
		if (!config.S3_PUBLIC_BASE_URL) {
			throw new Error("Public URLs are not configured");
		}

		const base = config.S3_PUBLIC_BASE_URL.endsWith("/")
			? config.S3_PUBLIC_BASE_URL
			: `${config.S3_PUBLIC_BASE_URL}/`;

		const encodedKey =
			`${bucket}/` + objectKey.split("/").map(encodeURIComponent).join("/");

		return new URL(encodedKey, base).toString();
	}

	async function deleteObject(objectKey: string) {
		await client.send(
			new DeleteObjectCommand({
				Bucket: bucket,
				Key: objectKey,
			}),
		);
	}

	return {
		createPreassignedUpload,
		uploadBuffer,
		headObject,
		getDownloadUrl,
		getPublicUrl,
		deleteObject,
		bucket: bucket,
	};
}
