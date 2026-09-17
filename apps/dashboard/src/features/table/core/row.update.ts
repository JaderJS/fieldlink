export function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
    const result = { ...target }

    for (const key in source) {
        const sourceValue = source[key]
        const targetValue = target[key]

        if (
            typeof sourceValue === 'object' &&
            sourceValue !== null &&
            !Array.isArray(sourceValue) &&
            typeof targetValue === 'object' &&
            targetValue !== null &&
            !Array.isArray(targetValue)
        ) {
            result[key] = deepMerge(targetValue, sourceValue)
        } else {
            result[key] = sourceValue as unknown as T[typeof key]
        }
    }

    return result
}


export function updateRow<T extends Record<string, any>>(
    data: T[],
    rowIndex: number,
    values: Partial<T> | any,
    columnId?: keyof T
): T[] {
    return data.map((row, index) => {
        if (index !== rowIndex) return row

        if (typeof values === 'object' && !Array.isArray(values)) {
            return deepMerge(row, values)
        }

        if (columnId) {
            return {
                ...row,
                [columnId]: values
            } as T
        }

        return row
    })
}
