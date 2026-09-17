'use client'

import { KEYS } from "@/core/keys"
import { getDocs } from "../services/crud"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CreateNewDoc } from "./create.doc"
import { useDocs } from "../hooks/useDocs"
import { useUpsertDoc } from "../hooks/useUpsertDoc"
import { DEFAULT_NEW_DOC } from "../constants/new.doc"

export const ViewDocInList = () => {

    const { data: docs } = useDocs()
    const { mutateAsync: upsertDocFn } = useUpsertDoc()

    return (
        <>
            <CreateNewDoc />
            {docs?.map((doc) => (
                <Button asChild key={doc.cuid} variant="link">
                    <Link href={`/doc/${doc.cuid}`}>
                        {doc.title}
                    </Link>
                </Button>
            ))}
            {docs?.length === 0 && (
                <Button
                    onClick={() => upsertDocFn({ ...DEFAULT_NEW_DOC })}
                >
                    No documents found. Please create a new document.
                </Button>
            )}
        </>
    )
}