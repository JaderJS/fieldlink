import { UpsertStationSchema } from "../schemas/upsert.station.schema";

export const defaultNewStation = ({ propertyId, stationId }: { propertyId: number, stationId: number }): UpsertStationSchema => {
    return (
        {
            rx: 155,
            tx: 155,
            isActive: false,
            mode: "analog",
            analog: {
                stationId: stationId,
                silent: "CSQ",
                encoder: 0,
                decoder: 0,
            },
            latitude: 0,
            longitude: 0,
            propertyId: propertyId,
        })
}

