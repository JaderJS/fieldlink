import { api } from "@/core/api"
import { QueryFunctionContext } from "@tanstack/react-query"
import { string } from "zod"
import { Transaction } from "../types"


export interface Service {
    id: number
    name: string
    content: string
    status: 'STARTED' | 'PENDING' | 'FINISHED' | 'DROPPED'
    archives: any
    transactions: Transaction[]
    works: Work[]
    startTime: Date,
    endTime: Date,
    isPayBeenCompleted: boolean,
    client: {
        id: number
        name: string
    }

}

export interface Work {
    id: number
    title: string
    content: string
    startTime: Date,
    endTime: Date,
    total: number
    order?: {
        id: number
        status: 'INIT' | 'FINISHED' | 'PROCESS'
        productsOnOrder: {
            orderId: number,
            productId: number,
            price: number,
            quantity: number
        }[]
    }
    otherValues?: {
        id: number,
        name: string,
        price: number
    }[]
}

const getServices = async () => {
    const resp = await api.get<{ services: { name: string, services: Service[] }[] }>('/service')
    return resp.data
}

const getService = async (ctx: QueryFunctionContext<[string, number]>) => {
    const id = ctx.queryKey[1]
    const resp = await api.get<{ service: Service }>(`/service/${id}`)
    return resp.data
}

const upsertService = async (body: any) => {
    const resp = await api.post('/service', body)
    return resp.data
}

const deleteService = async (id: number) => {
    // const id = ctx.queryKey[1]
    const resp = await api.delete(`/service/${id}`)
    return resp.data
}

export { getServices, getService, upsertService, deleteService }