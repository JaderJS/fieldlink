'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    console.error("Error loading orders:", error)

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold text-red-600">Algo deu errado ao carregar os equipamentos.</h2>
            <p className="text-sm text-gray-500">{error.message}</p>
            <button
                onClick={() => reset()}
                className="mt-4 bg-blue-500 text-white px-3 py-1 rounded"
            >
                Tentar novamente
            </button>
        </div>
    )
}
