'use client'
import React, { useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Product } from '@/lib/actions/types'

export function ProductsDataTable({ products }: { products: Product[] }) {
  // State for products and filter
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null)

  // Get unique distributors (including null)
  const uniqueDistributors = [...new Set(products.map((p) => p.distributor))]

  // Filter products based on selected distributor
  const filteredProducts =
    selectedDistributor === null
      ? products
      : products.filter((product) => product.distributor === selectedDistributor)

  return (
    <div className="w-full">
      {/* Distributor Filter */}
      <div className="mb-4">
        <Select
          value={selectedDistributor ?? 'all'}
          onValueChange={(value) => setSelectedDistributor(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Distributor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Distributors</SelectItem>
            {uniqueDistributors
              .filter((dist) => dist !== null)
              .map((distributor) => (
                <SelectItem key={distributor} value={distributor || ''}>
                  {distributor}
                </SelectItem>
              ))}
            <SelectItem value="null">No Distributor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Distributor</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.distributor ?? 'No Distributor'}</TableCell>
              <div className="flex items-center justify-end gap-x-2">
              <Link
                className="rounded bg-sky-600 p-2 font-semibold text-white transition-colors hover:bg-sky-700"
                href={`/products/${row.original.id}`}
              >
                Editar
              </Link>
              <form action={deleteProduct}>
                <input name="productId" type="hidden" value={row.original.id} />
                <Button className="h-9 font-semibold" type="submit" variant="destructive">
                  Eliminar
                </Button>
              </form>
            </div>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
