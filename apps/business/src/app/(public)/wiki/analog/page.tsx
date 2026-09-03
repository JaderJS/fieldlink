'use client'

import { BannerComponent, BannerContent, BannerProvider } from "@/src/components/custom/global/parallax.banner/parallax.banner";
import { TextEffect } from "@/src/components/motion.primitives/text.effect";
import { TYPOGRAPHY } from "@/src/constants/typography"
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion'

import { cn } from "@/src/lib/utils";
import { Header } from "@/src/components/custom/global/nav/navbar";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/src/components/ui/item";
import { Blocks } from "lucide-react";
import { CallToAction } from "@/src/components/custom/global/cta/cta";
import { Footer } from "@/src/components/custom/global/footer/footer";
import { Banner, Section } from "@/src/components/custom/global/landscape";
import Link from "next/link";

export default function PageWikiAnalog() {


    const { intro, features, useCases, faq } = TYPOGRAPHY.wiki.analog

    return (
        <>
            <Header />

            {/* Intro */}
            <Banner title={intro.banner.text} description={intro.banner.description} src={intro.banner.src} />
            <Section
                title={intro.title}
                text={intro.overview}
                icon={intro.icon}
                className="mb-12"
            />

            {/* Features */}
            <Banner
                title={features.banner.title}
                description={features.banner.subtitle}
                src={features.banner.src}
            />

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-6 md:px-12 mt-20 pb-12"
            >
                <SubHeader icon={Blocks} title={"Funcionalidades"} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {features.itens.map(({ icon: Icon, text, description }, index) => (
                        <Item key={index} variant={'outline'} className='hover:scale-103 transition-all'>
                            <ItemMedia>
                                <Icon className='size-18 text-secondary' />
                            </ItemMedia>
                            <ItemContent className='gap-1'>
                                <ItemTitle className='text-lg font-semibold'>{text}</ItemTitle>
                                <ItemDescription>{description}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            </motion.section>

            {/* Use Cases */}
            <Banner
                title={useCases.banner.title}
                description={useCases.banner.subtitle}
                src={useCases.banner.src}
            />


            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-6 md:px-12 mt-20 pb-12"
            >
                <SubHeader icon={Blocks} title={"Casos de uso"} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {features.itens.map(({ icon: Icon, text, description }, index) => (
                        <Item key={index} variant={'outline'} className='hover:scale-103 transition-all'>
                            <ItemMedia>
                                <Icon className='size-18 text-secondary' />
                            </ItemMedia>
                            <ItemContent className='gap-1'>
                                <ItemTitle className='text-lg font-semibold'>{text}</ItemTitle>
                                <ItemDescription>{description}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            </motion.section>

            {/* Call to action */}
            <CallToAction />

            <section className="md:px-16 lg:px-64 m-12">
                <h3 className="text-2xl font-semibold leading-none tracking-tight py-6">Perguntas frequentes</h3>
                <div className="space-y-3">
                    {faq.map((f, i) => (
                        <details key={i} className="p-4 border rounded-md">
                            <summary className="font-medium cursor-pointer">{f.question}</summary>
                            <div className="mt-2 text-sm text-muted-foreground">{f.answer}</div>
                        </details>
                    ))}
                </div>
                <p className="mt-3">Não encontrou a sua pergunta? <Link href={`/faq`} className="text-primary hover:underline" >Veja algumas outras dúvidas que podem ser a sua.</Link></p>
            </section>

            {/* Footer */}
            <Footer />
        </>
    )
}



function SubHeader({ icon: Icon, title }: { icon: any, title: string }) {
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