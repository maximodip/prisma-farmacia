import { Customer } from '@prisma/client'
import Link from 'next/link'

import { Button, buttonVariants } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createCustomer, updateCustomer } from '@/actions/customers-actions'

export function CustomerForm({ customer }: { customer?: Customer }) {
  const functionAction = customer?.id ? updateCustomer : createCustomer

  return (
    <form action={functionAction}>
      <Link
        className="text-sm underline opacity-70"
        href={customer?.id ? `/customers/${customer.id}` : '/'}
      >
        {customer?.id ? '← Volver a Cliente' : '← Volver a Clientes'}
      </Link>

      <input name="id" type="hidden" value={customer?.id} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>{customer?.id ? 'Editar cliente' : 'Nuevo cliente'}</CardTitle>
          <CardDescription>
            {customer?.id
              ? 'Actualice los datos del cliente.'
              : 'Complete el formulario a continuación para crear un nuevo cliente.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                defaultValue={customer?.name}
                id="name"
                name="name"
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Telefono</Label>
              <Input
                defaultValue={customer?.phone ?? ''}
                id="phone"
                name="phone"
                placeholder="Telefono del cliente"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Direccion</Label>
              <Input
                defaultValue={customer?.address ?? ''}
                id="address"
                name="address"
                placeholder="Direccion del cliente"
              />
              <div />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dni">Documento (DNI)</Label>
                <Input
                  defaultValue={customer?.dni ?? ''}
                  id="dni"
                  name="dni"
                  placeholder="Dni del cliente"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="submit">
            {customer?.id ? 'Actualizar cliente' : 'Crear nuevo cliente'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
