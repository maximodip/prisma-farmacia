import Link from 'next/link'

import { ProductsDataTable } from './product-table'

import { getProducts } from '@/actions/products-actions'

export default async function HomePage() {
  const products = await getProducts()

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-x-12 max-md:flex-wrap">
        <h2 className="text-2xl font-bold tracking-tight">Productos</h2>
        <Link className="text-sm underline opacity-70" href="/products/new">
          Agregar producto
        </Link>
      </div>
      <ProductsDataTable products={products} />
    </>
  )
}
