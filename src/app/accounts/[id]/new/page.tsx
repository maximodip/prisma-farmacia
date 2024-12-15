import { AccountForm } from './account-form'

import prisma from '@/lib/prisma'
import { getProducts } from '@/actions/products-actions'

export default async function CustomerDetailsPage({ params }: { params: { id: string } }) {
  const customerId = parseInt(params.id, 10)

  // Fetch customer and products
  const customer = await prisma.customer.findUnique({
    where: { id: customerId },
  })

  const products = await getProducts()

  if (!customer) {
    return <div>Customer not found</div>
  }

  // Serialize Decimal to plain objects
  const serializedProducts = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price.toString(), // Convert number to string
  }))

  return (
    <div>
      <AccountForm
        customerId={customer.id}
        customerName={customer.name}
        products={serializedProducts}
      />
    </div>
  )
}
