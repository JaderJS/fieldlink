'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getStations } from "../services/crud.services"

type IUseStationsProps = {
    filters?: {
        excludeStationId?: number
        frequency?: {
            rx?: number
            tx?: number
            renge?: number
        }
        location?: {
            latitude?: number
            longitude?: number
            range?: number
        }
    }
}

export const useStations = ({ filters }: IUseStationsProps = {}) => {
    return useQuery({
        queryKey: KEYS.station.getAll({ filters }),
        queryFn: getStations,
        select: data => data.stations.map(s => ({ ...s, title: s.property.title }))
    })
}