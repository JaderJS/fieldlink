import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Board } from '@/components/kanban/builder/types/board.types'
import { DEFAULT, FORM } from "./values"
import { FieldsType, FormFieldInstance } from "../builder/types/field.types"
import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"

type Row = { [key: string]: string }

const ViewDataInTableKanban = () => {

    const board: Board = JSON.parse(FORM)
    const fields = board.columns.flatMap(column => column.fields) as FormFieldInstance[]
    const values = JSON.parse(DEFAULT)
    console.log(values)

    const columns: {
        id: string
        label: string
        required: boolean
        type: FieldsType
    }[] = []

    const rows: Row[] = []

    fields.forEach(field => {
        switch (field.type) {
            case 'TextField':
                columns.push({
                    id: field._id,
                    label: field.extraAttributes?.label,
                    required: field.extraAttributes?.required,
                    type: field.type
                })
                break;
            case 'DateField':
                columns.push({
                    id: field._id,
                    label: field.extraAttributes?.label,
                    required: field.extraAttributes?.required,
                    type: field.type
                })
                break;
            default:
                break;
        }
    })

    values.forEach((value: any) => {
        rows.push({ ...value })
    })

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>{columns.map((column) => (
                        <TableHead key={column.id} className="uppercase">{column.label}</TableHead>
                    ))}</TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {columns.map((column) => (
                                <RowCell
                                    key={column.id}
                                    type={column.type}
                                    value={row[column.id]}
                                />
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

const RowCell = ({ type, value }: { type: FieldsType, value: string }) => {

    let node: ReactNode = value

    switch (type) {
        case 'TextField':
            if (!value) break

            break
        case 'DateField':
            if (!value) break
            const date = new Date(value)
            node = <Badge variant={"outline"}>{format(date, "dd/MM/yyyy")}</Badge>
            break
    }
    return (
        <TableCell>{node}</TableCell>
    )
}

export { ViewDataInTableKanban }