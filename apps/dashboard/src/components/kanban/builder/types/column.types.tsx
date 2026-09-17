import { FC } from "react"
import { CardInstance } from "./card.types"
import { FormFieldInstance } from "./field.types"

export type ColumnInstance = {
    _id: string
    title: string
    fields: FormFieldInstance[]
    cards: CardInstance[]
}

export type Column = {
    construct: (id: string) => ColumnInstance
}