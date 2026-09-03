'use client'

import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../services/category.crud"
import { KEYS } from "@/core/keys"

export const useProductCategories = () => {

    return useQuery({
        queryKey: KEYS.productCategories.getAll(),
        queryFn: getCategories,
        select: data => data.categories
    })
}