import Link from 'next/link'
import { Plus } from 'lucide-react'

import { CustomerCard } from '@/components/customer-card'
import { getCustomers } from '@/actions/customers-actions'
import { Input } from '@/components/ui/input'

export default async function HomePage() {
  const response = await getCustomers()

  if ('error' in response) {
    return <div>Error: {response.error}</div>
  }

  const customers = response.data

  console.log(customers)

  return (
    <>
      <Input placeholder="Buscar cliente" type="search" />
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {customers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
        <Link
          className="flex h-[150px] items-center justify-center gap-x-2 rounded-lg border p-4 opacity-75 hover:contrast-75"
          href="/new"
        >
          <Plus size={24} />
          <span>Nuevo cliente</span>
        </Link>
      </div>
    </>
  )
}
