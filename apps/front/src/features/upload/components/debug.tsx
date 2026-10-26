import { Input } from "@/components/ui/input";
import { useInputFile } from "../hooks/use.input.file";

export const InputFileDebug = () => {
	const { inputRef, inputProps } = useInputFile({ accept: ".pdf" });

	return (
		<div>
			<input {...inputProps} ref={inputRef} type="file" />
		</div>
	);
};
