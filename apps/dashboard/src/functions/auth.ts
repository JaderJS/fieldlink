import { api } from "@/core/api"


interface ResponseLoginUserProps {
    user: {
        email: string
        name: string
        avatarUrl: string
        role: string
        createdAt: Date
    },
    token: string
}
export interface BodyLoginUserProps {
    email: string
    password: string
}

const loginUser = async (body: BodyLoginUserProps) => {
    const resp = await api.post<ResponseLoginUserProps>('/login', body)
    return resp.data
}

export { loginUser }