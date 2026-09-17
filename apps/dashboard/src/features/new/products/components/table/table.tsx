'use client'

import { Fragment, useMemo, useState } from "react";
import { IProduct, ProductTableProps, ProductTableRoot, useProductTableContext } from "../../providers/provider.products";
import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { PriceCell, ProductTableCell, StockStepperCell } from "./cell";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProductThumbnailCell } from "./thumb";

export function ProductTable_({ className, pageSize }: { className?: string; pageSize: number }) {
    const { data, setData } = useProductTableContext()
    const [globalFilter, setGlobalFilter] = useState("")

    const columns = useMemo<ColumnDef<IProduct, any>[]>(
        () => [
            // {
            //     accessorKey: "pictureUrl",
            //     header: () => <span>Thumb</span>,
            //     cell: ({ row }) => (
            //         <ProductThumbnailCell
            //             alt={row.original.name}
            //             src={row.original.pictureUrl}
            //         />
            //     ),
            // },
            {
                accessorKey: "sku",
                header: () => <span>SKU</span>,
                cell: ({ row }) => <ProductTableCell row={row} path={"sku"} />,
                size: 120,
            },
            {
                accessorKey: "name",
                header: () => <span>Nome</span>,
                cell: ({ row }) => <ProductTableCell row={row} path={"name"} />,
            },
            {
                accessorKey: "description",
                header: () => <span>Descrição</span>,
                cell: ({ row }) => <ProductTableCell row={row} path={"description"} />,
            },
            {
                accessorKey: "price",
                header: () => <span>Preço</span>,
                cell: ({ row }) => <PriceCell product={row.original} />,
                size: 100,
            },
            {
                accessorKey: "stock",
                header: () => <span>Estoque</span>,
                cell: ({ row }) => <ProductTableCell row={row} path={"stock"} />,
                size: 100,
            },
            {
                accessorKey: "stock",
                header: "Em estoque",
                cell: ({ row }) => <StockStepperCell row={row} />,
                size: 140,
            },
            {
                accessorKey: "order",
                header: () => <span>Sug. Compra</span>,
                cell: ({ row }) => <ProductTableCell row={row} path={"order.quantity"} />,
                size: 140,
            },
            {
                id: "actions",
                header: () => <span>Ações</span>,
                cell: ({ row }) => (
                    <TableCell>
                        <div className="flex gap-2">
                            <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                    setData((prev) => prev.filter((_, i) => i !== row.index));
                                }}
                            >
                                Remover
                            </Button>
                        </div>
                    </TableCell>
                ),
            },
        ],
        [setData]
    );

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } },
    });

    const HeaderTools = (
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <Input
                    placeholder="Buscar produto..."
                    value={globalFilter}
                    onChange={(e) => {
                        setGlobalFilter(e.target.value);
                        // simples filtro local: filtrar dataset manualmente
                        const q = e.target.value.toLowerCase();
                        if (!q) {
                            // reset if empty
                            // no-op: we keep original data on provider (caller may manage persistent source)
                            return;
                        }
                        // filtro simples: busca em nome, sku e description
                        setData((prev) => prev.filter((p) => (p.name + p.sku + (p.description || "")).toLowerCase().includes(q)));
                    }}
                />
                <Button onClick={() => {
                    // reset filter: in real app you may restore from server/cache; here we'll just do nothing
                    setGlobalFilter("");
                }}>Limpar</Button>
            </div>

            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost">Ferramentas</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                            // exemplo: sugestão de precificação: definir preço venda = sugestão compra * 1.4
                            // setData((prev) => prev.map(p => ({ ...p, salePrice: p.suggestedPurchase ? Number((p.suggestedPurchase * 1.4).toFixed(2)) : p.salePrice })));
                        }}>Aplicar margem padrão (x1.4)</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            // export CSV simples
                            const csv = [Object.keys(data[0] || {}).join(','), ...data.map(d => Object.values(d).join(','))].join('\n');
                            const blob = new Blob([csv], { type: 'text/csv' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = 'produtos.csv';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}>Exportar CSV</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button
                    onClick={() => {
                        // adicionar produto vazio
                        // setData((prev) => [
                        //     ...prev,
                        //     {
                        //         id: `p-${Date.now()}`,
                        //         sku: "",
                        //         name: "",
                        //         description: "",

                        //     },
                        // ]);
                        // navegar para última página
                        table.setPageIndex(Math.max(0, Math.ceil((data.length + 1) / table.getState().pagination.pageSize) - 1));
                    }}
                >
                    <Plus className="mr-2" /> Adicionar
                </Button>
            </div>
        </div>
    );

    // --- Footer (Pagination + view size) ---
    const Footer = (
        <div className="flex items-center justify-between mt-4">
            <div>
                Mostrando {table.getRowModel().rows.length} de {data.length} produtos
            </div>
            <div className="flex items-center gap-2">
                <div className="text-sm">Página {table.getState().pagination.pageIndex + 1} / {Math.max(1, Math.ceil(data.length / table.getState().pagination.pageSize))}</div>
                <Button size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>Anterior</Button>
                <Button size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>Próximo</Button>
            </div>
        </div>
    );

    return (
        <div className={cn("bg-white rounded-lg shadow p-4", className)}>
            {HeaderTools}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((hg) => (
                        <TableRow key={hg.id}>
                            {hg.headers.map((h) => (
                                <TableHead key={h.id} className="text-left">
                                    <div className="flex items-center gap-2">
                                        {h.isPlaceholder ? null : flexRender(h.column.columnDef.header, h.getContext())}
                                        {/* {h.column.getCanSort ? (
                                            <Button
                                                onClick={() => h.column.toggleSorting(h.column.getIsSorted() === "asc")}
                                                className="p-1"
                                                aria-label="Toggle sort"
                                            >
                                                {h.column.getIsSorted() === "asc" ? <ArrowUp className="h-4 w-4" /> : h.column.getIsSorted() === "desc" ? <ArrowDown className="h-4 w-4" /> : <ChevronsUpDown className="h-4 w-4" />}
                                            </Button>
                                        ) : null} */}
                                    </div>
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <Fragment key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</Fragment>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="p-8 text-center" colSpan={columns.length}>Nenhum resultado.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {Footer}
        </div>
    );
}
