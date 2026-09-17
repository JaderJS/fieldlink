import { api } from "@/core/api"

export interface Notification {
    title: number,
    link?: string,
    description?: string,
    fromAt?: Date
}

const getNotification = async () => {
    const resp = await api.get<{ notifications: Notification[] }>(`/notification`)
    return resp.data
}

export { getNotification }