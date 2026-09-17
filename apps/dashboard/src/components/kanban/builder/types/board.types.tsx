import { UserProps } from "@/functions/user"
import { Column, ColumnInstance } from "./column.types"

export type Board = {
    _id: string
    title: string
    columns: ColumnInstance[]
}

export type BoardProps = {
    _id: string
    title: string
    columns: ColumnInstance[]
    createdBy: UserProps
    updatedBy: UserProps
    updatedAt: Date
    createdAt: Date
}