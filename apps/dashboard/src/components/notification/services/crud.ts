import { api } from "@/core/api"
import { Notification } from "../types"

const getNotifications = async () => {
    const { data } = await api.get<{ notifications: Notification[] }>(`/notification`)
    return data
}

export { getNotifications }