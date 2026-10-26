import { assetStorageService } from "@fieldlink/storage";
import Elysia, { t } from "elysia";
import z from "zod";
import { coreAuth } from "@/core/auth/auth";

export const handleStorageObject = new Elysia({
	prefix: "/storage",
	tags: ["Storage object"],
})
	.use(coreAuth)
	.post(
		"/upload",
		async ({ body }) => {
			const file = body.file;

			const buffer = new Uint8Array(await file.arrayBuffer());

			const { id, objectKey, confirmed, uploaded } =
				await assetStorageService.uploadBuffer({
					body: buffer,
					contentType: file.type || "application/octet-stream",
					filename: file.name,
					prefix: "integration-tests",
				});

			const url = assetStorageService.getPublicUrl(objectKey);

			return {
				msg: "Upload successfully",
				url: url,
				size: uploaded.size,
				contentType: uploaded.contentType,
				objectKey: uploaded.contentType,
			};
		},
		{
			auth: true,
			body: t.Object({
				file: t.File(),
			}),
			response: {
				200: z.object({
					msg: z.string(),
					url: z.url(),
					size: z.number(),
					objectKey: z.string(),
					contentType: z.string(),
				}),
			},
		},
	);
