import Link from 'next/link'

import { CustomerWithAccounts } from '@/lib/actions/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export function CustomerCard({ customer }: { customer: CustomerWithAccounts }) {
  return (
    <Link className="h-fit overflow-hidden hover:opacity-70" href={`/customers/${customer.id}`}>
      <Card key={customer.id}>
        <CardHeader className="relative pb-2">
          <CardTitle className="line-clamp-1 text-lg font-semibold">{customer.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <span>
            {customer.accounts.length === 0
              ? 'Sin cuentas'
              : `${customer.accounts.length} ${
                  customer.accounts.length === 1 ? 'cuenta' : 'cuentas'
                }`}
          </span>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Creado: {new Date(customer.createdAt).toLocaleDateString('es-ES')}
          </p>
        </CardFooter>
      </Card>
    </Link>
  )
}
