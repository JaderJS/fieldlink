export function fileValidate(
	file: File,
	accept?: string,
	maxSizeBytes = 10 * 1024 * 1024,
): string | undefined {
	if (file.size > maxSizeBytes) {
		return `O arquivo excede o limite de ${maxSizeBytes} bytes.`;
	}

	if (!accept) return undefined;

	const accepted = accept.split(",").some((rule) => {
		const value = rule.trim().toLowerCase();

		if (value.startsWith(".")) {
			return file.name.toLowerCase().endsWith(value);
		}

		if (value.endsWith("/*")) {
			return file.type.toLowerCase().startsWith(value.slice(0, -1));
		}

		return file.type.toLowerCase() === value;
	});

	return accepted ? undefined : "Tipo de arquivo não permitido.";
}
