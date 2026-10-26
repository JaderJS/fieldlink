import { AppError } from "./_index";

export class NotFoundError extends AppError {
	readonly code = "NOT_FOUND";
	readonly status = 404;

	constructor(resource: string, id?: string) {
		super(
			id
				? `${resource} with id "${id}" was not found`
				: `${resource} was not found`,
			{
				details: {
					resource,
					id,
				},
			},
		);
	}
}
