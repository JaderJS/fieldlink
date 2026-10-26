import { beforeEach, describe, expect, test } from "bun:test";
import { db, eq, schema } from "@fieldlink/database";
import {
	type AppendInput,
	ConcurrencyError,
	DomainError,
	EventStore,
	execute,
	loadAggregate,
} from "@fieldlink/events";
import type {
	Aggregate,
	DomainEvent,
	StoredEvent,
} from "@fieldlink/events/types";

const store = new EventStore(db);

type Incremented = DomainEvent<"Incremented", { by: number }>;
type Decremented = DomainEvent<"Decremented", { by: number }>;
type CounterEvent = Incremented | Decremented;

export const inc = (by: number): CounterEvent => ({
	type: "Incremented",
	payload: { by },
});

export interface CounterState {
	value: number;
}

export const decrement =
	(by: number) =>
	(state: CounterState): CounterEvent[] => {
		if (state.value - by < 0)
			throw new DomainError("O contador não pode ficar negativo");
		return [{ type: "Decremented", payload: { by } }];
	};

export const increment =
	(by: number) =>
	(_state: CounterState): CounterEvent[] => [inc(by)];

export const counter: Aggregate<CounterState, CounterEvent> = {
	streamType: "counter",
	initialState: () => ({ value: 0 }),
	evolve: (state, event) =>
		event.type === "Incremented"
			? { value: state.value + event.payload.by }
			: { value: state.value - event.payload.by },
};

class RacyStore extends EventStore {
	private raced = false;

	override async append<E extends DomainEvent>(
		input: AppendInput<E>,
	): Promise<StoredEvent<E>[]> {
		if (!this.raced) {
			this.raced = true;
			await super.append({
				...input,
				events: [
					{ type: "Incremented", payload: { by: 100 } },
				] as unknown as E[],
			});
		}
		return super.append(input);
	}
}

beforeEach(async () => {
	// await db.delete(schema.events).where(eq(schema.events.streamType, "counter"));
	await db.delete(schema.events);
});

describe("Concorrencia otimista", () => {
	test("expectedVersion desatualizada lança ConcurrencyError", async () => {
		await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(1)],
		});

		await expect(
			store.append({
				streamType: "counter",
				streamId: "c1",
				expectedVersion: 0,
				events: [inc(1)],
			}),
		).rejects.toBeInstanceOf(ConcurrencyError);
	});

	test("o append é atômico: se um evento do lote conflita todo o resto é jogado fora", async () => {
		await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(1), inc(1)],
		});

		await expect(
			store.append({
				streamType: "counter",
				streamId: "c1",
				expectedVersion: 1,
				events: [inc(1), inc(1)],
			}),
		).rejects.toBeInstanceOf(ConcurrencyError);

		expect((await store.load("counter", "c1")).map((e) => e.version)).toEqual([
			1, 2,
		]);
	});

	test("append simultâneos na mesma versão: apenas um vence", async () => {
		const res = await Promise.allSettled([
			store.append({
				streamType: "counter",
				streamId: "c1",
				expectedVersion: 0,
				events: [inc(1), inc(1)],
			}),
			store.append({
				streamType: "counter",
				streamId: "c1",
				expectedVersion: 0,
				events: [inc(2), inc(3)],
			}),
		]);
		expect(res.filter((r) => r.status === "fulfilled")).toHaveLength(1);

		const reject = res.filter((r) => r.status === "rejected");

		expect(reject).toHaveLength(1);
		expect(reject[0].reason).toBeInstanceOf(ConcurrencyError);
	});
});

describe("Execute (carregar -> decidir -> gravar, com retry)", () => {
	test("caminho feliz: grava o evento decidido", async () => {
		const stored = await execute(store, counter, "c1", increment(5));
		expect(stored.map((e) => e.version)).toEqual([1]);
		expect((await loadAggregate(store, counter, "c1")).state.value).toBe(5);
	});

	test("regra de negócio violada: lança DomainError e NADA é gravado", async () => {
		await execute(store, counter, "c1", increment(2));
		await expect(execute(store, counter, "c1", decrement(3))).rejects.toThrow(
			"negativo",
		);
	});

	test("perde a corrida, recarrega, DECIDE DE NOVO com o estado atualizado e grava", async () => {
		const racy = new RacyStore(db);
		const stateSeenByDecide: number[] = [];

		const stored = await execute(
			racy,
			counter,
			"c1",
			(state): CounterEvent[] => {
				stateSeenByDecide.push(state.value);
				return [inc(5)];
			},
		);

		// 1ª tentativa viu 0 e perdeu a corrida; 2ª viu 100 (o evento do "outro processo").
		expect(stateSeenByDecide).toEqual([0, 100]);
		expect(stored.map((e) => e.version)).toEqual([2]);
		expect((await loadAggregate(store, counter, "c1")).state.value).toBe(105);
	});
});
