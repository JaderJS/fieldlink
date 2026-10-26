import type { getCustomers } from "./usecase/get.customers";

export type Customer = Awaited<ReturnType<typeof getCustomers>>;
