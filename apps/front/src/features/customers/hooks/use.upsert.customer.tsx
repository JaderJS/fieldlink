import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/core/keys";
import { upsertCustomerAPI } from "../apiv2";

export const useUpsertCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: upsertCustomerAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEYS.customers.findMany() });
		},
	});
};
