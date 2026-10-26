import type { PostgresJsDatabase } from "@fieldlink/database";

export type Db = PostgresJsDatabase;
export type Tx = Parameters<Parameters<Db["transaction"]>[0]>[0];

export type EventMetadata = Record<string, unknown>;

export interface DomainEvent<
	TType extends string = string,
	TPayload = unknown,
> {
	type: TType;
	payload: TPayload;
}

export type StoredEvent<E extends DomainEvent = DomainEvent> = E & {
	position: number;
	id: string;
	streamType: string;
	streamId: string;
	version: number;
	metadata: EventMetadata;
	occuredAt: Date;
};

export interface Aggregate<S, E extends DomainEvent> {
	streamType: string;
	initialState: () => S;
	evolve: (state: S, event: E) => S;
}

export interface Projection<E extends DomainEvent = DomainEvent> {
	name: string;
	streamType?: string[];
	handle(event: StoredEvent<E>, tx: Tx): Promise<void>;
}
