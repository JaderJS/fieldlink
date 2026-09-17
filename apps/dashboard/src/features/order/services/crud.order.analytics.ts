import { api } from '@/core/api'
import { KEYS } from '@/core/keys'
import { QueryFunctionContext } from '@tanstack/react-query'

type IGetOrderAnalyticsById = {
    analytics: {
        products: {
            id: number,
            name: string,
            price: number,
            cost: number,
            quantity: number,
            totalCost: number,
            totalSale: number,
        }[]
        summary: {
            recommendations: string[],
            totalCost: number,
            totalSale: number,
            totalProfit: number,
            profitMargin: number,
        },
    }
}

const getOrderAnalyticsById = async (ctx: QueryFunctionContext<ReturnType<typeof KEYS.order.getAnalyticsById>>) => {

    const { data } = await api.get<IGetOrderAnalyticsById>(`/order/${ctx.queryKey[1]}/analytics`)
    console.log(data)
    return data
}

export {
    getOrderAnalyticsById
}