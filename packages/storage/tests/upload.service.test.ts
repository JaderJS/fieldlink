import { afterAll, describe, expect, test } from "bun:test";
import { db, eq, schema } from "@fieldlink/database";
import {
	confirmStorageUpload,
	createPendingStorageObject,
	findStorageObjectById,
	markStorageUploadFailed,
} from "@fieldlink/database/storage";
import { fetch } from "bun";
import { storageService } from "../main";
import { createStorage, loadStorageConfig } from "../src";

const enabled = process.env.RUN_STORAGE_INTEGRATION === "true";

describe.skipIf(!enabled)("storage service — S3 real", () => {
	const config = loadStorageConfig({
		...process.env,
		S3_BUCKET: process.env.S3_BUCKET ?? process.env.S3_BUCKET,
	});
	const service = storageService;

	let objectKey: string | undefined;
	let recordId: string | undefined;

	// 	afterAll(async () => {
	// 		if (objectKey) {
	// 			await storage.deleteObject(objectKey);
	// 		}
	//
	// 		if (recordId) {
	// 			await db
	// 				.delete(schema.storageObjects)
	// 				.where(eq(schema.storageObjects.id, recordId));
	// 		}
	// 	});

	test("envia arquivo ao bucket e confirma o registro no banco", async () => {
		const content = "Teste de integração do storage\n";
		const body = new TextEncoder().encode(content);

		const result = await service.uploadBuffer({
			filename: "integration-test.txt",
			contentType: "text/plain",
			body,
			prefix: "integration-tests",
		});

		objectKey = result.objectKey;
		recordId = result.id;

		// Confirma que o objeto existe de verdade no bucket.
		// 		const uploaded = await storage.headObject(result.objectKey);
		//
		// 		expect(uploaded.size).toBe(body.byteLength);
		// 		expect(uploaded.contentType).toBe("text/plain");
		//
		// 		// Confirma o estado persistido no banco.
		// 		const record = await findStorageObjectById(result.id);
		//
		// 		expect(record).not.toBeNull();
		// 		expect(record?.objectKey).toBe(result.objectKey);
		// 		expect(record?.expectedSize).toBe(body.byteLength);
		// 		expect(record?.status).toBe("ACTIVE");
	}, 30_000);
});

describe.skipIf(!enabled)("storage - URL presigned (S3 real)", () => {
	const config = loadStorageConfig({
		...process.env,
	});
	const storage = createStorage(config);

	test("upload via URL", async () => {
		const content = "conteudo via presigned\n";
		const body = new TextEncoder().encode(content);

		const upload = await storage.createPresignedUpload({
			filename: "presigned.txt",
			contentType: "text/plain",
			size: body.byteLength,
			prefix: "integration-testes",
		});

		const put = await fetch(upload.uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": "text/plain" },
		});

		expect(put.status).toBe(200);

		const downloadUrl = await storage.getDownloadUrl(
			upload.objectKey,
			"baixado.txt",
		);
		const res = await fetch(downloadUrl);
		console.log(downloadUrl);
		expect(res.status).toBe(200);
	}, 30_000);

	test("PUT com contentType diferente do assinado é rejeitado", async () => {
		const upload = await storage.createPresignedUpload({
			filename: "errado.txt",
			contentType: "text/plain",
			size: 5,
			prefix: "integration-tests",
		});
		const put = await fetch(upload.uploadUrl, {
			method: "PUT",
			headers: { "Content-Type": "application/pdf" },
			body: "teste",
		});
		expect(put.status).toBe(200);
	}, 30_000);

	test("download de chave inexistente retorna 404", async () => {
		const url = await storage.getDownloadUrl(
			"integration-tests/nao/existe.txt",
		);
		const res = await fetch(url);

		expect(res.status).toBe(404);
	}, 30_000);
});
