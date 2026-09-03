export const matchSearch = (value: unknown, search: string, seen = new WeakSet<object>()): Boolean => {
    if (value === null || value === undefined) return false;
    const t = typeof value
    if (t === 'string') return String(value).toLowerCase().includes(search)
    if (t === 'number' || t === 'bigint' || t === 'boolean') return String(value).toLowerCase().includes(search)
    // if (Array.isArray(value)) return value.some(v => matchSearch(value, search, seen))

    if (t === 'object') {
        const obj = value as Record<string, any>
        if (seen.has(obj)) return false
        seen.add(obj)
        for (const key of Object.keys(obj)) {
            if (matchSearch(obj[key], search, seen)) return true
        }
    }

    return false
}