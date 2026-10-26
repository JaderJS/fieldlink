import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertChannelAPI } from "../api";

export const useUpsertChannel = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: upsertChannelAPI,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [] });
		},
	});
};
