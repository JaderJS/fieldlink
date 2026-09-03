export const aggregateItens = <T extends { id?: number, name?: string, value?: number, qtd?: number }>(
    itens: T[],
    keyFn?: (it: T) => string
): T[] => {
    const map = new Map<string, T>()
    const key = keyFn ?? ((it?: T) => (it?.id != null ? `id:${it.id}` : `${it?.name}::${String(it?.value)}`))
    for (const it of itens) {
        const k = key(it)
        const existing = map.get(k)
        if (existing) {
            const existingQtd = Number(existing.qtd ?? 0)
            const addQtd = Number(it.qtd ?? 0)

            existing.qtd = existingQtd + addQtd
            existing.value = it.value ?? existing.value
        } else {
            map.set(k, { ...it })
        }
    }

    return Array.from(map.values())
}