import { api } from "@/core/api"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getDocs = async () => {
    const resp = await api.get<{ docs: Doc[] }>(`/doc`)
    return resp.data
}
const getDocByCuid = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.docs.getByCuid>>) => {
    const [key, { cuid }] = ctx.queryKey
    const resp = await api.get<{ doc: Doc }>(`/doc/${cuid}`)
    return resp.data
}
const upsertDoc = async (data: Partial<Pick<Doc, "cuid">> & Omit<Doc, "cuid" | "createdAt"> & { isDeleted?: boolean } & { connect?: { clientId?: number } }) => {
    const resp = await api.post<{ doc: Doc }>(`/doc`, data)
    return resp.data.doc
}

const safeDeleteDoc = async (id: number) => { }
const deleteDoc = async (id: number) => { }

export {
    getDocs,
    getDocByCuid,
    upsertDoc,
    safeDeleteDoc,
    deleteDoc
}