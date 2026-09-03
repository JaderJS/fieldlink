'use client'

import { KEYS } from "@/core/keys"
import { Property } from "@/features/properties/types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProperty } from "../services/property.crud"
import { getPropertyById } from "@/features/properties/services/crud.properties"

type IUseProperty = {
    property: Pick<Property, "id">
}

export const useProperty = ({ property }: IUseProperty) => {

    return useQuery({
        queryKey: KEYS.property.getById(property.id),
        queryFn: getPropertyById,
        select: data => data.property
    })
}