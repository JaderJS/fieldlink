import { Card } from '@/src/components/ui/card'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Label } from '@/src/components/ui/label'
import Link from 'next/link'
import { Header } from '@/src/components/custom/global/nav/navbar'
import { Footer } from '@/src/components/custom/global/footer/footer'
import { sendContactForm } from '@/src/forms/contact'

export default function ContactSection() {
    return (
        <>
            <Header />
            <section className="py-32">
                <div className="mx-auto max-w-4xl px-4 lg:px-0">
                    <h1 className="mb-12 text-center text-4xl font-semibold lg:text-5xl">Entre em contato agora mesmo</h1>

                    <div className="grid divide-y border md:grid-cols-2 md:gap-4 md:divide-x md:divide-y-0 rounded">
                        <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                            <div>
                                <h2 className="mb-3 text-lg font-semibold">Jader José da Silva</h2>
                                <Link
                                    href="mailto:hello@tailus.io"
                                    className="text-lg text-blue-600 hover:underline dark:text-blue-400">
                                    jader.jader55@gmail.com
                                </Link>
                                <p className="mt-3 text-sm">(66)9.9900-1400</p>
                                <Link
                                    href="https://wa.me/5566999001400?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20rádios%20de%20vocês"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Conversar no WhatsApp
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between space-y-8 p-6 sm:p-12">
                            <div>
                                <h3 className="mb-3 text-lg font-semibold">José Carlos da Silva</h3>
                                <p className="mt-3 text-sm">(66)9.9693-1400</p>
                                <Link
                                    href="https://wa.me/5566999001400?text=Olá!%20Quero%20saber%20mais%20sobre%20os%20rádios%20de%20vocês"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                                >
                                    Conversar no WhatsApp
                                </Link>
                            </div>
                        </div>
                    </div>



                </div>
                <form
                    id='form'
                    action={sendContactForm}
                    className=" px-4 py-12 lg:px-0 lg:py-24">
                    <Card className="mx-auto max-w-lg p-8 sm:p-16">
                        <h3 className="text-xl font-semibold">Vamos te levar ao lugar certo</h3>
                        <p className="mt-4 text-sm">Entre em contato com a nossa equipe! Estamos ansiosos para te ajudar</p>

                        <div className="**:[&>label]:block mt-12 space-y-6 *:space-y-3">
                            <div>
                                <Label
                                    htmlFor="name"
                                    className="space-y-2">
                                    Nome completo
                                </Label>
                                <Input
                                    type="text"
                                    id="name"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="website"
                                    className="space-y-2">
                                    Nome da empresa / Propriedade
                                </Label>
                                <Input
                                    type="url"
                                    id="website"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="tel"
                                    className="space-y-2">
                                    Seu melhor numero
                                </Label>
                                <Input
                                    type="tel"
                                    id="tel"
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="msg"
                                    className="space-y-2">
                                    Mensagem
                                </Label>
                                <Textarea
                                    id="msg"
                                    rows={3}
                                />
                            </div>
                            <Button>Enviar</Button>
                        </div>
                    </Card>
                </form>
            </section>
            <Footer />
        </>
    )
}