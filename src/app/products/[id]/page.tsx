import { redirect } from 'next/navigation'

import { ProductForm } from '@/app/products/new/product-form'
import prisma from '@/lib/prisma'

export default async function ProductEditPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findFirst({
    where: { id: parseInt(params.id) },
  })

  if (!product) {
    redirect('/products')
  }

  return (
    <div>
      <ProductForm product={product} />
    </div>
  )
}
