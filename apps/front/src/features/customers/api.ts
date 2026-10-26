// import { radio } from "@fieldlink/database/domain";

import { customers } from "@fieldlink/database/stations";

import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { KEYS } from "@/core/keys";

export const getCustomers = createServerFn({ method: "GET" }).handler(
	async () => {
		const r = await customers.getCustomers();
		return r;
	},
);

export const getCustomersOPTIONS = queryOptions({
	queryKey: KEYS.customers.findMany(),
	queryFn: getCustomers,
});

type UpsertCustomerInput = Parameters<typeof customers.upsertCustomer>[0];

export const upsertCustomer = createServerFn({
	method: "POST",
})
	.validator((data: UpsertCustomerInput) => data)
	.handler(async ({ data }) => {
		return customers.upsertCustomer(data);
	});

export const deleteCustomer = createServerFn({
	method: "POST",
})
	.validator((id: string) => id)
	.handler(async ({ data }) => {
		return customers.deleteCustomer(data);
	});
