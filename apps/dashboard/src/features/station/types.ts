import { Equipment } from "../equipment/types"
import { Property } from "../properties/types"

export type Station = {
    id: number
    propertyId: number
    content: Object
    rx: number
    tx: number
    latitude: number
    longitude: number
    isActive: boolean
    updateAt: string
    createAt: string

    digital?: {
        id: number
        slot: number
        colorCode: number
        stationId: number
    }

    analog?: {
        id: number
        silent: "CSQ" | "TPL" | "DPL_N" | "DPL_I"
        encoder: number
        decoder: number
        stationId: number
    }
    
    property: Property
    equipments: Equipment[]
    groups: any[]
}