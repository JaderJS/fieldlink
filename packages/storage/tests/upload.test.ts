import { describe, expect, test } from "bun:test";
import type { StorageConfig } from "../src/types";
import { createStorage } from "../src/uploads";

const config: StorageConfig = {
	bucket: "test-bucket",
	region: "us-east-1",
	accessKeyId: "test-access-key",
	secretAccessKey: "test-secret-key",
	maxFileSizeBytes: 1024,
	uploadUrlExpiresIn: 120,
	downloadUrlExpiresIn: 180,
};

describe("createStorage", () => {
	test("gera URL pré-assinada para upload", async () => {
		const storage = createStorage(config);

		const result = await storage.createPresignedUpload({
			filename: "relatório.pdf",
			contentType: "application/pdf",
			size: 100,
		});

		expect(result.uploadUrl).toStartWith("https://");
		expect(result.objectKey).toMatch(/^uploads\/[0-9a-f-]+\/relatorio\.pdf$/i);
		expect(result.originalName).toBe("relatorio.pdf");
		expect(result.contentType).toBe("application/pdf");
		expect(result.size).toBe(100);
		expect(result.expiresIn).toBe(120);
	});

	test("usa o prefixo personalizado na chave", async () => {
		const storage = createStorage(config);

		const result = await storage.createPresignedUpload({
			filename: "foto.png",
			contentType: "image/png",
			size: 100,
			prefix: "users/123",
		});

		expect(result.objectKey).toMatch(/^users\/123\/[0-9a-f-]+\/foto\.png$/i);
	});

	test("rejeita MIME type não permitido", async () => {
		const storage = createStorage(config);

		await expect(
			storage.createPresignedUpload({
				filename: "script.exe",
				contentType: "application/x-executable",
				size: 100,
			}),
		).rejects.toThrow("File type not allowed");
	});

	test("rejeita arquivo maior que o limite configurado", async () => {
		const storage = createStorage(config);

		await expect(
			storage.createPresignedUpload({
				filename: "grande.pdf",
				contentType: "application/pdf",
				size: 1025,
			}),
		).rejects.toThrow("Invalid file size");
	});

	test("rejeita tamanho zero", async () => {
		const storage = createStorage(config);

		await expect(
			storage.createPresignedUpload({
				filename: "vazio.pdf",
				contentType: "application/pdf",
				size: 0,
			}),
		).rejects.toThrow("Invalid file size");
	});

	test("gera URL pública codificando cada segmento da chave", () => {
		const storage = createStorage({
			...config,
			publicBaseUrl: "https://cdn.example.com/files",
		});

		expect(storage.getPublicUrl("uploads/user 1/arquivo.pdf")).toBe(
			"https://cdn.example.com/files/uploads/user%201/arquivo.pdf",
		);
	});

	test("aceita base URL terminada em barra", () => {
		const storage = createStorage({
			...config,
			publicBaseUrl: "https://cdn.example.com/files/",
		});

		expect(storage.getPublicUrl("uploads/arquivo.pdf")).toBe(
			"https://cdn.example.com/files/uploads/arquivo.pdf",
		);
	});

	test("falha se a URL pública não estiver configurada", () => {
		const storage = createStorage(config);

		expect(() => storage.getPublicUrl("uploads/arquivo.pdf")).toThrow(
			"Public URLs are not configured",
		);
	});

	test("rejeita upload binário com assinatura inválida", async () => {
		const storage = createStorage(config);

		await expect(
			storage.uploadBuffer({
				filename: "arquivo.pdf",
				contentType: "application/pdf",
				body: new Uint8Array([1, 2, 3, 4]),
			}),
		).rejects.toThrow("Unable to verify file signature");
	});

	test("rejeita upload cujo conteúdo não corresponde ao MIME", async () => {
		const storage = createStorage(config);

		const png = new Uint8Array([
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
			0x49, 0x48, 0x44, 0x52,
		]);

		await expect(
			storage.uploadBuffer({
				filename: "arquivo.jpg",
				contentType: "image/jpeg",
				body: png,
			}),
		).rejects.toThrow("File content does not match declared MIME type");
	});
});
