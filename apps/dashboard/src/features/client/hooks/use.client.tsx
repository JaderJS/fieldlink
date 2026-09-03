'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { Client } from "../type"
import { getClient } from "../service/client.crud"

type IUseClient = {
    client: Pick<Client, "id">
}

export const useClient = ({ client }: IUseClient) => {
    return useQuery({
        queryKey: KEYS.client.getById(client.id),
        queryFn: getClient,
        select: data => data.client
    })
}