import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import React from "react"
import { Notification } from "../../notification/components/notification"

export const breadcrumbConfig = {
  adm: { label: "Administração", redirect: false },
  sell: { label: "Vendas", redirect: true },
  purchase: { label: "Compras", redirect: true },
  stock: { label: "Estoque", redirect: true },
  users: { label: "Usuários", redirect: true },
  settings: { label: "Configurações", redirect: true },
  transaction: { label: "Transações", redirect: true },
  service: { label: "Serviço", redirect: true },
  product: { label: "product", redirect: true },
  equipment: { label: "Equipamento", redirect: true },
  daily: { label: "Paginas", redirect: true },
  station: { label: "Estação", redirect: true },
  order: { label: "Ordem  ", redirect: true },
  clients: { label: "Clientes", redirect: true },
  properties: { label: "Propriedades", redirect: true },
  stations: { label: "Sites", redirect: true }
}

export function SiteHeader() {

  const pathname = usePathname()
  const pathSegments = pathname.split("/").filter(Boolean)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`
              const isLast = index === pathSegments.length - 1

              const config = breadcrumbConfig[segment as keyof typeof breadcrumbConfig]
              const label = config ? config.label : segment

              return (
                <React.Fragment key={index}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-semibold">{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={fullPath}>{label}</BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <Notification />
        </div>
      </div>
    </header>
  )
}
