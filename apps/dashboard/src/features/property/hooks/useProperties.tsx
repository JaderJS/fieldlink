'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getProperties } from "../services/property.crud"
import { Property } from "../types"

export const useProperties = ({ filters }: { filters?: Partial<Property> } = {}) => {
    return useQuery({
        queryKey: KEYS.property.getAll(),
        queryFn: getProperties,
        select: data => data.properties.map((property) => ({ ...property, title: property.title }))
    })
}