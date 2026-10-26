/** Violação de regra de negócio (vira HTTP 422). */
export class DomainError extends Error {
	constructor(message: string) {
		super(message);
		this.name = new.target.name;
	}
}

export class ConcurrencyError extends Error {
	constructor(
		public readonly streamType: string,
		public readonly streamId: string,
		public readonly expectedVersion: number,
	) {
		super(
			`Conflito de versão em ${streamType}/${streamId} (esperado: ${expectedVersion})`,
		);
		this.name = "ConcurrencyError";
	}
}
