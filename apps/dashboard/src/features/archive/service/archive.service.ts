import { api } from "@/core/api"
import { KEYS } from "@/core/keys"
import { QueryFunctionContext } from "@tanstack/react-query"
import qs from 'qs'
import { Archive } from "../types"

const getArchives = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.archive.getAll>>) => {
    const [, filters] = ctx.queryKey
    const resp = await api.get<{ archives: Archive[] }>(`/archive`, {
        params: { filters: filters },
        paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
    })
    return resp.data
}

const getArchiveById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.archive.getById>>) => {
    const [, id] = ctx.queryKey
    const resp = await api.get<{ archive: Archive }>(`/archive/${id}`)
    return resp.data
}

export interface UpsertArchive extends Partial<Archive> {
    connect?: {
        transaction?: {
            id?: number | { in: [number] }
        }
    }
}

const upsertArchive = async (body: UpsertArchive) => {
    const resp = await api.post(`/archive`, body)
    return resp.data
}

const uploadArchive = async (formData: FormData) => {
    const resp = await api.post<{
        size: string
        type: string
        path: string
        pathUrl: string
    }>(`/archive/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
    return resp.data
}

const deleteArchive = async (cuid: string) => {
    const resp = await api.delete(`/archive/${cuid}`)
    return resp.data
}

export {
    getArchives,
    getArchiveById,
    upsertArchive,
    uploadArchive,
    deleteArchive
}