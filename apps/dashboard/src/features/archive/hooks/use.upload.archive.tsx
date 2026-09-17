'use client'

import { useMutation } from "@tanstack/react-query"
import { uploadArchive } from "../service/archive.service"
import { uploadArchiveNew } from "../api/crud"

export const useUploadArchive = () => {
    return useMutation({
        mutationFn: uploadArchive
    })
}

export const useUploadArchiveNew = () => {
    return useMutation({
        mutationFn: uploadArchiveNew
    })
}