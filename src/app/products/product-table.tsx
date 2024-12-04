'use client'

import { useState } from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { Pencil, Trash } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/actions/types'

// Define columns outside the component
const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => <span className="font-semibold">{row.getValue('name')}</span>,
  },
  {
    accessorKey: 'distributor',
    header: 'Laboratorio',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => `$${row.getValue('price')}`,
  },
  {
    id: 'actions',
    header: () => <div className="text-right">Acciones</div>,
    cell: ({ row }) => (
      <div className="flex justify-end gap-x-2">
        <Link
          className="rounded bg-sky-600 p-2 transition-colors hover:bg-sky-700"
          href={`/productos/${row.original.id}`}
        >
          <Pencil className="h-4 w-4" color="white" />
        </Link>
        <Button className="h-8 w-8" size="icon" variant="destructive">
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
]

export function ProductsDataTable({ products }: { products: Product[] }) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [distributorFilter, setDistributorFilter] = useState<string>('')

  // Get unique distributors for filter
  const distributors = Array.from(new Set(products.map((p) => p.distributor ?? ''))).filter(Boolean)

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
  })

  // Handle text input filter
  const handleDistributorFilterChange = (value: string) => {
    setDistributorFilter(value)
    table.getColumn('distributor')?.setFilterValue(value)
  }

  // Handle quick filter button
  const handleQuickFilter = (distributor: string) => {
    setDistributorFilter(distributor)
    table.getColumn('distributor')?.setFilterValue(distributor)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4">
        <Input
          className="max-w-sm"
          placeholder="Filtrar por laboratorio..."
          value={distributorFilter}
          onChange={(event) => handleDistributorFilterChange(event.target.value)}
        />

        {/* Distributor quick filter buttons */}
        <div className="ml-4 flex gap-2">
          {distributors.map((distributor) => (
            <Button
              key={distributor}
              variant={distributorFilter === distributor ? 'default' : 'outline'}
              onClick={() => handleQuickFilter(distributor)}
            >
              {distributor}
            </Button>
          ))}
          <Button
            variant={distributorFilter === '' ? 'default' : 'outline'}
            onClick={() => handleQuickFilter('')}
          >
            Todos
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell className="h-24 text-center" colSpan={columns.length}>
                  No hay productos.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
