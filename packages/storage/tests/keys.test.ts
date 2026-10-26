import { describe, expect, test } from "bun:test";
import { createObjectKey, sanitizeFilename } from "../src";

describe("sanitize file name", () => {
	test("remove acentos e normaliza nome", () => {
		expect(sanitizeFilename("relatório.pdf")).toBe("relatorio.pdf");
	});
	test("substitui separadores de caminho e caracteres inválidos", () => {
		expect(sanitizeFilename("../../meu arquivo?.pdf")).toBe("meu_arquivo_.pdf");
	});
	test("remove pontos e separadores nas extremidades", () => {
		expect(sanitizeFilename("..arquivo..")).toBe("arquivo");
		expect(sanitizeFilename("___arquivo___")).toBe("arquivo");
	});
	test("retorna file quando o nome fica vazio", () => {
		expect(sanitizeFilename("...")).toBe("file");
		expect(sanitizeFilename("")).toBe("file");
	});
	test("limita o nome a 180 caracteres", () => {
		expect(sanitizeFilename("a".repeat(200))).toHaveLength(180);
	});
});

describe("createObjectKey", () => {
	test("gera chave com prefixo padrão, UUID e nome sanitizado", () => {
		const key = createObjectKey("relatório.pdf");
		console.log("KEY", key);
		const parts = key.split("/");

		expect(parts).toHaveLength(3);
		expect(parts[0]).toBe("uploads");
		expect(parts[1]).toMatch(
			/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		);
		expect(parts[2]).toBe("relatorio.pdf");
	});

	test("normaliza prefixos personalizados", () => {
		const key = createObjectKey("foto.png", "/users/teste/");
		expect(key.startsWith("users/teste/")).toBe(true);
		expect(key.endsWith("/foto.png")).toBe(true);
	});

	test("usa uploads quando o prefixo não contém partes válidas", () => {
		const key = createObjectKey("foto.png", "///");
		expect(key.startsWith("uploads/")).toBe(true);
	});

	test("gera chaves diferentes para chamadas distintas", () => {
		const first = createObjectKey("foto.png");
		const second = createObjectKey("foto.png");

		expect(first).not.toBe(second);
	});
});
