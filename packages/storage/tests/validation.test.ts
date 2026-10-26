import { describe, expect, test } from "bun:test";
import { validateFileBuffer, validateFileMetadata } from "../src/validation";

describe("validateFileMetadata", () => {
	const maxSize = 1024;

	test.each([
		"image/jpeg",
		"image/png",
		"image/webp",
		"image/gif",
		"image/avif",
		"application/pdf",
		"text/plain",
		"text/csv",
	])("aceita o MIME type %s", (contentType) => {
		expect(() =>
			validateFileMetadata({
				contentType,
				size: 100,
				maxSize,
			}),
		).not.toThrow();
	});

	test("rejeita tipos não permitidos", () => {
		expect(() =>
			validateFileMetadata({
				contentType: "application/x-executable",
				size: 100,
				maxSize,
			}),
		).toThrow("File type not allowed");
	});

	test.each([0, -1, 1.5, Number.NaN, Number.POSITIVE_INFINITY])(
		"rejeita tamanho inválido: %s",
		(size) => {
			expect(() =>
				validateFileMetadata({
					contentType: "text/plain",
					size,
					maxSize,
				}),
			).toThrow("Invalid file size");
		},
	);

	test("rejeita arquivo maior que o limite", () => {
		expect(() =>
			validateFileMetadata({
				contentType: "text/plain",
				size: maxSize + 1,
				maxSize,
			}),
		).toThrow("Invalid file size");
	});

	test("aceita arquivo exatamente no limite", () => {
		expect(() =>
			validateFileMetadata({
				contentType: "text/plain",
				size: maxSize,
				maxSize,
			}),
		).not.toThrow();
	});
});

describe("validateFileBuffer", () => {
	test("aceita texto UTF-8 válido", () => {
		const buffer = new TextEncoder().encode("Olá, mundo!");

		expect(validateFileBuffer(buffer, "text/plain")).resolves.toBeUndefined();
	});

	test("rejeita conteúdo textual com byte nulo", () => {
		const buffer = new Uint8Array([65, 0, 66]);

		expect(validateFileBuffer(buffer, "text/plain")).rejects.toThrow(
			"Invalid text file",
		);
	});

	test("rejeita texto com UTF-8 inválido", () => {
		const buffer = new Uint8Array([0xc3, 0x28]);

		expect(validateFileBuffer(buffer, "text/plain")).rejects.toThrow();
	});

	test("rejeita assinatura binária incompatível com o MIME declarado", () => {
		// Assinatura PNG válida.
		const png = new Uint8Array([
			0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d,
			0x49, 0x48, 0x44, 0x52,
		]);

		expect(validateFileBuffer(png, "image/jpeg")).rejects.toThrow(
			"File content does not match declared MIME type",
		);
	});

	test("rejeita conteúdo binário sem assinatura reconhecível", () => {
		const buffer = new Uint8Array([1, 2, 3, 4, 5]);

		expect(validateFileBuffer(buffer, "application/pdf")).rejects.toThrow(
			"Unable to verify file signature",
		);
	});
});
