import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { getCustomerById } from '@/actions/customers-actions'
import { formatDateTime } from '@/lib/helper'

export default async function AccountsPage({ params }: { params: { id: string } }) {
  const { data: customer, error } = await getCustomerById(parseInt(params.id))

  if (error) return <div>Error: {error}</div>
  if (!customer) return <div>Customer not found</div>

  return (
    <>
      <div className="p-4">
        <h2 className="mb-4 text-2xl font-medium">Cuentas de {customer.name}</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {customer.accounts?.length ? (
            customer.accounts
              ?.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
              .map((account) => (
                <Link
                  key={account.id}
                  className="rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md"
                  href={`/accounts/${account.id}`}
                >
                  <h1 className="text-lg font-bold uppercase">
                    {account.state === 'paid' ? 'Pagado' : 'Pendiente'}
                  </h1>
                  <h2 className="">Total: ${account.total}</h2>
                  <h3 className="">Fecha: {formatDateTime(account.createdDate)}</h3>
                </Link>
              ))
          ) : (
            <div className="text-gray-500">Sin cuentas</div>
          )}
        </div>
      </div>
      <Link className="flex items-center gap-2 p-2 underline opacity-50 hover:opacity-100" href="/">
        <ArrowLeft className="h-4 w-4" />
        <span>Volver a Clientes</span>
      </Link>
    </>
  )
}
