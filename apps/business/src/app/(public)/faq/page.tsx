import { Header } from '@/src/components/custom/global/nav/navbar'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/src/components/ui/accordion'
import { TYPOGRAPHY } from '@/src/constants/typography'
import { ChevronsUpDown } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import Link from 'next/link'

type FAQItem = {
    id: string
    icon: IconName
    question: string
    answer: string
}

export default function PageFAQsThree() {

    const { title, asks, icon } = TYPOGRAPHY.faq

    return (
        <>
            <Header />
            <section className="py-20 h-full">
                <div className="mx-auto max-w-5xl px-4 md:px-6">
                    <div className="flex flex-col gap-10 md:flex-row md:gap-16">
                        <div className="md:w-1/3">
                            <div className="sticky top-20">
                                <h2 className="mt-4 text-3xl font-bold">Perguntas frequentes</h2>
                                <p className="text-muted-foreground mt-4">
                                    Não encontrou o que procura? Entre em contato com nosso{' '}
                                    <Link
                                        href="/contact/#form"
                                        className="text-primary font-medium hover:underline">
                                        time
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="md:w-2/3">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full space-y-2">
                                {asks.map(({ answer, question, icon: Icon }, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={String(index)}
                                        className="bg-background shadow-xs rounded-lg border px-4 last:border-b">
                                        <AccordionTrigger className="cursor-pointer items-center py-5 hover:no-underline">
                                            <div className="flex items-center gap-3">
                                                <Icon className='text-secondary size-4' />
                                                <span className="text-base font-semibold">{question}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pb-5">
                                            <div className="px-9">
                                                <p className="text-base">{answer}</p>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}