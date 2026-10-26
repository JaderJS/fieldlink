import { createServerFn } from "@tanstack/react-start";

export const getStations = createServerFn({
	method: "GET",
}).handler(async () => {
	return [];
});

export const createStation = createServerFn({
	method: "POST",
})
	.validator((data: any) => data)
	.handler(async ({ data }) => {
		return {};
	});
