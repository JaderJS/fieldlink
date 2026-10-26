import { ComponentProps, useCallback, useRef, useState } from "react";
import { fileValidate } from "../helpers/file.validate";

export type FileInputOptions = Omit<
	ComponentProps<"input">,
	"type" | "value" | "defaultValue" | "onChange"
> & {
	files?: File[];
	type?: "file";
	defaultFiles?: File[];
	onFilesChange?: (files: File[]) => void;
	maxFiles?: number;
	multiple?: boolean;
	maxSizeBytes?: number;
};

export type FileInputError = {
	file: File;
	message: string;
};

export function useInputFile({
	files: controlledFiles,
	defaultFiles = [],
	onFilesChange,
	accept,
	multiple = true,
	type = "file",
	maxFiles = 10,
	maxSizeBytes = 10 * 1024 * 1024,
	disabled = false,
	...props
}: FileInputOptions = {}) {
	const inputRef = useRef<HTMLInputElement>(null);

	const isControlled = controlledFiles !== undefined;

	const [internalFiles, setInternalFiles] = useState<File[]>(defaultFiles);
	const [errors, setErrors] = useState<FileInputError[]>([]);

	const files = isControlled ? controlledFiles : internalFiles;

	const commitFiles = useCallback(
		(nextFiles: File[]) => {
			if (!isControlled) {
				setInternalFiles(nextFiles);
			}

			onFilesChange?.(nextFiles);
		},
		[isControlled, onFilesChange],
	);

	const addFiles = useCallback(
		(fileList: FileList | File[]) => {
			if (disabled) return;

			const incoming = Array.from(fileList);
			const nextErrors: FileInputError[] = [];

			const baseFiles = multiple ? files : [];
			const limit = multiple ? maxFiles : 1;
			const available = Math.max(0, limit - baseFiles.length);
			const acceptedFiles: File[] = [];

			for (const file of incoming) {
				const error = fileValidate(file, accept, maxSizeBytes);
				if (error) {
					nextErrors.push({ file, message: error });
					continue;
				}

				if (acceptedFiles.length >= available) {
					nextErrors.push({
						file,
						message: `Limite de ${limit} arquivo(s) atingido.`,
					});
					continue;
				}

				acceptedFiles.push(file);
				if (!multiple) break;
			}

			if (!multiple && acceptedFiles.length === 0) {
				setErrors(nextErrors);
				return;
			}

			commitFiles([...baseFiles, ...acceptedFiles]);
			setErrors(nextErrors);
		},
		[accept, commitFiles, disabled, files, maxFiles, maxSizeBytes, multiple],
	);

	const removeFile = useCallback(
		(index: number) => {
			if (disabled) return;

			commitFiles(files.filter((_, i) => i !== index));
		},
		[commitFiles, disabled, files],
	);

	return {
		inputRef,
		inputProps: props,
		files,
		errors,
		isControlled,
		addFiles,
		removeFile,
	};
}
