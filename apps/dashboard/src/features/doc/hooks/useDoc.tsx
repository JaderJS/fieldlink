'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getDocByCuid, getDocs } from "../services/crud"

export const useDoc = ({ cuid, initialData, filters }: { cuid: string, initialData?: Doc, filters?: Partial<Doc> }) => {
    return useQuery({
        queryKey: KEYS.docs.getByCuid({ cuid }),
        queryFn: getDocByCuid,
        // initialData: { doc: initialData },
        select: data => data.doc,
    })
}