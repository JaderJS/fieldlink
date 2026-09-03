import { Transaction } from "../transaction/types"

export interface Archive {
    cuid: string
    title: string
    size: string
    type: string
    path: string
    pathUrl: string
    createdCuid: string
    updatedCuid: string
    ownerCuid: string
    createdAt: Date
    updatedAt: Date

    // owner: UserProps
    // createdBy: UserProps
    // updatedBy: UserProps

    transaction: Transaction[]

}

