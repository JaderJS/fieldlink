import { FC } from "react"
import { FormFieldInstance } from "./field.types"

export type CardInstance = {
    _id: string
    title: string
    content?: { [key: string]: string }
    fields: FormFieldInstance[]
    extraAttributes?: Record<string, any>
}

export type Card = {
    construct: (id: string) => CardInstance

    viewComponent: FC<{
        cardInstance: CardInstance
    }>
}

