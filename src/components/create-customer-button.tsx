'use client'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from './ui/button'

import { createCustomer } from '@/actions/customers-actions'

export function CreateCustomerButton({ customerId }: { customerId: number }) {
  const handleDelete = async () => {
    const formData = new FormData()

    formData.append('id', customerId.toString())

    try {
      const result = await createCustomer(formData)

      console.log('Delete result:', result)

      if (result?.success) {
        toast.success('Cliente creado correctamente')
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } else {
        console.error('Delete failed:', result?.error)
        toast.error(result?.error || 'Error al crear el cliente')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Error al crear el cliente')
    }
  }

  return (
    <Link href="/">
      <Button type="submit" variant="default" onClick={handleDelete}>
        {customerId ? 'Actualizar cliente' : 'Crear nuevo cliente'}
      </Button>
    </Link>
  )
}
