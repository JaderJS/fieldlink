'use client'

import { FormFieldInstance } from "@/components/kanban/builder/types/field.types"
import { Board } from "@/components/kanban/builder/types/board.types"
import { ColumnInstance } from "@/components/kanban/builder/types/column.types"
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react"
import { idGenerator } from "@/components/kanban/utils"

interface FomBuilderProps {
    board: Board
    selectColumn: ColumnInstance | null
    selectColumnFn: (id: string) => void

    boardUpdate: (id: string, title: string, columns: ColumnInstance[]) => void

    addColumn: (index: number, column: ColumnInstance) => void
    updateColumn: (id: string, title: string) => void
    removeColumn: (id?: string) => void

    addField: (index: number, columnId: string, field: FormFieldInstance) => void
    updateField: (id: string, field: FormFieldInstance) => void
    removeField: (FieldId: string, columnId: string) => void

    fieldsFn: (boardId: string, columnId: string) => FormFieldInstance[]
    selectField: FormFieldInstance | null
    selectFieldFn: (id?: string) => void

    setBoard: Dispatch<SetStateAction<Board>>
}

const FormBuilderContext = createContext<FomBuilderProps | null>(null)

const FormBuilderProvider = ({ children }: { children: ReactNode }) => {

    const [board, setBoard] = useState<Board>({ _id: idGenerator(), title: 'Novo kanban / processo', columns: [] })
    const [selectColumn, setSelectColumn] = useState<ColumnInstance | null>(null)
    const [selectField, setSelectField] = useState<FormFieldInstance | null>(null)

    const boardUpdate = (id: string, title: string, columns: ColumnInstance[]) => {
        setBoard({ _id: id, title, columns: columns })
    }

    const addColumn = (index: number, column: ColumnInstance) => {
        setBoard((prev) => {
            const newColumns = [...prev?.columns]
            newColumns.splice(index, 0, column)
            return { ...prev, columns: newColumns }
        })
    }

    const updateColumn = (id: string, title: string) => {
        setBoard((prev) => ({
            ...prev, columns: prev.columns.map((column) => (
                column._id === id ? { _id: column._id, fields: column.fields, title, cards: [] } : column))
        }))
        setSelectColumn((prev) => (!prev ? prev : { ...prev, title }))
    }

    const removeColumn = (id?: string) => {
        const columns = board.columns.filter(column => column._id !== id)
        setBoard((prev) => ({ ...prev, columns }))
    }

    const addField = (index: number, columnId: string, field: FormFieldInstance) => {
        setBoard(prev => ({
            ...prev, columns: prev.columns.map(column => (
                column._id === columnId ? { ...column, fields: [field, ...column.fields] } : column
            ))
        }))
    }

    const updateField = (id: string, field: FormFieldInstance) => {

        const updatedField = field
        setBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((column) => ({
                ...column,
                fields: column.fields.map((field) =>
                    field._id === id ? updatedField : field
                ),
            })),
        }))

    }

    const removeField = (fieldId: string, columnId: string) => {

        console.log(fieldId)

        setBoard((prev) => ({
            ...prev,
            columns: prev.columns.map((column) => ({
                ...column,
                fields: column.fields.filter((field) =>
                    field._id !== fieldId
                ),
            })),
        }))

    }

    const fieldsFn = (boardId: string, columnId: string): FormFieldInstance[] => {
        const column = board.columns.find(column => column._id === columnId)
        if (!column) {
            setSelectField(null)
            setSelectColumn(null)
            return []
        }
        return column.fields
    }

    const selectFieldFn = (id?: string) => {
        if (!id) setSelectField(null)

        let field: FormFieldInstance | null = null

        for (const column of board.columns) {
            const foundField = column.fields.find(f => f._id === id)
            if (foundField) {
                field = foundField
                break
            }
        }
        setSelectField(field)
    }

    const selectColumnFn = (id: string) => {

        const [column] = board.columns.filter(column => column._id === id)

        setSelectColumn(() => (column))
    }

    return (
        <FormBuilderContext.Provider
            value={{
                board,
                setBoard,

                selectColumn,
                selectColumnFn,

                fieldsFn,
                selectField,
                selectFieldFn,

                boardUpdate,
                addColumn,
                updateColumn,
                removeColumn,
                addField,
                updateField,
                removeField
            }}
        >
            {children}
        </FormBuilderContext.Provider>
    )
}

const useFormBuilder = () => {

    const context = useContext(FormBuilderContext)

    if (!context) {
        throw new Error('useFormBuilder must be used withing a DesignerContext')
    }

    return context
}

export { FormBuilderProvider, useFormBuilder }