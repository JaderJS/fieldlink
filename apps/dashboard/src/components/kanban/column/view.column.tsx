'use client'
import { Button } from "@/components/ui/button"
import { FormElements } from "../builder/types/field.types"
import { DEFAULT } from "./values"

import { Board } from '@/components/kanban/builder/types/board.types'
import { useCallback, useRef } from "react"
import { toast } from "sonner"
import { useQuery } from "@tanstack/react-query"
import { getDatabase } from "@/functions/kanban"

const ViewColumn = ({ boardId }: { boardId: string }) => {

    return (
        <>NOT IMPLEMENTED</>
    )

    // const { data: board } = useQuery({ queryKey: [QUERY_KEY.getDatabase, { _id: boardId }], queryFn: getDatabase })
    // if (!board) return null

    // const data: Board = JSON.parse(board.database._id)

    // const columnValues = useRef<{ [key: string]: any }>({})
    // const columnErrors = useRef<{ [key: string]: any }>({})

    // const submitValue = useCallback((key: string, value: string) => {
    //     columnValues.current[key] = value
    // }, [])

    // const validateForm: () => boolean = useCallback(() => {
    //     for (const field of data.columns.flatMap(column => column.fields)) {
    //         const actualValue = columnValues.current[field.id] || ""
    //         const valid = FormElements[field.type].validate(field, actualValue)
    //         if (!valid) {
    //             columnErrors.current[field.id] = true
    //         }
    //     }
    //     if (Object.keys(columnErrors.current).length > 0) {
    //         return false
    //     }
    //     return true
    // }, [data])

    // const submit = () => {
    //     columnErrors.current = {}
    //     const validForm = validateForm()
    //     if (!validForm) {
    //         toast.error('Verifique os valores em busca de erros')
    //     }
    //     console.log("FORM: ", columnValues.current)
    // }

    // return (
    //     <main className="flex flex-col p-12 gap-y-4 ">
    //         {data.columns.map(column => (
    //             <div key={column.id} className="space-y-4">
    //                 {column.fields.map((field) => {
    //                     const Field = FormElements[field.type].formComponent
    //                     return (
    //                         <Field
    //                             key={field.id}
    //                             elementInstance={field}
    //                             submitValue={submitValue}
    //                             isInvalid={columnErrors.current[field.id]}
    //                         />
    //                     )
    //                 })}
    //             </div>
    //         ))}
    //         <Button onClick={submit}>Submit</Button>
    //     </main>
    // )
}

export { ViewColumn }