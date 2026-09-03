import { api } from "@/core/api"
import { QueryFunctionContext } from "@tanstack/react-query"

export interface UserProps {
    cuid: string
    email: string
    name: string
    nickname: string
    avatarUrl: string
    role: "USER" | "ADMIN" | "ROOT"
    createdAt: Date
}

export interface BodyRegisterUserProps {
    email: string
    name: string
    nickname: string
    avatarUrl: string
    password: string
}

const registerOneUser = async (body: BodyRegisterUserProps) => {
    const resp = await api.post<UserProps>('/user', body)
    return resp.data
}

interface ResponseGetOneUser {
    user: UserProps
}

const getOneUser = async () => {
    const resp = await api.get<ResponseGetOneUser>('/user')
    return resp.data
}

export interface Daily {
    id: number
    title: string
    description: string
    isActive: boolean
    content: string
    createdAt: Date
    updatedAt: Date
}

const getMyDailies = async () => {
    const resp = await api.get<{ myDailies: Daily[] }>('/user/dailies')
    return resp.data
}
const getMyDaily = async (id: number) => {
    // const getMyDaily = async (ctx: QueryFunctionContext<[string, number]>) => {
    // const id = ctx.queryKey[1]
    const resp = await api.get<{ myDaily: Daily }>(`/user/daily/${id}`)
    return resp.data
}

const deleteDaily = async (id: number) => {
    const resp = await api.delete<{ myDaily: Daily }>(`/user/daily/${id}`)
    return resp.data
}

const upsertMyDaily = async (body: any) => {
    const resp = await api.post('/user/daily', body)
    return resp.data
}

export {
    registerOneUser,
    getOneUser,
    getMyDailies,
    getMyDaily,
    upsertMyDaily,
    deleteDaily
}