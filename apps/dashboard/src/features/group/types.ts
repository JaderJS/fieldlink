import { ChannelDigital } from "../channel.schema/types"
import { Station } from "../station/types"

export interface Group {
    id: number
    title: string
    type: string
    identifier: number
    updatedAt: string
    createdAt: string

    stations: Station[]
    channels: ChannelDigital[]
}