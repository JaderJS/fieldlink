import { Client } from "../client/type"

export interface Property {
    id: number
    title: string
    clientId: number
    city: string
    updateAt: Date
    createAt: Date

    client: Client
    stations: any[]
}