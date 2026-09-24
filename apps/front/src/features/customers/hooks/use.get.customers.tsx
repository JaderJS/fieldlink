import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/core/keys";
import { getCustomers } from "../api";

export const getCustomersOPTIONS = queryOptions({
	queryKey: KEYS.customers.findMany(),
	queryFn: getCustomers,
});

export function useGetCustomers() {
	return useQuery(getCustomersOPTIONS);
}
