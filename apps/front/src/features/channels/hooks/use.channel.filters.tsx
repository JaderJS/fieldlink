import {
	debounce,
	parseAsFloat,
	parseAsString,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import { useEffect, useState } from "react";

const filterParams = {
	q: parseAsString.withDefault(""),
	mode: parseAsStringLiteral(["ANALOG", "DIGITAL"] as const),
	rx: parseAsString.withDefault(""),
	tx: parseAsFloat,
	spacingInKhz: parseAsString.withDefault(""),
};

function useDebouncedValue<T>(value: T, delay = 800) {
	const [debounced, setDebounced] = useState(value);

	useEffect(() => {
		const id = setTimeout(() => setDebounced(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);

	return debounced;
}

export const useChannelFilters = () => {
	const [params, setParams] = useQueryStates(filterParams, {
		limitUrlUpdates: debounce(800),
		history: "replace",
	});

	const debouncedQ = useDebouncedValue(params.q);
	const debouncedRx = useDebouncedValue(params.rx);
	const debounceTx = useDebouncedValue(params.tx);
	const rxMHz = debouncedRx.trim() === "" ? undefined : Number(debouncedRx);

	const filters = {
		search: debouncedQ || undefined,
		mode: params.mode ?? undefined,
		rx:
			rxMHz !== undefined && Number.isFinite(rxMHz) && rxMHz > 0
				? rxMHz * 1_000_000
				: undefined,
		tx: !debounceTx ? undefined : debounceTx * 1_000_000,
	};

	const hasFilters = Boolean(params.q || params.mode || params.rx);

	return {
		params,
		setParams,
		filters,
		hasFilters,
		clear: () => setParams({ q: null, mode: null, rx: null, tx: null }),
	};
};
