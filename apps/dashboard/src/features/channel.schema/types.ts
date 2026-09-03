import { Station } from "../station/types"

export interface ChannelSchema {
    id: number
    title: string
    content: Object
    stationId: number

    station: Station
    channelsAnalog: ChannelAnalog[]
    channelsDigital: ChannelDigital[]
}

export interface ChannelAnalog {
    channelSchemaId: number
    silent: "CSQ" | "TPL" | "DPL_N" | "DPL_I"
    encoder: number
    decoder: number
    order: number
}

export interface ChannelDigital {
    channelSchemaId: number
    groupId: number
    slot: number
    colorCode: number
    order: number
}