import type { QueryFindManyChannels } from "@fieldlink/contracts";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { KEYS } from "@/core/keys";
import { getChannelsAPI } from "../api";

export const getChannelsOPTIONS = (filters: QueryFindManyChannels = {}) =>
	queryOptions({
		queryKey: KEYS.channels.findMany(filters),
		queryFn: () => getChannelsAPI({ data: filters }),
		placeholderData: (prev) => prev,
	});

export const useGetChannels = (filters: QueryFindManyChannels = {}) =>
	useQuery(getChannelsOPTIONS(filters));
