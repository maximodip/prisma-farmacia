import { ArrowLeft, Printer } from 'lucide-react'
import Link from 'next/link'

import { UpdateAccountStateButton } from './updatestate-account-button'

import { getAccountWithItems, removeAccount } from '@/actions/accounts-actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AccountPrint } from '@/components/print-account'

export default async function AccountPage({ params }: { params: { id: string } }) {
  const { data: account, error } = await getAccountWithItems(parseInt(params.id))

  if (error) return <div>Error: {error}</div>
  if (!account) return <div>Account not found</div>

  return (
    <Card className="mx-auto w-full max-w-md">
      <div className="flex items-center justify-between p-4">
        <Link
          className="flex items-center gap-2 underline opacity-50 hover:opacity-100"
          href={`/customers/${account.customerId}/accounts`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Cuentas de {account.customer.name}</span>
        </Link>
        <div>
          <AccountPrint accountId={account.id} />
        </div>
      </div>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="font-semibold">Cliente:</span>
          <span>{account.customer.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Estado:</span>
          <span className="uppercase">{account.state === 'paid' ? 'pagado' : 'pendiente'}</span>
        </div>
        <Separator />
        <div className="space-y-2">
          {account.items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.product.name} (x{item.quantity})
              </span>
              <span>${item.priceAtPurchase}</span>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex justify-between font-bold">
          <span>Subtotal:</span>
          <span>
            ${account.items.reduce((acc, item) => acc + item.priceAtPurchase * item.quantity, 0)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <UpdateAccountStateButton accountId={account.id} accountState={account.state} />
        <form action={removeAccount}>
          <input name="accountId" type="hidden" value={account.id} />
          <Button type="submit" variant="destructive">
            Eliminar
          </Button>
        </form>
        {/* <div className="text-sm text-muted-foreground">
          <span>Creado el: {account.createdAt.toLocaleDateString('es-ES')}</span>
        </div> */}
      </CardFooter>
    </Card>
  )
}
