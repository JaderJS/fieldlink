import {
	afterAll,
	beforeAll,
	beforeEach,
	describe,
	expect,
	test,
} from "bun:test";
import { db, eq, schema } from "@fieldlink/database";
import { DomainError, EventStore } from "@fieldlink/events";
import { Aggregate, DomainEvent } from "@fieldlink/events/types";

const store = new EventStore(db);

type Incremented = DomainEvent<"Incremented", { by: number }>;
type Decremented = DomainEvent<"Decremented", { by: number }>;
type CounterEvent = Incremented | Decremented;

interface CounterState {
	value: number;
}

const counter: Aggregate<CounterState, CounterEvent> = {
	streamType: "counter",
	initialState: () => ({ value: 0 }),
	evolve: (state, event) => {
		return event.type === "Incremented"
			? { value: state.value + event.payload.by }
			: { value: state.value - event.payload.by };
	},
};

export const inc = (by: number): CounterEvent => ({
	type: "Incremented",
	payload: { by },
});

const increment =
	(by: number) =>
	(state: CounterState): CounterEvent[] => {
		return [
			{
				type: "Incremented",
				payload: { by },
			},
		];
	};

const decrement =
	(by: number) =>
	(state: CounterState): CounterEvent[] => {
		if (state.value - by < 0)
			throw new DomainError("O contador nao pode ficar negativo");
		return [{ type: "Decremented", payload: { by } }];
	};

beforeEach(async () => {
	// await db.delete(schema.events).where(eq(schema.events.streamType, "counter"));
	await db.delete(schema.events);
});

describe("Append e load", () => {
	test("numera os eventos de um stream a partir de 1 e devolve em ordem", async () => {
		await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(1), inc(2), inc(4)],
		});

		const loaded = await store.load<CounterEvent>("counter", "c1");

		expect(loaded.map((e) => e.version)).toEqual([1, 2, 3]);
		expect(loaded.map((e) => e.payload.by)).toEqual([1, 2, 4]);
	});

	test("um segundo append continua a numeração de onde parou", async () => {
		await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(1), inc(2)],
		});
		await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 2,
			events: [inc(3)],
		});
		const loaded = await store.load<CounterEvent>("counter", "c1");
		expect(loaded.map((e) => e.version)).toEqual([1, 2, 3]);
	});

	test("streams diferentes sao independentes cada um começa na versão 1", async () => {
		await store.append({
			streamType: "counter",
			streamId: "c1",
			events: [inc(1), inc(1)],
			expectedVersion: 0,
		});

		await store.append({
			streamType: "counter",
			streamId: "c2",
			events: [inc(2)],
			expectedVersion: 0,
		});

		expect((await store.load("counter", "c1")).map((e) => e.version)).toEqual([
			1, 2,
		]);
		expect((await store.load("counter", "c2")).map((e) => e.version)).toEqual([
			1,
		]);
	});

	test("o mesmo streamId em streamTypes diferentes não se mistura", async () => {
		await store.append({
			streamType: "counter",
			streamId: "x",
			expectedVersion: 0,
			events: [inc(1)],
		});
		await store.append({
			streamType: "debug",
			streamId: "x",
			expectedVersion: 0,
			events: [inc(1)],
		});

		expect(await store.load("counter", "x")).toHaveLength(1);
		expect(await store.load("debug", "x")).toHaveLength(1);
	});

	test("payload e metadata sobrevivem a viagem pelo banco (jsonb)", async () => {
		const [stored] = await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(7)],
			metadata: { actorId: "Ana", origem: "debug" },
		});

		expect(stored.payload).toEqual({ by: 7 });
		expect(stored.metadata).toEqual({ actorId: "Ana", origem: "debug" });

		const [loaded] = await store.load<CounterEvent>("counter", "c1");
		expect(loaded.metadata.actorId).toBe("Ana");
		expect(typeof loaded.id).toBe("string");
	});

	test("postion é uma ordem global crescente entre streams", async () => {
		const [a] = await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [inc(1)],
		});

		const [b] = await store.append({
			streamType: "counter",
			streamId: "c2",
			expectedVersion: 0,
			events: [inc(1)],
		});

		const [c] = await store.append({
			streamType: "counter",
			streamId: "c3",
			expectedVersion: 0,
			events: [inc(1)],
		});

		expect(b.position).toBeGreaterThan(a.position);
		expect(c.position).toBeGreaterThan(b.position);
	});

	test("append sem evento não faz nada", async () => {
		const result = await store.append({
			streamType: "counter",
			streamId: "c1",
			expectedVersion: 0,
			events: [],
		});

		expect(result).toEqual([]);
		const query = await db.select().from(schema.events);
		expect(query.length).toBe(0);
	});

	test("load de um stream inexistente devolve lista vazia", async () => {
		expect(await store.load("counter", "xxx")).toEqual([]);
	});
});
