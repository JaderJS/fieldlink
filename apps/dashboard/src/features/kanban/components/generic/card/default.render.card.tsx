

export const DefaultRenderCard = <T,>({ item }: { item: T }) => {

    return (
        <>

            {Object.entries(item as Object).map(([key, value]) => (
                <div key={key} className="flex gap-2">
                    <span className="font-medium text-gray-500">{key}:</span>
                    <span className="text-gray-800">
                        {typeof value === 'object'
                            ? null
                            : String(value)}
                    </span>
                </div>
            ))}

        </>
    )
}