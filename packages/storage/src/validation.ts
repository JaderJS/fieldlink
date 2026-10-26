import { fileTypeFromBuffer } from "file-type";

const ALLOWED_TYPES = new Set([
	"image/jpeg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/avif",
	"application/pdf",
	"text/plain",
	"text/csv",
]);

export function validateFileMetadata(input: {
	contentType: string;
	size: number;
	maxSize: number;
}) {
	if (!ALLOWED_TYPES.has(input.contentType)) {
		throw new Error("File type not allowed");
	}

	if (
		!Number.isSafeInteger(input.size) ||
		input.size <= 0 ||
		input.size > input.maxSize
	) {
		throw new Error("Invalid file size");
	}
}

export async function validateFileBuffer(
	buffer: Uint8Array,
	declaredType: string,
) {
	const detected = await fileTypeFromBuffer(buffer);

	if (detected && detected.mime !== declaredType) {
		throw new Error("File content does not match declared MIME type");
	}

	if (!detected && !declaredType.startsWith("text/")) {
		throw new Error("Unable to verify file signature");
	}

	if (declaredType.startsWith("text/")) {
		const text = new TextDecoder("utf-8", { fatal: true }).decode(buffer);

		if (text.includes("\0")) {
			throw new Error("Invalid text file");
		}
	}
}
