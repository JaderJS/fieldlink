export abstract class AppError extends Error {
	abstract readonly code: string;
	abstract readonly status: number;

	readonly details?: unknown;

	constructor(
		message: string,
		options?: {
			details?: unknown;
		},
	) {
		super(message);

		this.name = new.target.name;
		this.details = options?.details;

		Error.captureStackTrace?.(this, new.target);
	}
}
