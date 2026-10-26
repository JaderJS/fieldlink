import { ConcurrencyError } from "./errors";
import type { EventStore } from "./store";
import type {
	Aggregate,
	DomainEvent,
	EventMetadata,
	StoredEvent,
} from "./types";

export async function loadAggregate<S, E extends DomainEvent>(
	store: EventStore,
	aggregate: Aggregate<S, E>,
	streamId: string,
	opts: { toVersion?: number; asOf?: Date } = {},
): Promise<{ state: S; version: number }> {
	const history = await store.load<E>(aggregate.streamType, streamId, opts);
	const state = history.reduce<S>(
		(s, e) => aggregate.evolve(s, e),
		aggregate.initialState(),
	);
	return { state, version: history.at(-1)?.version ?? 0 };
}

export async function execute<S, E extends DomainEvent>(
	store: EventStore,
	aggregate: Aggregate<S, E>,
	streamId: string,
	decide: (state: S) => E[],
	options: { metadata?: EventMetadata; maxRetries?: number } = {},
): Promise<StoredEvent<E>[]> {
	const maxRetries = options.maxRetries ?? 3;

	for (let attempt = 0; ; attempt++) {
		const { state, version } = await loadAggregate(store, aggregate, streamId);

		const newEvents = decide(state);

		try {
			return await store.append({
				streamType: aggregate.streamType,
				streamId: streamId,
				expectedVersion: version,
				events: newEvents,
				metadata: options.metadata,
			});
		} catch (error) {
			if (error instanceof ConcurrencyError && attempt < maxRetries) continue;
			throw error;
		}
	}
}
