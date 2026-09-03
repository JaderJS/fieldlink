'use client'

import { KEYS } from "@/core/keys"
import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../services/crud"

export const useNotifications = () => {
    return useQuery({
        queryKey: KEYS.notification.getAll(),
        queryFn: getNotifications,
        select: data => data.notifications
    })
}