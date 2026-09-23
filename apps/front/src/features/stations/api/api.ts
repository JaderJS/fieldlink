import { radio } from "@fieldlink/database/domain";
import { createServerFn } from "@tanstack/react-start";

export const getStations = createServerFn({
	method: "GET",
}).handler(async () => {
	return radio.stations.getStations();
});

export const createStation = createServerFn({
	method: "POST",
})
	.validator((data: Parameters<typeof radio.stations.createStation>[0]) => data)
	.handler(async ({ data }) => {
		return radio.stations.createStation(data);
	});
