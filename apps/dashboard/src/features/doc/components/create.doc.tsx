'use client'
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { upsertDoc } from "../services/crud"
import { useRouter } from "next/navigation"
import { DEFAULT_NEW_DOC } from "../constants/new.doc"

export const CreateNewDoc = () => {
    const { push } = useRouter()
    const { mutateAsync: upsertDocFn } = useMutation({
        mutationFn: upsertDoc,
        onSuccess: ({ cuid }) => {
            push(`/doc/${cuid}`)
        }
    })


    const handleCreateNewDoc = () => {
        console.log(DEFAULT_NEW_DOC)
        upsertDocFn(DEFAULT_NEW_DOC)
    }

    return (
        <Button onClick={handleCreateNewDoc} variant={"ghost"}>
            Criar novo documento +
        </Button>
    )
}