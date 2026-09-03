'use client'

import { motion } from 'framer-motion'
import { Users, History, Wrench, Cog } from 'lucide-react'
import { BannerComponent, BannerContent } from '@/src/components/custom/global/parallax.banner/parallax.banner'
import { TextEffect } from '@/src/components/motion.primitives/text.effect'
import { TYPOGRAPHY } from '@/src/constants/typography'
import { Header } from "@/src/components/custom/global/nav/navbar";
import { Timeline, TimelineItem, TimelineTitle } from '@/src/components/custom/global/timeline'
import { StaticImageData } from 'next/image'
import { Item, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from '@/src/components/ui/item'
import { CallToAction } from '@/src/components/custom/global/cta/cta'
import { Footer } from '@/src/components/custom/global/footer/footer'
import { Banner } from '@/src/components/custom/global/landscape'

export default function PageAbout() {

    const { intro, mission, capabilities, history, laboratory, values, vision } = TYPOGRAPHY.about

    return (
        <>
            <Header />
            <div className="flex flex-col w-full">

                <Banner
                    title={intro.banner.title}
                    description={intro.banner.description}
                    src={intro.banner.image}
                />

                {/* 🔸 Intro */}
                {/* <BannerComponent src={intro.banner.image}>
                    <BannerContent className="relative flex items-center justify-center py-20">
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-linear-to-b from-black/45 via-black/25 to-black/45 backdrop-blur-sm"
                        />
                        <div className="relative z-10 max-w-3xl px-4 text-center">
                            <TextEffect
                                as="h1"
                                per="char"
                                preset="fade"
                                delay={typeof window !== 'undefined' &&
                                    window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.08}
                                speedReveal={1.1}
                                className="text-white/90 font-bold tracking-tight leading-tight
                text-4xl sm:text-5xl md:text-6xl lg:text-8xl
                drop-shadow-2xl"
                                style={{ WebkitFontSmoothing: 'antialiased' }}
                            >
                                {intro.banner.title}
                            </TextEffect>

                            <TextEffect
                                as="p"
                                per="line"
                                preset="slide"
                                delay={typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.28}
                                className="mt-4 text-white  font-semibold text-base sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                            >
                                {intro.banner.description}
                            </TextEffect>
                        </div>
                    </BannerContent>
                </BannerComponent> */}

                <Section
                    icon={intro.icon}
                    title={intro.title}
                    text={intro.text}
                />

                {/* 🔸 Missão / Visão */}
                <div className="grid md:grid-cols-2 gap-6 px-6 md:px-12 mt-10">
                    <Section
                        icon={mission.icon}
                        title={mission.text}
                        text={mission.description}
                    />
                    <Section
                        icon={vision.icon}
                        title={vision.text}
                        text={vision.description}
                    />
                </div>

                {/* 🔸 Valores */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="px-6 md:px-12 mt-20 pb-12"
                >
                    <Header_ icon={values.icon} title={values.text} />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {values.topics.map(({ icon: Icon, title, description }, index) => (
                            <Item key={index} variant={'outline'} className='hover:scale-103 transition-all'>
                                <ItemMedia>
                                    <Icon className='size-8 text-secondary' />
                                </ItemMedia>
                                <ItemContent className='gap-1'>
                                    <ItemTitle className='text-lg font-semibold'>{title}</ItemTitle>
                                    <ItemDescription>{description}</ItemDescription>
                                </ItemContent>
                            </Item>
                        ))}
                    </div>
                </motion.section>

                {/* 🔸 História */}
                <Banner title={history.banner.title} src={history.banner.image} />
                <motion.section
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="px-6 md:px-12 mt-20"
                >
                    <Header_ icon={History} title="De volta no tempo" />
                    <Timeline   >
                        {history.timeline.map(({ year, text, icon: Icon }, index) => (
                            <TimelineItem
                                key={year}
                                icon={<Icon />}
                                iconColor='muted'
                                animate={true}
                                date={year}
                                title={text}
                            />
                        ))}
                    </Timeline>
                </motion.section>

                {/* 🔸 Laboratório */}
                <Banner title={laboratory.banner.title} src={laboratory.banner.image} />
                <Section
                    icon={Wrench}
                    title="Laboratório e equipe preparada"
                    text="Nosso laboratório é especializado em serviços de rádio propagação, medições e diagnóstico avançado de falhas. Equipado com instrumentos de precisão, permite testes em campo, reduzindo tempo de parada e garantindo agilidade na solução."
                />

                {/* 🔸 Diferenciais */}
                <motion.section
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="px-6 md:px-12 mt-20 mb-24"
                >
                    <Header_ icon={Cog} title={capabilities.title} />
                    <div className='flex w-full mt-8'>
                        <ItemGroup className='grid md:grid-cols-3 gap-4'>
                            {capabilities.items.map(({ title, text, icon: Icon }, i) => (
                                <Item key={i} variant={'outline'} className='hover:scale-103 transition-all'>
                                    <ItemMedia>
                                        <Icon className='size-8 text-secondary' />
                                    </ItemMedia>
                                    <ItemContent className='gap-1'>
                                        <ItemTitle className='text-lg font-semibold'>{title}</ItemTitle>
                                        <ItemDescription>{text}</ItemDescription>
                                    </ItemContent>
                                </Item>
                            ))}
                        </ItemGroup>
                    </div>
                </motion.section>
            </div>
            <CallToAction />
            <Footer />
        </>

    )
}

/* 🔧 Components reutilizáveis */
function Section({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-6 md:px-12 mt-20 max-w-5xl mx-auto text-center"
        >
            <Header_ icon={Icon} title={title} />
            <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">{text}</p>
        </motion.section>
    )
}

function Header_({ icon: Icon, title }: { icon: any; title: string }) {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center gap-3">
            <div className="bg-secondary/10 p-3 rounded-full">
                <Icon className="text-secondary size-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold antialiased">
                {title}
            </h2>
        </div>
    )
}
