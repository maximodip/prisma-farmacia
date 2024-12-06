import { CreditCard, IdCard, MapPinHouse, Phone, Printer, User } from 'lucide-react'
import Link from 'next/link'

import { formatDate } from '@/lib/helper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { deleteCustomer } from '@/actions/customers-actions'
import { CustomerWithAccounts } from '@/lib/actions/types'
import { DeleteCustomerButton } from '@/components/delete-customer-button'

export function CustomerDetailsCard({ customer }: { customer: CustomerWithAccounts }) {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold opacity-70">Detalles</h1>
        <Link href="/">
          <Button variant="outline">Volver a clientes</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6" />
              </div>
              <div>
                <CardTitle>{customer.name}</CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Contact Information */}
          <section className="flex w-full flex-wrap justify-between">
            <div className="">
              <h3 className="mb-4 text-lg font-semibold">Teléfono</h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{customer.phone}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">DNI</h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <IdCard className="h-4 w-4" />
                <span>{customer.dni}</span>
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Dirección</h3>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPinHouse className="h-4 w-4" />
                <span>{customer.address}</span>
              </div>
            </div>
          </section>
          <Separator />

          {/* Accounts Section */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cuentas</h3>
              <Link href={`/customers/${customer.id}/accounts`}>Ver todas</Link>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {customer.accounts
                ?.sort((a, b) => b.createdDate.getTime() - a.createdDate.getTime())
                .slice(0, 3)
                .map((account) => (
                  <Card key={account.id}>
                    <Link href={`/accounts/${account.id}`}>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">{formatDate(account.createdDate)}</span>
                          </div>
                          <Badge className="uppercase" variant="default">
                            {account.state === 'pending' ? 'pendiente' : 'pagado'}
                          </Badge>
                          {/* <AccountButtonDelete accountId={account.id} /> */}
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <Link className="font-medium" href={`/accounts/${customer.id}/new`}>
                        Nueva cuenta
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap justify-between space-x-4">
            <Button className="font-bold" variant="outline">
              <Link href={`/customers/${customer.id}/edit`}>Editar Cliente</Link>
            </Button>
            <DeleteCustomerButton customerId={customer.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
