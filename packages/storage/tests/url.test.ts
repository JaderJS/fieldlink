import { describe, expect, test } from "bun:test";
import { loadStorageConfig } from "@/config";
import type { StorageConfig } from "@/types";
import { createStorage } from "@/uploads";

const baseConfig: StorageConfig = loadStorageConfig(process.env);

describe("get download URL", () => {
	test("gera URL assinada com a chave e expiração configurada", async () => {
		const storage = createStorage({ ...baseConfig, ...process.env });

		const url = new URL(
			await storage.getDownloadUrl("uploads/abc/relatorio.pdf"),
		);

		console.log(url);
		expect(url.protocol).toBe("https:");
		expect(url.pathname).toContain("uploads/abc/relatorio.pdf");
		expect(url.searchParams.get("X-Amz-Expires")).toBe("300");
		expect(url.searchParams.get("X-Amz-Algorithm")).toBe("AWS4-HMAC-SHA256");
		expect(url.searchParams.get("X-Amz-Signature")).toBeTruthy();
	});
});
