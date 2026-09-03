import { Transaction } from "@/features/transaction/types"

type ResourceId = string | number

const createKeysWithFilters = <F>(resource: string) => ({
    getAll: (filters?: F) => [resource, filters] as const,
    getById: (id: ResourceId, filters?: F) => [resource, id, filters] as const,
})

type ArchiveFilters = { transaction?: { id: number } }

const KEYS = {
    installment: {
        getAll: (params?: { transaction?: { id: number } }) => {
            if (params && Object.keys(params).length) return ['installments', params] as const
            return ['installments'] as const
        },
        getById: (id: number) => [...KEYS.installment.getAll(), { id }] as const,
    } as const,

    database: {
        getAll: () => [`databases`] as const,
        getById: (_id: string) => [...KEYS.database.getAll(), { _id }] as const
    } as const,

    location: {
        getAll: () => [`api-locations`] as const,
        getByName: (params: { cityName: string }) => [...KEYS.location.getAll(), params] as const
    } as const,

    notification: {
        getAll: () => [`notifications`] as const,
    } as const,

    dashboard: {
        getAll: () => [`get-dashboards`] as const,
    } as const,

    archive: createKeysWithFilters<ArchiveFilters>('get-archive'),
    bank: {
        getAll: () => [`get-bank`],
        getById: (id: number) => [`get-bank`, id]
    },
    period: {
        getAll: () => [`get-period`],
        getById: (id: number) => [`get-period`, id]
    },
    company: {
        getAll: () => [`get-company`],
        getById: (id: number) => [`get-company`, id]
    },

    transaction: {
        getAll: (params: { stationId?: number, clientId?: number } = {}) => {
            if (params && Object.keys(params).length) return ['get-transactions', params] as const
            return ['get-transactions'] as const
        },
        getById: (id: number) => [...KEYS.property.getAll(), id] as const,
    } as const,
    // transaction: createKeysWithFilters<Partial<Transaction>>('get-transaction'),

    supplier: {
        getAll: () => [`get-carts`],
        getById: (id: number) => [`get-carts`, id]
    },
    cart: {
        getAll: () => [`get-carts`] as const,
        getById: (id: number) => [...KEYS.cart.getAll(), id] as const
    } as const,

    product: {
        getAll: () => [`get-products`] as const,
        getById: (params: { id: number }) => [...KEYS.product.getAll(), params] as const,
    } as const,

    productCategories: {
        getAll: () => [`get-product-categories`],
    },
    client: {
        getAll: () => [`get-clients`] as const,
        getById: (id: number) => [...KEYS.client.getAll(), id] as const,
    } as const,

    station: {
        getAll: (params: {
            filters?: {
                excludeStationId?: number
                frequency?: {
                    rx?: number
                    tx?: number
                    renge?: number
                }
                location?: {
                    latitude?: number
                    longitude?: number
                    range?: number
                }
            }
        } = {}) => {
            if (params && Object.keys(params).length) return [`get-stations`, params] as const
            return [`get-stations`] as const
        },
        getById: (id: number) => [...KEYS.station.getAll(), id] as const,
    } as const,

    property: {
        getAll: (params: { stationId?: number, clientId?: number } = {}) => {
            if (params && Object.keys(params).length) return ['get-properties', params] as const
            return ['get-properties'] as const
        },
        getById: (id: number) => [...KEYS.property.getAll(), id] as const,
    } as const,

    equipment: {
        getAll: (params: {} = {}) => {
            if (params && Object.keys(params).length) return [`get-equipments`, params] as const
            return [`get-equipments`] as const
        },
        getById: (id: number) => [...KEYS.equipment.getAll(), id] as const,
    } as const,

    order: {
        getAll: () => [`get-orders`] as const,
        getById: (id: number, props: { headers?: any } = {}) => [...KEYS.order.getAll(), id, props] as const,
        getAnalyticsById: (id: number) => [...KEYS.order.getAll(), id] as const,
    } as const,

    orderStatus: {
        getAll: () => [`get-orders-status`] as const,
        getById: (id: number, props: { headers?: any } = {}) => [...KEYS.order.getAll(), id, props] as const,
    } as const,

    docs: {
        getAll: () => [`get-docs`] as const,
        getByCuid: (params: { cuid: string }) => [...KEYS.docs.getAll(), params] as const,
    } as const,

    channelSchema: {
        getAll: (params: { stationId?: number } = {}) => {
            if (params && Object.keys(params).length) return [`get-channels-schemas`, params] as const
            return [`get-channels-schemas`] as const
        },
        getById: (id: number) => [...KEYS.channelSchema.getAll(), id] as const
    },

    group: {
        getAll: (params: { stationId?: number } = {}) => {
            if (params && Object.keys(params).length) return [`get-groups`, params] as const
            return [`get-groups`] as const
        },
        getById: (id: number) => [...KEYS.group.getAll(), id] as const
    }
} as const

export { KEYS }