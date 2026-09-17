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

const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string()
})

type SignUpSchema = z.infer<typeof signUpSchema>

export default function PageSignIn() {

    const form = useForm<SignUpSchema>({ defaultValues: { email: "", password: "", name: "" } })

    const handleSignUp = async ({ email, password, name }: SignUpSchema) => {
        await auth.signUp.email({ email, password, name }).catch(console.error)
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


                    <div className="space-y-2">
                        <div className="space-y-2">
                            <Label
                                htmlFor="name"
                                className="block text-sm">
                                Nome
                            </Label>
                            <Input
                                {...form.register("name")}
                                type="text"
                            />
                        </div>
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
                            onClick={form.handleSubmit(handleSignUp)}
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
                        <Link href="#">Crie uma conta</Link>
                    </Button>
                </p>
            </div>
        </section>
    )
}