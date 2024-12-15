import Link from 'next/link'
import { Plus } from 'lucide-react'

import { CustomerCard } from '@/components/customer-card'
import { getCustomers } from '@/actions/customers-actions'
import { SearchCustomersInput } from '@/components/search-customers-input'

export default async function HomePage({ searchParams }: { searchParams: { search?: string } }) {
  const response = await getCustomers()

  if ('error' in response) {
    return <div>Error: {response.error}</div>
  }

  const customers = response.data

  const filteredCustomers = searchParams.search
    ? customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchParams.search!.toLowerCase()),
      )
    : customers

  return (
    <>
      <div className="mb-4">
        <h1 className="text-3xl font-bold opacity-70">Clientes</h1>
        <SearchCustomersInput customers={filteredCustomers} />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-4">
        <Link
          className="flex h-[150px] items-center justify-center gap-x-2 rounded-lg border p-4 opacity-75 hover:contrast-75"
          href="/new"
        >
          <Plus size={24} />
          <span>Nuevo cliente</span>
        </Link>
        {filteredCustomers.map((customer) => (
          <CustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </>
  )
}
