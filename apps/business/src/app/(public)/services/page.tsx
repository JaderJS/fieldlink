import { Footer } from "@/src/components/custom/global/footer/footer";
import { Header } from "@/src/components/custom/global/nav/navbar";
import { AnimatedGroup } from "@/src/components/motion.primitives/animated.group";
import { Card, CardHeader } from "@/src/components/ui/card";
import { AudioWaveform, Binary, Radar, Smartphone } from "lucide-react";
import Link from "next/link";

const SERVICES = [
    {
        icon: Binary,
        href: "/wiki/digital",
        title: "Sistema de rádio digital",
        description: "Explore mais sobre o mundo dos rádios digitais e como eles podem ser incorporados em operação."
    },
    {
        icon: AudioWaveform,
        href: "/wiki/analog",
        title: "Sistema de rádio analógico",
        description: "O bom e velho rádio analógico, que surpreende ainda pela facilidade de operação e implantação."
    },
    {
        icon: Radar,
        href: "/wiki/coverage",
        title: "Rádio frequência e cobertura",
        description: "Aprenda mais em termos técnicos como o sistema de rádio e propagação se comporta e influencia na cobertura do rádio."
    },
    {
        icon: Smartphone,
        href: "/wiki/roip",
        title: "ROIP",
        description: "Integre sua comunicação diretamente e em qualquer lugar que esteja."
    },
]

export default function PageServices() {
    return (
        <main className="flex flex-col h-dvh">
            <Header />
            <section className="flex-1 p-4 lg:p-8">
                <AnimatedGroup className="grid lg:grid-cols-3 gap-4 h-full">
                    {SERVICES.map(({ icon: Icon, ...service }, index) => (
                        <Link key={index} href={service.href} prefetch>
                            <Card className="flex justify-center items-center h-full hover:shadow-2xl hover:shadow-secondary">
                                <Icon className="text-primary size-12" />
                                <p className="p-1 text-2xl text-center font-semibold">{service.title}</p>
                                <span className="p-4 text-sm text-justify">{service.description}</span>
                            </Card>
                        </Link>
                    ))}
                </AnimatedGroup>
            </section>
            <Footer />
        </main>
    )
}