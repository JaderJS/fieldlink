'use client'

import { cn } from '@/src/lib/utils'
import { StaticImageData } from 'next/image'
import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { ParallaxBanner, ParallaxProvider } from 'react-scroll-parallax'

const BannerProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ParallaxProvider>
            {children}
        </ParallaxProvider>
    )
}

const Banner = ({ src, text, children }: { src: string, text?: string, children?: ReactNode }) => {
    return (
        <ParallaxBanner
            layers={[{ image: src, speed: -15 }]}
            className="aspect-2/1"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-8xl text-fieldlink-secondary font-bold">{text}</h1>
            </div>
        </ParallaxBanner>
    )
}

const BannerComponent = ({ src, children, className }: { src: string | StaticImageData, children?: ReactNode, className?: string }) => {
    const imageSrc = typeof src === 'string' ? src : src.src;
    return (
        <ParallaxBanner
            layers={[{ image: imageSrc, speed: -15 }]}
            className={cn("aspect-2/1", className)}
        >
            {children}
        </ParallaxBanner>
    )
}



const BannerContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className, "absolute inset-0 flex items-center justify-center")} {...props}>
        {children}
    </div>
))

BannerContent.displayName = 'BannerContent'


export { BannerProvider, Banner, BannerComponent, BannerContent }