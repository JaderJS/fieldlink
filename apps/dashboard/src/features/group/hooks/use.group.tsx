'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { Group } from "../types"
import { getGroup } from "../services/crud"

export const useGroup = ({ group, initialValues }: { group: Pick<Group, 'id'>, initialValues?: Group }) => {
    return useQuery({
        queryKey: KEYS.group.getById(group.id),
        queryFn: getGroup,
        select: data => data.group,
        initialData: {
            group: initialValues
        }
    })
}