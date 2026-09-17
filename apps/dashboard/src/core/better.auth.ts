import { createAuthClient } from "better-auth/client"
import { nextCookies } from "better-auth/next-js"

const isServer = typeof window === "undefined"

export const auth = createAuthClient({
    basePath: "/api/auth",
    baseURL: process.env.BACKEND_URL,
    plugins: [nextCookies()],
})