import type { Customer } from "@fieldlink/server/types";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";
import { apiServer } from "@/lib/api";

export const getCustomers = createServerFn({ method: "GET" }).handler(
	async () => {
		const { data } = await apiServer().get<{ customers: Customer[] }>(
			"/customers",
		);
		return data;
	},
);

export const getCustomerById = createServerFn({ method: "GET" })
	.validator(z.object({ id: z.string() }))
	.handler(async (ctx) => {
		const { data } = await apiServer().get<{ customer: Customer }>(
			`/customers/${ctx.data.id}`,
		);
		return data;
	});

export const upsertCustomerAPI = createServerFn({ method: "POST" })
	.validator(
		z.object({
			id: z.string().optional(),
			name: z.string(),
		}),
	)
	.handler(async (ctx) => {
		const { data } = await apiServer().post<{ customers: Customer }>(
			`/customers`,
			ctx.data,
		);
		return data;
	});
