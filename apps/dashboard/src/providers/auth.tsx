"use client"

import { BodyLoginUserProps, loginUser } from "@/functions/auth"
import { BodyRegisterUserProps, getOneUser, registerOneUser, UserProps } from "@/functions/user"
import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { deleteCookie, setCookie } from "cookies-next"
import { hasPermission } from "@/core/auth"

interface AuthProps {
    login: (data: BodyLoginUserProps) => Promise<void>
    register: (data: BodyRegisterUserProps) => Promise<void>
    logout: () => Promise<void>
    user?: UserProps
    hasPermission: typeof hasPermission
}

const AuthContext = createContext<AuthProps>({} as AuthProps)

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const router = useRouter()
    const { mutateAsync: loginFn } = useMutation({ mutationFn: loginUser })
    const { mutateAsync: registerFn } = useMutation({ mutationFn: registerOneUser })
    const { data, refetch } = useQuery({ queryKey: ['user'], queryFn: getOneUser })

    const login = async (data: BodyLoginUserProps) => {
        loginFn(data).then(({ user, token }) => {
            setCookie('fieldlink-web', token)
            refetch()
            router.push('/')
        })

    }

    const register = async (data: BodyRegisterUserProps) => {
        registerFn(data).then((user) => {
            refetch()
            router.push(`/login`)
        })
    }

    const logout = async () => {
        deleteCookie('fieldlink-web')
        router.push(`/login`)
    }

    return (
        <AuthContext.Provider value={{ login, register, logout, user: data?.user, hasPermission }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }