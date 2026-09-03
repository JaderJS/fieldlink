import React from 'react'
import Link from 'next/link'
import { Button } from '@/src/components/ui/button'
import Image from 'next/image'
import { InfiniteSlider } from '@/src/components/motion.primitives/infinite.slider'
import { ProgressiveBlur } from '@/src/components/motion.primitives/progressive.blur'
import { TextEffect } from '@/src/components/motion.primitives/text.effect'
import { AnimatedGroup } from '@/src/components/motion.primitives/animated.group'

import image from "@/public/image-18.png"
import { TYPOGRAPHY } from '@/src/constants/typography'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuShortcut, DropdownMenuTrigger } from '@/src/components/ui/dropdown-menu'
import { AudioWaveform, Binary, Waves } from 'lucide-react'

export default function HeroSection() {

    const typography = TYPOGRAPHY.home

    return (
        <>
            <main className="overflow-x-hidden">

                <section>
                    <div className="relative overflow-hidden pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
                        <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">

                            {/* Imagem — mobile: em cima / desktop: lateral */}
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: { transition: { delayChildren: 0.4 } },
                                    },
                                    item: {
                                        hidden: { opacity: 0, y: 40 },
                                        visible: {
                                            opacity: 1,
                                            y: 0,
                                            transition: { type: "spring", bounce: 0.25, duration: 1.5 },
                                        },
                                    },
                                }}
                                className="relative order-first mb-10 lg:absolute lg:inset-0 lg:order-last lg:-top-10 lg:-z-10"
                            >
                                <div className="relative w-full h-[280px] sm:h-[380px] md:h-[480px] lg:h-[720px] overflow-visible">
                                    <Image
                                        src={image}
                                        alt="Sistema de rádio comunicação"
                                        fill
                                        priority
                                        className="object-cover lg:object-contain lg:object-top-right"
                                    />

                                    {/* Máscara suave para leitura */}
                                    <div
                                        aria-hidden="true"
                                        className="absolute inset-0 bg-linear-to-b from-background/20 via-background/10 to-background/90 lg:from-transparent lg:via-transparent lg:to-background/70"
                                    />
                                </div>
                            </AnimatedGroup>

                            {/* Texto */}
                            <div className="relative z-20 mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                                <TextEffect
                                    as="h1"
                                    speedSegment={0.3}
                                    preset="fade-in-blur"
                                    className="mt-4 max-w-2xl text-balance text-4xl font-semibold md:text-5xl lg:mt-16 xl:text-6xl"
                                >
                                    Rádios pra quem não pode depender só de celular
                                </TextEffect>

                                <TextEffect
                                    as="p"
                                    speedSegment={0.4}
                                    preset="fade-in-blur"
                                    className="mt-6 max-w-2xl text-pretty text-base md:text-lg text-muted-foreground"
                                >
                                    Cobertura confiável em propriedades rurais, operações industriais e eventos. A tecnologia
                                    de rádio ainda é a escolha prática quando o resto da rede falha ou não chega.
                                </TextEffect>

                                <AnimatedGroup
                                    variants={{
                                        container: {
                                            visible: {
                                                transition: { staggerChildren: 0.05, delayChildren: 0.75 },
                                            },
                                        },
                                        item: {
                                            hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
                                            visible: {
                                                opacity: 1,
                                                filter: "blur(0px)",
                                                y: 0,
                                                transition: { type: "spring", bounce: 0.3, duration: 1.5 },
                                            },
                                        },
                                    }}
                                    className="mt-10 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start"
                                >
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="lg" className="px-5 text-base">
                                                Saiba mais
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <Link href={'/wiki/digital'}>
                                                <DropdownMenuItem>
                                                    Rádios digitais
                                                    <DropdownMenuShortcut>
                                                        <Binary />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </Link>
                                            <Link href={'/wiki/analog'}>
                                                <DropdownMenuItem>
                                                    Rádios analógicos
                                                    <DropdownMenuShortcut>
                                                        <AudioWaveform />
                                                    </DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </Link>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Button asChild size="lg" variant="ghost" className="px-5 text-base">
                                        <Link href="/contact/#form">Solicitar demonstração</Link>
                                    </Button>
                                </AnimatedGroup>
                            </div>

                        </div>
                    </div>
                </section>



                <section className="bg-background pb-16 md:pb-32">
                    <div className="group relative m-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-44 md:border-r md:pr-6">
                                <p className="text-end text-sm">Trabalhamos com grandes marcas</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                                <InfiniteSlider
                                    speedOnHover={20}
                                    speed={40}
                                    gap={112}
                                >
                                    {typography.brands.map(({ src, title }, index) => (
                                        <div key={index} className='flex'>
                                            <Image
                                                className="mx-auto h-5 w-fit"
                                                src={typeof src === 'string' ? src : src.src}
                                                alt={title}
                                                height={100}
                                                width={100}
                                            />
                                        </div>
                                    ))}
                                </InfiniteSlider>

                                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                                <ProgressiveBlur
                                    className="pointer-events-none absolute left-0 top-0 h-full w-20"
                                    direction="left"
                                    blurIntensity={1}
                                />
                                <ProgressiveBlur
                                    className="pointer-events-none absolute right-0 top-0 h-full w-20"
                                    direction="right"
                                    blurIntensity={1}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}