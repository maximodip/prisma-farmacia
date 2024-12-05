import Link from 'next/link'

import { ProductsDataTable } from './product-table'

import { getProducts } from '@/actions/products-actions'
import { Button } from '@/components/ui/button'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-x-12 max-md:flex-wrap">
        <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
        <Button asChild className="h-9" variant="outline">
          <Link href="/products/new">Nuevo producto</Link>
        </Button>
      </div>
      <ProductsDataTable products={products} />
    </>
  )
}
