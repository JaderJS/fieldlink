'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getStation } from "../services/crud.services"
import { Station } from "../types"

type IUseStation = {
    station: Pick<Station, "id">
}

export const useStation = ({ station }: IUseStation) => {
    return useQuery({
        queryKey: KEYS.station.getById(station.id),
        queryFn: getStation,
        select: data => data.station
    })
}