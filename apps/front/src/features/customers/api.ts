import { radio } from "@fieldlink/database/domain";
import { queryOptions } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { KEYS } from "@/core/keys";

export const getCustomers = createServerFn({ method: "GET" }).handler(
	async () => {
		return await radio.customers.getCustomers();
	},
);

export const getCustomersOPTIONS = queryOptions({
	queryKey: KEYS.customers.findMany(),
	queryFn: getCustomers,
});

type UpsertCustomerInput = Parameters<typeof radio.customers.upsertCustomer>[0];

export const upsertCustomer = createServerFn({
	method: "POST",
})
	.validator((data: UpsertCustomerInput) => data)
	.handler(async ({ data }) => {
		return radio.customers.upsertCustomer(data);
	});

export const deleteCustomer = createServerFn({
	method: "POST",
})
	.validator((id: string) => id)
	.handler(async ({ data }) => {
		return radio.customers.deleteCustomer(data);
	});
