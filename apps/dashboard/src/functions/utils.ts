import { ROUTES } from "@/constants/routes"

const checkIsPublicRoute = (path: string) => {
    const appPublicRoutes = Object.values(ROUTES.public)
    return appPublicRoutes.some(route =>
        path === route || path.includes(route)
    )
}

const checkIsPrivateRoute = (path: string) => {
    const appPrivateRoutes = Object.values(ROUTES.private).map((path) => path.split("*")[0])
    return appPrivateRoutes.some((route) => path.startsWith(route))
}

function formatToBRL(value?: string | number) {
    if (typeof value === 'string' || typeof value === 'number') {
        return Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
    return '-'
}



export { checkIsPrivateRoute, checkIsPublicRoute, formatToBRL }