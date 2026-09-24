export class OrderError extends Error {
	constructor(
		message: string,
		public readonly code: string,
	) {
		super(message);
		this.name = "RadioError";
	}
}

export class NotFoundError extends OrderError {
	constructor(resource: string, id: string) {
		super(`${resource} '${id}' was not found`, "NOT_FOUND");
	}
}

export class ConflictError extends OrderError {
	constructor(message: string) {
		super(message, "CONFLICT");
	}
}

export class ValidationError extends OrderError {
	constructor(message: string) {
		super(message, "VALIDATION_ERROR");
	}
}
