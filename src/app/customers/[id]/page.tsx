// app/customers/[id]/edit/page.tsx
import { CustomerDetailsCard } from './customer-details-card'

import { getCustomerById } from '@/actions/customers-actions'

export default async function CustomerEditPage({ params }: { params: { id: string } }) {
  const { data: customer, error } = await getCustomerById(parseInt(params.id))

  if (error) return <div>Error: {error}</div>
  if (!customer) return <div>Customer not found</div>

  return (
    <div>
      <CustomerDetailsCard customer={customer} />
    </div>
  )
}
