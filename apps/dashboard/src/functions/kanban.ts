import { api } from "@/core/api"
import { UserProps } from "./user"
import { QueryFunctionContext } from "@tanstack/react-query"
import { FieldsType } from "@/components/kanban/builder/types/field.types"
import { KEYS } from "@/core/keys"

const upsertKanbanForm = async (body: any) => {
    const resp = await api.post(`/database/`, body)
    return resp.data
}

interface ResponseGetDatabases {
    databases: Database[]
}

interface Database {
    _id: string
    name: string
    columns: {
        _id: string
        title: string
        fields: {
            _id: string
            type: FieldsType
        }[],
        cards: {
            _id: string
            title: string
            content: {
                [key: string]: string
            }
            createdBy: UserProps
            updatedBy: UserProps
            updatedAt: Date
            createdAt: Date
            __v: number
        }[]
    }[]
    createdBy: UserProps
    updatedBy: UserProps
    updatedAt: Date
    createdAt: Date
}

const getDatabases = async () => {
    const resp = await api.get<ResponseGetDatabases>(`/database/`)
    return resp.data
}

export interface ResponseGetDatabase {
    database: Database
}

const getDatabase = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.database.getById>>) => {
    const [_key, { _id }] = ctx.queryKey
    const resp = await api.get<ResponseGetDatabase>(`/database/${_id}`)
    return resp.data
}

const deleteDatabase = async (_id: string) => {
    const resp = await api.delete(`/database/${_id}`)
    return resp.data
}

interface ResponseUpsertCard {
    card: {
        _id: string
        content: {
            [key: string]: string
        }
        createdBy: UserProps
        updatedBy: UserProps
        createdAt: Date
        updatedAt: Date
        title: string
    }
}

const upsertCard = async (body: any) => {
    const resp = await api.post<ResponseUpsertCard>(`/database/card`, body)
    return resp.data
}

const deleteCard = async (_id: string) => {
    const resp = await api.delete(`/database/card/${_id}`)
    return resp.data
}


export { getDatabases, getDatabase, upsertKanbanForm, upsertCard, deleteDatabase, deleteCard }