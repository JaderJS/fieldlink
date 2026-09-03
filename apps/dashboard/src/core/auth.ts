import { Service, Work } from "@/features/transaction/routes/services"
import { Transaction } from "@/features/transaction/types"
import { UserProps } from "@/functions/user"

type Role = "ADMIN" | "USER" | "ROOT"

type PermissionCheck<Key extends keyof Permissions> = boolean | ((user: UserProps, data: Permissions[Key]["dataType"]) => boolean)

type RolesWithPermissions = {
    [R in Role]: Partial<{
        [Key in keyof Permissions]: Partial<{
            [Action in Permissions[Key]["action"]]: PermissionCheck<Key>
        }>
    }>
}


type Permissions = {
    dashboard: {
        dataType: any
        action: "view"
    },
    cart: {
        dataType: any
        action: "view" | "create" | "update" | "delete"
    },
    // stations: {
    //     dataType: Station
    //     action: "view" | "create" | "update" | "delete"
    // },
    // equipments: {
    //     dataType: Equipment,
    //     action: "view" | "create" | "update" | "delete"
    // },
    // groups: {
    //     dataType: Group[]
    //     action: "view" | "create" | "update" | "delete"
    // }
    services: {
        dataType: Service,
        action: "view" | "create" | "update" | "delete" | "viewDropped"
    },
    transactions: {
        dataType: Transaction,
        action: "view" | "create" | "update" | "delete"
    },
    order: {
        dataType: any,
        action: "view" | "create" | "update" | "delete"
    }
    work: {
        dataType: Work,
        action: "view" | "create" | "update" | "delete"
    }

}

const ROLES = {
    ADMIN: {},
    ROOT: {},
    USER: {
        order: {
            delete: false,
        },
        work: {
            delete: false,
        },
        transactions: {
            view: true,
            create: true,
            update: (user, transaction) => user.cuid === transaction.createdCuid,
            delete: (user, transaction) => user.cuid === transaction.createdCuid
        }
    }
} as const satisfies RolesWithPermissions


export function hasPermission<Resource extends keyof Permissions>(
    user: UserProps,
    resource: Resource,
    action: Permissions[Resource]["action"],
    data?: Permissions[Resource]["dataType"]
) {

    if (!user || !user.role) return false;

    return [user.role].some(role => {

        if (role === 'ROOT') return true

        const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]

        if (permission == null) return false

        if (typeof permission === "boolean") return permission
        return data != null && permission(user, data)
    })
}