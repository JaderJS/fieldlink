import { AnimatedGroup } from "@/src/components/motion.primitives/animated.group"
import { InView } from "@/src/components/motion.primitives/in.view"
import { TextEffect } from "@/src/components/motion.primitives/text.effect"
import Link from "next/link"

export const CallToAction = () => {
    return (
        <section
            className="bg-linear-to-r from-slate-900 to-zinc-900 text-white"
        >
            <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
                <InView as="div" once>
                    <TextEffect
                        as="h2"
                        per="word"
                        preset="fade"
                        delay={0.06}
                        className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight max-w-3xl mx-auto"
                    >
                        Quer implantar um sistema de rádio na sua operação?
                    </TextEffect>

                    <TextEffect
                        as="p"
                        per="line"
                        preset="slide"
                        delay={0.18}
                        className="mt-4 text-slate-200 max-w-2xl mx-auto"
                    >
                        Oferecemos avaliação de cobertura, projeto, instalação e treinamento. Saiba como medimos a zona de cobertura e como isso impacta custo e eficiência da operação.
                    </TextEffect>

                    {/* botões CTA com stagger */}
                    <AnimatedGroup as="div" preset="fade" className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/wiki/coverage"
                            aria-label="Entenda a zona de cobertura"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-secondary text-slate-900 font-semibold shadow hover:brightness-95 transition"
                        >
                            Ver zona de cobertura
                        </Link>

                        <Link
                            href="/contact"
                            aria-label="Solicitar orçamento"
                            className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-white/20 text-white font-semibold hover:bg-white/5 transition"
                        >
                            Solicitar orçamento
                        </Link>
                    </AnimatedGroup>

                    <div className="mt-4 text-sm text-slate-300">
                        <span>Não sabe por onde começar? </span>
                        <Link href="/contact" className="text-primary hover:underline">
                            Agende uma avaliação grátis
                        </Link>
                    </div>
                </InView>
            </div>
        </section>
    )
}