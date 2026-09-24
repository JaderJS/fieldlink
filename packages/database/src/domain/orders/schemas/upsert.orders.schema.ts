import { z } from "zod";

const otherValuesSchema = z.object({
	id: z.string().optional(),
	title: z.string(),
	quantity: z.number(),
	value: z.number(),
	aggregateId: z.string().optional(),
	description: z.string().optional(),
});

const itemSchema = z.object({
	name: z.string(),
	quantity: z.number(),
	value: z.number(),
	item: z.object({
		name: z.string(),
	}),
});

export const upsertOrderSchema = z.object({
	id: z.string().optional(),
	name: z.string(),
	description: z.string().optional(),
	customerId: z.string(),
	total: z.number(),
	content: z.record(z.string(), z.any()).optional(),
	actorId: z.string(),
	works: z
		.array(
			z.object({
				id: z.string().optional(),
				name: z.string(),
				total: z.number(),
				content: z.record(z.string(), z.any()).optional(),
				items: z.array(itemSchema).default([]),
				otherItems: z.array(otherValuesSchema).default([]),
			}),
		)
		.default([]),
	sells: z
		.array(
			z.object({
				id: z.string().optional(),
				otherItems: z.array(otherValuesSchema).default([]),
			}),
		)
		.default([]),
	otherItems: z.array(otherValuesSchema).default([]),
	transactions: z
		.array(
			z.object({
				id: z.string().optional(),
				paid: z.boolean(),
				bankId: z.string(),
				amount: z.number(),
			}),
		)
		.default([]),
});
