import {
    Column,
    Table,
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    RowData,
} from '@tanstack/react-table'

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData?: (rowIndex: number, columnId: string, value: unknown) => void
        addRow?: () => void
        deselectRow?: (rowIndex: number) => void
        addRowWithGrouping?: (group: { [key: string]: unknown }) => void
    }
    interface ColumnMeta {
        enableDuplicateInGrouping?: boolean
    }
}

