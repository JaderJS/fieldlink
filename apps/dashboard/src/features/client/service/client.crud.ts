import { api } from "@/core/api"
import { Client } from "../type"
import { QueryFunctionContext } from "@tanstack/react-query"
import { KEYS } from "@/core/keys"

const getClients = async () => {
    const resp = await api.get<{ clients: Client[] }>('/client')
    return resp.data
}

const getClient = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.client.getById>>) => {
    const resp = await api.get<{ client: Client }>(`/client/${ctx.queryKey[1]}`)
    return resp.data
}

type IUpsertClient = Partial<Client> & { id?: number } & any

const upsertClient = async (body: IUpsertClient) => {
    const resp = await api.post<{ client: Client }>('/client', body)
    return resp.data
}

const deleteClient = async (id: number) => {
    const { data } = await api.delete<{ client: Client }>(`/client/${id}`)
    return data
}

export {
    getClients,
    getClient,
    upsertClient,
    deleteClient
}