import { UpsertGroupSchema } from "../schema/group.schema";

export const defaultNewGroup = ({ stationId }: { stationId?: number } = {}): UpsertGroupSchema & { stationId?: number } => ({
    title: "Novo grupo",
    identifier: "0",
    type: "group",
    stationId: stationId
})