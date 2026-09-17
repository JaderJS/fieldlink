'use client'

import Link from "next/link"
import { Button } from "../ui/button"
import { useAuth } from "@/providers/auth"
import { LayoutDashboard } from "lucide-react"

export const ViewRoot = () => {

    const { hasPermission, user } = useAuth()

    if (!user) return null

    return (
        <div className="flex flex-col gap-4 h-full">
            <section className="grid grid-cols-2 lg:grid-cols-4 lg:p-12 h-1/3 gap-4 p-1">
                {hasPermission(user, 'dashboard', 'view') && <Button className="h-full" asChild variant="secondary">
                    <Link href={`/adm`}>
                        <LayoutDashboard />
                        <span>Dashboard</span>
                    </Link>
                </Button>}
                {hasPermission(user, 'cart', 'view') && <Button className="h-full" asChild variant="secondary">
                    <Link href={`/adm/purchase`}>Compras</Link>
                </Button>}
            </section>
            <section className="grid grid-cols-2 lg:grid-cols-4 lg:p-12 h-1/3 gap-4 p-1">
                {/* {hasPermission(user, 'stations', 'view') && <Button className="h-full" asChild variant="secondary">
                    <Link href={`/station`}>Estações</Link>
                </Button>}
                {hasPermission(user, 'equipments', 'view') && <Button className="h-full" asChild variant="secondary">
                    <Link href={`/equipment`}>Equipamentos</Link>
                </Button>}
                {hasPermission(user, 'groups', 'view') && <Button className="h-full" asChild variant="secondary">
                    <Link href={`/group`}>Grupos</Link>
                </Button>} */}
            </section>
        </div>
    )
}