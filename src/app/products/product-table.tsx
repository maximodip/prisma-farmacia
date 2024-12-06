'use client'
import { useState } from 'react'
import Link from 'next/link'

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
import { Button } from '@/components/ui/button'
import { deleteProduct } from '@/actions/products-actions'
import { Input } from '@/components/ui/input'

export function ProductsDataTable({ products }: { products: Product[] }) {
  // State for products and filter
  const [selectedDistributor, setSelectedDistributor] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  // Get unique distributors (including null)
  const uniqueDistributors = [...new Set(products.map((p) => p.distributor))]

  // Filter products based on selected distributor
  const filteredProducts = products.filter((product) => {
    // Distributor filter
    const matchesDistributor =
      selectedDistributor === null ||
      (selectedDistributor === 'null' && product.distributor === null) ||
      product.distributor === selectedDistributor

    // Name search filter (case-insensitive)
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesDistributor && matchesSearch
  })

  return (
    <div className="w-full">
      {/* Distributor Filter */}
      <div className="mb-4 flex items-center gap-x-2">
        <div className="flex items-center gap-x-2">
          <h3 className="text-sm font-medium">Distribuidor</h3>
          <Select
            value={selectedDistributor ?? 'all'}
            onValueChange={(value) => setSelectedDistributor(value === 'all' ? null : value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Distributor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {uniqueDistributors
                .filter((dist) => dist !== null)
                .map((distributor) => (
                  <SelectItem key={distributor} value={distributor || ''}>
                    {distributor}
                  </SelectItem>
                ))}
              <SelectItem value="null">Sin Distribuidor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          className="w-full"
          placeholder="Buscar productos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Product Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Distribuidor</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-extralight">{product.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.distributor ?? 'No Distributor'}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-x-2">
                    <Link
                      className="rounded bg-sky-600 p-2 font-semibold text-white transition-colors hover:bg-sky-700"
                      href={`/products/${product.id}`}
                    >
                      Editar
                    </Link>
                    <form action={deleteProduct}>
                      <input name="productId" type="hidden" value={product.id} />
                      <Button className="h-9 font-semibold" type="submit" variant="destructive">
                        Eliminar
                      </Button>
                    </form>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
