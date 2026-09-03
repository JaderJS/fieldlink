'use client'

import { useQuery } from "@tanstack/react-query"
import { getClient, getClients } from "../service/client.crud"
import { summaryFn } from "../helpers/client.helpers"
import { KEYS } from "@/core/keys"
import { Client } from "../type"


export const useClients = ({ filters, search }: { filters?: Partial<Client>, search?: string } = {}) => {
    return useQuery({
        queryKey: KEYS.client.getAll(),
        queryFn: getClients,
        select: data => {

            const newClients = data.clients.map((client) => {
                try {
                    summaryFn(client)
                } catch (error) {
                    console.error(error)
                }
                return {
                    ...client,
                    title: client.name,
                    // ...summaryFn(client)
                }
            })

            if (!filters || !search) return newClients

            return newClients.filter((client) => {
                const term = search!.toLowerCase()
                const matchSearch = client.name.toLowerCase().includes(term) || client.property.toLowerCase().includes(term)
                return matchSearch
            })
        }
    })
}