import { TYPOGRAPHY } from "@/src/constants/typography"
import { Instagram, Key, Linkedin, MapPin } from "lucide-react"
import Link from "next/link"


export const Footer = () => {

    return (
        <footer className="bg-foreground grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 p-12 text-muted-foreground w-full">
            <Link href={TYPOGRAPHY.contact.googleMaps} className="inline-flex gap-x-3 text-sm items-center">
                <MapPin />
                <p>Travessa Antártica, n°75, centro, Colíder-MT</p>
            </Link>
            <Link href={TYPOGRAPHY.contact.instagram.src} className="inline-flex gap-x-3 text-sm items-center">
                <Instagram />
                <p>{TYPOGRAPHY.contact.instagram.user}</p>
            </Link>
            <Link href={TYPOGRAPHY.contact.Linkedin.src} className="inline-flex gap-x-3 text-sm items-center">
                <Linkedin />
                <p>{TYPOGRAPHY.contact.Linkedin.user}</p>
            </Link>
            <Link href={'/dashboard/properties'} className="inline-flex gap-x-3 text-sm items-center">
                <Key />
                <p>Dashboard</p>
            </Link>
        </footer>
    )
}