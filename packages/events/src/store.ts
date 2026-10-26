import { and, asc, eq, gt, lte, schema } from "@fieldlink/database";
import { ConcurrencyError } from "./errors";
import type {
	Db,
	DomainEvent,
	EventMetadata,
	Projection,
	StoredEvent,
} from "./types";

type EventRow = typeof schema.events.$inferSelect;

function toStored<E extends DomainEvent>(row: EventRow): StoredEvent<E> {
	return {
		type: row.type,
		payload: row.payload,
		position: row.position,
		id: row.id,
		streamType: row.streamType,
		streamId: row.streamId,
		version: row.version,
		metadata: row.metadata,
		occurredAt: row.occurredAt,
	} as unknown as StoredEvent<E>;
}

export interface AppendInput<E extends DomainEvent> {
	streamType: string;
	streamId: string;

	expectedVersion: number;
	events: E[];
	metadata?: EventMetadata;
}

function isUniqueViolation(err: unknown): boolean {
	const e = err as { code?: string; cause?: { code?: string } } | null;
	return e?.code === "23505" || e?.cause?.code === "23505";
}

export class EventStore {
	private readonly projections: Projection[] = [];

	constructor(private readonly db: Db) {}

	registerProjection(projection: Projection): this {
		this.projections.push(projection);
		return this;
	}

	async append<E extends DomainEvent>(
		input: AppendInput<E>,
	): Promise<StoredEvent<E>[]> {
		const { streamType, streamId, expectedVersion, metadata = {} } = input;

		if (input.events.length === 0) return [];

		return this.db.transaction(async (tx) => {
			let rows: EventRow[];

			try {
				rows = await tx
					.insert(schema.events)
					.values(
						input.events.map((e, i) => ({
							streamType,
							streamId,
							version: expectedVersion + i + 1,
							type: e.type,
							payload: e.payload,
							metadata,
						})),
					)
					.returning();
			} catch (error) {
				if (isUniqueViolation(error)) {
					throw new ConcurrencyError(streamType, streamId, expectedVersion);
				}

				throw error;
			}
			const stored = rows
				.sort((a, b) => a.version - b.version)
				.map((r) => toStored<E>(r));

			for (const projection of this.projections) {
				if (
					projection.streamType &&
					!projection.streamType.includes(streamType)
				) {
					continue;
				}
				for (const event of stored) await projection.handle(event, tx);
			}
			return stored;
		});
	}

	async load<E extends DomainEvent>(
		streamType: string,
		streamId: string,
		opts: { toVersion?: number; asOf?: Date } = {},
	): Promise<StoredEvent<E>[]> {
		const conditions = [
			eq(schema.events.streamType, streamType),
			eq(schema.events.streamId, streamId),
		];

		if (opts.toVersion !== undefined)
			conditions.push(lte(schema.events.version, opts.toVersion));

		if (opts.asOf !== undefined)
			conditions.push(lte(schema.events.occurredAt, opts.asOf));

		const rows = await this.db
			.select()
			.from(schema.events)
			.where(and(...conditions))
			.orderBy(schema.events.version);

		return rows.map((r) => toStored<E>(r));
	}

	async *readAll<E extends DomainEvent>(opts: {
		streamType?: string;
		batchSize?: number;
	}): AsyncGenerator<StoredEvent<E>> {
		const batchSize = opts.batchSize ?? 500;
		let after = 0;
		while (true) {
			const rows = await this.db
				.select()
				.from(schema.events)
				.where(
					and(
						gt(schema.events.position, after),
						opts.streamType
							? eq(schema.events.streamType, opts.streamType)
							: undefined,
					),
				)
				.orderBy(asc(schema.events.position))
				.limit(batchSize);

			if (rows.length === 0) return;

			for (const row of rows) yield toStored<E>(row);

			after = rows[rows.length - 1]!.position;
		}
	}
}
