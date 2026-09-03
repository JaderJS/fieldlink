import { createColumnHelper } from "@tanstack/react-table"
import { CellActions, CellCategories, CellImage, CellIndex, CellMoney, CellOrder, } from "../components/cell"

const columnHelper = createColumnHelper<ProductWithOptionalOrder>()

export const columns = [
    columnHelper.accessor('id', {
        header: '#',
        cell: CellIndex,
        enableGrouping: false,
    }),
    columnHelper.accessor('pictureUrl', {
        header: "Imagem",
        cell: CellImage,
        enableGrouping: false,
    }),
    columnHelper.accessor('name', {
        header: 'Nome',
        enableGrouping: false
    }),
    columnHelper.accessor('stock', {
        header: 'Em estoque',
        cell: CellOrder,
        enableGrouping: false,
    }),
    columnHelper.accessor('price', {
        header: 'Valor',
        cell: CellMoney,
        enableGrouping: false
    }),
    columnHelper.accessor('categories.name', {
        header: 'Categoria',
        cell: CellCategories
    }),
    columnHelper.display({
        header: 'Ações',
        cell: CellActions
    })
]