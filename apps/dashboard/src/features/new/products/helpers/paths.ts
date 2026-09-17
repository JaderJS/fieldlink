
// export const getAtPath = (obj: any, path: string[]) => {
//     return path.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj)
// }

function toPath(path: string | string[]) {
    return Array.isArray(path) ? path : String(path).split(".");
}

export function getAtPath(obj: any, path: string | string[]) {
    const parts = toPath(path);
    return parts.reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export const setAtPath = <T extends object>(obj: T, path: string[], value: any): T => {
    if (path.length === 0) return obj
    const [head, ...rest] = path
    const current = (obj as any)[head]

    const newObj = Array.isArray(obj) ? [...(obj as any)] : { ...(obj as any) }
    if (rest.length === 0) {
        newObj[head] = value
    } else {
        newObj[head] = setAtPath(current ?? {}, rest, value)
    }

    return newObj
}