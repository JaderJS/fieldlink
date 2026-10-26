import type { ZodError } from "zod";
import { toast } from "@/components/ui/toast";

type Issue = { path?: ReadonlyArray<PropertyKey>; message: string };

const formatPath = (path: ReadonlyArray<PropertyKey> = []) =>
	path.map(String).join(".") || "root";

export const issuesToJson = (issues: Issue[]) =>
	issues.reduce<Record<string, string[]>>((acc, issue) => {
		const key = formatPath(issue.path);
		(acc[key] ??= []).push(issue.message);
		return acc;
	}, {});

const showIssuesToast = (issues: Issue[]) => {
	const json = JSON.stringify(issuesToJson(issues), null, 2);
	toast.add({
		type: "Error",
		description: (
			<pre className="max-h-60 overflow-auto whitespace-pre-wrap text-xs">
				{json}
			</pre>
		),
	});
};

export const toastZodError = (error: ZodError) => showIssuesToast(error.issues);

export const toastFormErrors = (fieldErrors: Record<string, unknown[]>) => {
	const issues: Issue[] = Object.entries(fieldErrors).flatMap(
		([name, errors]) =>
			errors.map((e) => ({
				path: [name],
				message:
					typeof e === "string"
						? e
						: ((e as { message?: string })?.message ?? "Valor inválido"),
			})),
	);

	if (issues.length > 0) showIssuesToast(issues);
};
