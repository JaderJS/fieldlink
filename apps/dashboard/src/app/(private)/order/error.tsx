'use client'

import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    
    console.error("Error loading orders:", error)

    return (
        <div className="p-8 block justify-start">
            <h2 className="text-lg font-semibold text-destructive">Algo deu errado ao carregar as ordens.</h2>
            <p className="text-sm text-muted-foreground">{error.message}</p>
            <Button
                variant={"secondary"}
                onClick={() => reset()}
                className="mt-4"
            >
                Tentar novamente
            </Button>
        </div>
    )
}
