import { TextEffect } from "@/src/components/motion.primitives/text.effect";
import { BannerComponent, BannerContent } from "../parallax.banner/parallax.banner";
import { StaticImageData } from "next/image";

export const Banner = ({ title, description, src }: { title: string, description?: string, src: StaticImageData | string }) => {
    return (
        <BannerComponent src={src}>
            <BannerContent className="relative flex items-center justify-center py-20">
                <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-linear-to-b from-black/35 via-black/25 to-black/35 backdrop-blur-[0.24rem]"
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
                text-2xl sm:text-5xl md:text-6xl lg:text-8xl
                drop-shadow-2xl"
                        style={{ WebkitFontSmoothing: 'antialiased' }}
                    >
                        {title}
                    </TextEffect>

                    {description && <TextEffect
                        as="p"
                        per="line"
                        preset="slide"
                        delay={typeof window !== 'undefined' &&
                            window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 0.28}
                        className="mt-4 text-white font-semibold text-base sm:text-lg md:text-xl leading-relaxed
                max-w-2xl mx-auto"
                    >
                        {description}
                    </TextEffect>}
                </div>
            </BannerContent>
        </BannerComponent>
    )
}