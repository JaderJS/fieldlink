'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import logo from '@/../public/logo.png'
import Image from "next/image"
import { auth } from "@/core/better.auth"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"

const signInSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

type SignIpSchema = z.infer<typeof signInSchema>

const REDIRECT_URL = 'https://app.fieldlink.net.br'

export default function PageSignIn() {

    const [loading, setLoading] = useState(false)

    const form = useForm<SignIpSchema>({ defaultValues: { email: "", password: "" } })

    const handleSignInWithGoogle = async () => {
        await auth.signIn.social({ provider: "google", callbackURL: REDIRECT_URL })
    }

    const handleSignInWithEmail = async ({ email, password }: SignIpSchema) => {
        setLoading(true)
        const { data, error } = await auth.signIn.email({ email, password, callbackURL: REDIRECT_URL })
        if (error) {
            toast.error(error.message)
        }
        setLoading(false)
    }

    return (
        <section className="flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent">
            <div
                className="max-w-92 m-auto h-fit w-full border rounded-xl">
                <div className="p-6">
                    <div>
                        <Link
                            href="/"
                            aria-label="go home"
                            className="flex justify-center"
                        >
                            <Image src={logo} alt="logo" width={80} height={80} />
                        </Link>
                        <h1 className="mb-1 mt-4 text-xl font-semibold">Acesso em Fieldlink </h1>
                        <p>Bem vindo de volta! Faça login para continuar</p>
                    </div>

                    <div className="mt-6">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={handleSignInWithGoogle}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="0.98em"
                                height="1em"
                                viewBox="0 0 256 262">
                                <path
                                    fill="#4285f4"
                                    d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path
                                    fill="#34a853"
                                    d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path
                                    fill="#fbbc05"
                                    d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"></path>
                                <path
                                    fill="#eb4335"
                                    d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Google</span>
                        </Button>
                    </div>

                    <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                        <hr className="border-dashed" />
                        <span className="text-muted-foreground text-xs">Ou continue com</span>
                        <hr className="border-dashed" />
                    </div>

                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="email"
                                className="block text-sm">
                                Email
                            </Label>
                            <Input
                                {...form.register("email")}
                                type="email"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label
                                htmlFor="password"
                                className="block text-sm">
                                Senha
                            </Label>
                            <Input
                                {...form.register("password")}
                                type="password"
                            />
                        </div>

                        <Button
                            className="w-full"
                            onClick={form.handleSubmit(handleSignInWithEmail)}
                            disabled={loading}
                        >
                            Continue
                        </Button>
                    </div>
                </div>

                <p className="text-accent-foreground text-center text-sm">
                    Ainda não tem conta?
                    <Button
                        asChild
                        variant="link"
                        className="px-2">
                        <Link href="/sign-up">Crie uma conta</Link>
                    </Button>
                </p>
            </div>
        </section>
    )
}