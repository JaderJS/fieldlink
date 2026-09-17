'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getProperties } from "../services/crud.properties"

interface UsePropertiesProps {
    filters?: {
        stationId?: number
        clientId?: number
    }
}

export const useProperties = ({ filters }: UsePropertiesProps = {}) => {
    return useQuery({
        queryKey: KEYS.property.getAll({ stationId: filters?.stationId, clientId: filters?.clientId }),
        queryFn: getProperties,
        select: data => data.properties
    })
}