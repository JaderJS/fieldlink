import { api } from "@/core/api"

type IUploadSingle = {
    key: string
    size: string
    mimetype: string
    path: string
    pathUrl: string
}

type IUploadWithVariants = {
    key: string
    variants: Record<string, IUploadSingle>
}

export const uploadArchiveNew = async (file: File, options?: { genVariants?: boolean }) => {

    const formData = new FormData()
    formData.append("file", file)
    formData.append("genVariants", String(false))

    const resp = await api.post<{
        key: string
        size: string
        mimetype: string
        path: string
        pathUrl: string
    }>(`/upload/img`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

    return resp.data
}

export const uploadArchiveWithVariants = async (file: File, options?: { genVariants?: boolean }) => {

    const formData = new FormData()
    formData.append("file", file)
    formData.append("genVariants", String(true))

    const resp = await api.post<{
        key: string
        variants: {
            key: string
            size: string
            mimetype: string
            path: string
            pathUrl: string
        }[]
    }>(`/upload/img`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

    return resp.data
}
