'use client'
import { Header } from "@/src/components/custom/global/nav/navbar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TYPOGRAPHY } from "@/src/constants/typography";
import { AnimatedGroup } from "@/src/components/motion.primitives/animated.group";
import { Footer } from "@/src/components/custom/global/footer/footer";
import { CallToAction } from "@/src/components/custom/global/cta/cta";
import { CoverageEstimator } from "@/src/components/custom/global/calculator/coverage";
import Image from "next/image"
import { motion } from "framer-motion"

import { Banner, Section, SubHeader } from "@/src/components/custom/global/landscape/index"
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/src/components/ui/item";
import Link from "next/link";

export default function Digital() {

    const { intro, sectionOne, sectionTwo, technical, useCases, deployChecklist, faq } = TYPOGRAPHY.wiki.digital

    return (
        <>
            <Header />
            <Banner
                title={intro.banner.title}
                description={intro.banner.description}
                src={intro.banner.src}
            />

            {/* Intro */}
            <Section
                title={intro.title}
                text={intro.overView}
            />

            {/* Section One - benefits */}
            <Section
                title={sectionOne.title}
                text={sectionOne.description}
            />

            <section className="md:px-16 lg:px-64 m-12">

                <AnimatedGroup
                    as="div"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-12"
                    preset="fade"
                >
                    {sectionOne.items.map(({ icon: Icon, text, description }, index) => (
                        <div key={index} className="rounded-md h-full">
                            <Card className="h-full hover:shadow-lg duration-200 hover:scale-103 transition-all">
                                <CardHeader>
                                    <div className="w-full inline-flex justify-center items-center p-12">
                                        <Icon className="size-14 text-secondary" />
                                    </div>
                                    <CardTitle>{text}</CardTitle>
                                    <CardDescription>{description}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    ))}
                </AnimatedGroup>
            </section>

            <section className="md:px-16 lg:px-64 m-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-2">
                    <Image src={sectionTwo.src} alt="" />
                    <div className="flex flex-col">
                        <h3 className="text-4xl font-semibold leading-none tracking-tight py-6">{sectionTwo.text}</h3>
                        <p className="text-justify text-muted-foreground antialiased">{sectionTwo.description.join(' \n')}</p>
                    </div>
                </div>
            </section>



            {/* <CoverageEstimator /> */}

            {/* Technical points */}
            <Banner
                title={technical.banner.title}
                description={technical.banner.description}
                src={technical.banner.src}
            />

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-6 md:px-12 mt-20 pb-12"
            >
                <SubHeader title={technical.title} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {technical.points.map(({ title, text }, index) => (
                        <Item key={index} variant={'outline'} className='hover:scale-103 transition-all'>
                            <ItemContent className='gap-1'>
                                <ItemTitle className='text-lg font-semibold'>{title}</ItemTitle>
                                <ItemDescription>{text}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            </motion.section>

            {/* Use cases */}
            <Banner
                title={useCases.banner.title}
                description={useCases.banner.description}
                src={useCases.banner.src}
            />

            <motion.section
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="px-6 md:px-12 mt-20 pb-12"
            >
                <SubHeader title={useCases.title} />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {useCases.items.map(({ icon: Icon, title, text }, index) => (
                        <Item key={index} variant={'outline'} className='hover:scale-103 transition-all'>
                            <ItemMedia>
                                <Icon className='size-8 text-secondary' />
                            </ItemMedia>
                            <ItemContent className='gap-1'>
                                <ItemTitle className='text-lg font-semibold'>{title}</ItemTitle>
                                <ItemDescription>{text}</ItemDescription>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            </motion.section>

            {/* Deploy checklist */}
            <Banner
                title={deployChecklist.banner.title}
                description={deployChecklist.banner.description}
                src={deployChecklist.banner.src}
            />

            <section className="md:px-16 lg:px-64 m-12">
                <h3 className="text-2xl font-semibold leading-none tracking-tight py-6">{deployChecklist.title}</h3>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {deployChecklist.steps.map((s, i) => (
                        <li key={i}>{s.text}</li>
                    ))}
                </ul>
            </section>

            {/* CTA */}
            <CallToAction />

            {/* FAQ */}
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

            <Footer />
        </>
    )
}