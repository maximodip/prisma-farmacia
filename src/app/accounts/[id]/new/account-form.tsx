'use client'

import { useState } from 'react'

import { ProductSelect } from './products-select'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { createAccount } from '@/actions/accounts-actions'
import { toast } from '@/hooks/use-toast'

export function AccountForm({
  customerId,
  products,
}: {
  customerId: number
  products: { id: number; name: string; price: string }[]
}) {
  const [items, setItems] = useState([{ productId: '', quantity: 1 }])

  // Update item fields
  const handleItemChange = (index: number, field: string, value: string | number) => {
    const updatedItems = [...items]

    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setItems(updatedItems)
  }

  // Add new item row
  const addItem = () => {
    setItems([...items, { productId: '', quantity: 1 }])
  }

  // Remove item row
  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index)

    setItems(updatedItems)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Crear cuenta</CardTitle>
      </CardHeader>
      <form action={createAccount}>
        <input name="customerId" type="hidden" value={customerId} />
        <CardContent>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                {/* Product Select */}
                <div>
                  <Label htmlFor="productId">Producto</Label>
                  <input name="productId" type="hidden" value={item.productId} />
                  <ProductSelect
                    index={index}
                    products={products}
                    value={item.productId}
                    onChange={handleItemChange}
                  />
                </div>

                {/* Quantity Input */}
                <div>
                  <Label htmlFor="quantity">Cantidad</Label>
                  <input name="quantity" type="hidden" value={item.quantity} />
                  <Input
                    required
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                  />
                </div>

                {/* Remove Item Button */}
                <div className="flex items-end">
                  <Button
                    className="bg-red-500 text-white hover:bg-red-600"
                    type="button"
                    onClick={() => removeItem(index)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}

            {/* Add Item Button */}
            <Button className="mt-2" type="button" onClick={addItem}>
              Agregar Item
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit">Agregar cuenta</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
