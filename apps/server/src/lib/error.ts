import Elysia from "elysia";
import { ZodError } from "zod";
import { AppError } from "../core/error/_index";

type Issue = {
	path?: unknown; // string ("/a/b") ou array (["a", "b"])
	message?: string;
	summary?: string;
	code?: string;
};

type ErrorBody = {
	msg: string;
	error: {
		code: string;
		message: string;
		details?: unknown;
	};
};

function formatPath(path: unknown): string {
	if (Array.isArray(path)) {
		return path
			.map((segment) =>
				typeof segment === "object" && segment !== null && "key" in segment
					? String((segment as { key: unknown }).key)
					: String(segment),
			)
			.join(".");
	}

	if (typeof path === "string") {
		return path.replace(/^\//, "").replaceAll("/", ".");
	}

	return "";
}

function formatIssues(issues: Issue[]) {
	return issues.map((issue) => ({
		field: formatPath(issue.path) || "root",
		message: issue.summary ?? issue.message ?? "Valor inválido",
		code: issue.code,
	}));
}

function errorResponse(
	code: string,
	message: string,
	options: { msg?: string; details?: unknown } = {},
): ErrorBody {
	return {
		msg: options.msg ?? message,
		error: {
			code,
			message,
			...(options.details !== undefined && { details: options.details }),
		},
	};
}

function validationMsg(details: ReturnType<typeof formatIssues>) {
	const first = details[0];
	if (!first) return "Dados inválidos";

	const base =
		first.field === "root" ? first.message : `${first.field}: ${first.message}`;
	const extra = details.length - 1;

	return extra > 0 ? `${base} (+${extra} erro${extra > 1 ? "s" : ""})` : base;
}

export const handleError = new Elysia()
	.onError(({ error, set, code }) => {
		console.log(error);
		if (code === "VALIDATION" || error instanceof ZodError) {
			set.status = 422;

			const issues =
				error instanceof ZodError
					? error.issues
					: ((error as { all?: Issue[] }).all ?? []);

			const details = formatIssues(issues as Issue[]);

			return errorResponse("VALIDATION_ERROR", "Dados inválidos", {
				msg: validationMsg(details),
				details,
			});
		}

		if (error instanceof AppError) {
			set.status = 400;
			return errorResponse(error.code, error.message, {
				details: error.details,
			});
		}

		set.status = 500;
		return errorResponse(
			"INTERNAL_SERVER_ERROR",
			"An unexpected error occurred",
			{ msg: "Erro interno, tente novamente mais tarde" },
		);
	})
	.as("global");
