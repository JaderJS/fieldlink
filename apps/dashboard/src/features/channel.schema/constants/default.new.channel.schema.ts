import { UpsertChannelSchemaSchema } from "../schema/upsert.channel.schema";

export const defaultNewChannelSchema = ({ stationId }: { stationId: number }): UpsertChannelSchemaSchema => {
    return ({
        title: "Novo esquema de canal",
        stationId: stationId,
        content: {},
        channelsAnalog: [{
            silent: "CSQ",
            encoder: 0,
            decoder: 0
        }],
    })
}

export const defaultNewChannelSchemaAnalog = (): NonNullable<UpsertChannelSchemaSchema['channelsAnalog']>[number] => {
    return ({
        decoder: 0,
        encoder: 0,
        silent: "CSQ"
    })
}
export const defaultNewChannelSchemaDigital = ({ groupId = -1 }: { groupId?: number }={}): NonNullable<UpsertChannelSchemaSchema['channelsDigital']>[number] => {
    return ({
        colorCode: 0,
        slot: 0,
        groupId: groupId
    })
}