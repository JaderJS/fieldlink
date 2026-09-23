export class RadioError extends Error {
	constructor(
		message: string,
		public readonly code: string,
	) {
		super(message);
		this.name = "RadioError";
	}
}

export class NotFoundError extends RadioError {
	constructor(resource: string, id: string) {
		super(`${resource} '${id}' was not found`, "NOT_FOUND");
	}
}

export class ConflictError extends RadioError {
	constructor(message: string) {
		super(message, "CONFLICT");
	}
}

export class ValidationError extends RadioError {
	constructor(message: string) {
		super(message, "VALIDATION_ERROR");
	}
}
