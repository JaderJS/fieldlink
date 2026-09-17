'use client'
import dynamic from "next/dynamic"

export const ViewMapsDynamic = dynamic(
    // async () => await import("@/features/maps/components/view.maps"),
    {
        ssr: false,
        loading: () => <p>A map is loading... </p>
    }
)
