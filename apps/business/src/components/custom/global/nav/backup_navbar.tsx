'use client'

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/src/components/ui/navigation-menu"
import { useIsMobile } from "@/src/hooks/use-mobile"
import { cn } from "@/src/lib/utils"
import { AudioLines, AudioWaveform, Binary, HamburgerIcon, Menu, MoreVertical, RadioTower, Wrench, X } from "lucide-react"
import { ElementType, forwardRef, ReactNode, useEffect, useRef, useState } from "react"
import logoImage from '@/public/logo.png'
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/src/components/ui/popover"
import { Button } from "@/src/components/ui/button"
import Link from "next/link"


type IItens = {
    name: string,
    href: string,
    description: string,
    subitens?: {
        name: string,
        href: string,
        description: string
        icon?: ElementType
    }[]
}

const itens: IItens[] = [
    {
        name: "Serviços",
        href: "#",
        description: "",
        subitens: [
            {
                name: "Fieldlink",
                href: "/services",
                description: "A FielLink Solutions, oferece muito mais do que produtos, soluções ideais para impulsionar suas comunicações"
            },
            {
                name: "Aprenda mais sobre o serviço de comunicação digital.",
                href: "/wiki/digital",
                description: "Aprenda mais sobre o serviço de comunicação digital...",
                icon: Binary
            },
            {
                name: "O bom e velho rádio analógico, sendo repassado por gerações",
                href: "/wiki/analog",
                description: "O bom e velho rádio analógico, sendo repassado por gerações...",
                icon: AudioWaveform
            },
            {
                name: "Veja por você mesmo o quanto o sistema de rádio pode gerar de economia",
                href: "/wiki/analog",
                description: ""
            }
        ]
    },
    {
        name: "Quem somos?",
        href: "/about",
        description: ""
    },
    {
        name: "Contato",
        href: "/contact",
        description: ""
    },
    {
        name: "Aprenda mais",
        href: "/wiki",
        description: ""
    },
]

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
    logo?: ReactNode
}

export const Logo = <Image src={logoImage} alt="logo" width={36} />

export const Header = forwardRef<HTMLElement, HeaderProps>(({ className, logo = Logo, ...props }, ref) => {

    const isMobile = useIsMobile()

    return (
        <header
            ref={ref}
            className={cn(
                'sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80 px-4 md:px-6',
                className
            )}
            {...props}
        >
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between gap-4">

                {/* Left side */}
                <div className="flex w-full  justify-between items-center gap-2">
                    {/* Mobile menu trigger */}

                    {isMobile && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className="group h-9 w-9 hover:bg-accent hover:text-accent-foreground"
                                    variant="outline"
                                    size="icon"
                                >
                                    <Menu className="size-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="w-42 p-1">
                                <div className="flex flex-col w-full gap-0.5">
                                    {itens.map((link) => (
                                        <Button key={link.href} asChild className="w-full justify-start" size="sm" variant={"ghost"}>
                                            <Link href={link.href}>{link.name}</Link>
                                        </Button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}

                    {/* Main nav */}
                    <div className="flex justify-between items-center gap-6">
                        <Button
                            onClick={(e) => e.preventDefault()}
                            variant={"ghost"}
                            className="flex items-center cursor-pointer hover:bg-transparent"
                            asChild
                        >
                            <Link href={"/"} prefetch>
                                {logo}
                            </Link>
                        </Button>

                        {/* Navigation menu */}
                        {!isMobile && (
                            <NavigationMenu className="flex">
                                <NavigationMenuList className="gap-1">
                                    {itens.map((item, index) => {
                                        if (item.subitens?.length) return (
                                            <NavigationMenuItem key={`${item.name}-${item.href}`}>
                                                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                                                <NavigationMenuContent className="z-20">
                                                    <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                                        {item.subitens?.at(0) && (
                                                            <li className="row-span-3">
                                                                <NavigationMenuLink
                                                                    href={item.href}
                                                                    className="p-4 from-muted/0 to-muted/40 flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md-p6"
                                                                >
                                                                    <RadioTower className="size-10" />
                                                                    <span className="mb-2 text-lg font-medium sm:mt-4">
                                                                        {item.subitens?.[0].name}
                                                                    </span>
                                                                    <p className="text-muted-foreground text-sm leading-tight">
                                                                        {item.subitens?.[0].description}
                                                                    </p>
                                                                </NavigationMenuLink>
                                                            </li>
                                                        )}
                                                        {item.subitens?.slice(1).map((subitem, index) => (
                                                            <ListItem
                                                                key={`${subitem.name}-${subitem.href}`}
                                                                href={subitem.href}
                                                                title={subitem.name}
                                                                className=""
                                                                icon={subitem.icon}
                                                            >
                                                                {subitem.description}
                                                            </ListItem>
                                                        ))}
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        )

                                        return (
                                            <NavigationMenuItem key={`${item.name}-${item.href}`} >
                                                <NavigationMenuLink href={`${item.href}`} className={navigationMenuTriggerStyle()}>{item.name}</NavigationMenuLink>
                                            </NavigationMenuItem>
                                        )
                                    })}
                                </NavigationMenuList>
                            </NavigationMenu>
                        )}
                    </div>
                </div>

            </div>
        </header>
    )
})

Header.displayName = "Header"

function ListItem({
    title,
    children,
    href,
    icon: Icon,
    ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string, icon?: ElementType }) {
    return (
        <li {...props} className="flex">
            <NavigationMenuLink href={href} className="flex flex-row gap-2 transition-all">
                {Icon && <Icon className={"size-8"} />}
                <article className="flex flex-col">
                    <div className="text-sm leading-none font-medium">{title}</div>
                    <p className="text-muted-foreground text-xs">
                        {children}
                    </p>
                </article>
            </NavigationMenuLink>
        </li>
    )
}