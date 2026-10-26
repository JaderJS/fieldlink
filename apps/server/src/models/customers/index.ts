import { getCustomerBODY, upsertCustomerSchema } from "@fieldlink/contracts";
import Elysia from "elysia";
import { NotFoundError } from "../../core/error/notfound";
import { deleteCustomer } from "./usecase/delete.customer";
import { getCustomer } from "./usecase/get.customer";
import { getCustomers } from "./usecase/get.customers";
import { upsertCustomer } from "./usecase/upsert.customer";

export const handleCustomers = new Elysia({
	prefix: "/customers",
	tags: ["Customers"],
})
	.get(
		"/",
		async () => {
			const query = await getCustomers();
			return query;
		},
		{ response: { 200: getCustomerBODY.array() } },
	)

	.get(
		"/:id",
		async ({ params }) => {
			const query = await getCustomer(params.id);

			if (!query) throw new NotFoundError("Customer", params.id);

			return query;
		},
		{ response: { 200: getCustomerBODY.optional() } },
	)

	.post(
		"/",
		async ({ body }) => {
			const mutation = await upsertCustomer(body);
			return mutation;
		},
		{ body: upsertCustomerSchema, response: { 200: getCustomerBODY } },
	)

	.delete(
		"/:id",
		async ({ params }) => {
			return await deleteCustomer(params.id);
		},
		{
			response: { 204: getCustomerBODY.optional() },
		},
	);
