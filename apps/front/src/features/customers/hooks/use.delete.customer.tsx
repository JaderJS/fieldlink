import { useMutation, useQueryClient } from "@tanstack/react-query";
import { KEYS } from "@/core/keys";
import { deleteCustomer } from "../api";

export const useDeleteCustomer = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteCustomer,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: KEYS.customers.findMany() });
		},
	});
};
