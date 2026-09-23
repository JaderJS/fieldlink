import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/core/keys";
import { upsertCustomer } from "../api";

export const useUpsertCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: upsertCustomer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEYS.customers.findMany() });
		},
	});
};
