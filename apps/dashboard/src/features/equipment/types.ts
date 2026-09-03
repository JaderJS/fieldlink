import { Archive } from "../archive/types"
import { Product } from "../products"
import { Station } from "../station/types"

export type Equipment = {
    id: number
    nickname: string
    sn: string
    identifier: number
    productId: number
    updatedAt: string
    createdAt: string

    product: Product
    channelSchema: any[]
    archives: Archive[]
    stations: Station[]
}