import { randomUUIDv7 } from "bun";

export function sanitizeFilename(filename: string): string {
	const normalized = filename
		.normalize("NFKD")
		.replace(/\p{Diacritic}/gu, "")
		.replace(/[/\\]/g, "_")
		.replace(/[^\p{L}\p{N}._-]/gu, "_")
		.replace(/\.{2,}/g, ".")
		.replace(/^[._-]+|[._-]+$/g, "")
		.slice(0, 180);

	return normalized || "file";
}

export function createObjectKey(filename: string, prefix = "uploads"): string {
	const safePrefix = prefix
		.split("/")
		.filter(Boolean)
		.map((part) => part.replace(/[^a-zA-Z0-9_-]/g, "_"))
		.join("/");

	return [
		safePrefix || "uploads",
		randomUUIDv7(),
		sanitizeFilename(filename),
	].join("/");
}
