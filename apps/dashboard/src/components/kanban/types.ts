import { FormFieldInstance } from "./builder/types/field.types"

export interface Column {
    id: string
    title: string
    order: number
    disabledAddNewItem?: boolean
    fields: FormFieldInstance[]
    cards: Card[]
}

export interface Card {
    id: string,
    title: string
    content?: {
        [key: string]: any
    }
    [key: string]: any
}