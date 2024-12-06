'use client'
import { toast } from 'sonner'
import Link from 'next/link'

import { Button } from './ui/button'

import { deleteCustomer } from '@/actions/customers-actions'

export function DeleteCustomerButton({ customerId }: { customerId: number }) {
  const handleDelete = async () => {
    const formData = new FormData()

    formData.append('id', customerId.toString())

    try {
      const result = await deleteCustomer(formData)

      console.log('Delete result:', result)

      if (result?.success) {
        toast.success('Cliente eliminado correctamente')
        await new Promise((resolve) => setTimeout(resolve, 1000))
      } else {
        console.error('Delete failed:', result?.error)
        toast.error(result?.error || 'Error al eliminar el cliente')
      }
    } catch (error) {
      console.error('Delete error:', error)
      toast.error('Error al eliminar el cliente')
    }
  }

  return (
    <Link href="/">
      <Button variant="destructive" onClick={handleDelete}>
        Eliminar cliente
      </Button>
    </Link>
  )
}
