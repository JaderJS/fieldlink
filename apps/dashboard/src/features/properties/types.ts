import { Station } from "../station/types"

export type Property = {
    id: number
    title: string
    city: string
    clientId: number
    updateAt: string
    createAt: string

    stations: Station[]
}
