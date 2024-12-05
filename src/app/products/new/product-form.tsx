import { Product } from '@prisma/client'

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
import { Button } from '@/components/ui/button'
import { createProduct, updateProduct } from '@/actions/products-actions'

export function ProductForm({ product }: { product?: Product }) {
  const functionAction = product?.id ? updateProduct : createProduct

  return (
    <form action={functionAction}>
      <input name="id" type="hidden" value={product?.id} />
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>{product?.id ? 'Editar producto' : 'Agregar Nuevo Producto'}</CardTitle>
          <CardDescription>
            {product?.id
              ? 'Actualice los datos del producto.'
              : 'Complete el formulario a continuación para crear un nuevo producto.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="name">
              Nombre del producto
            </Label>
            <Input
              required
              defaultValue={product?.name}
              id="name"
              name="name"
              placeholder="Ingrese el nombre del producto"
              type="text"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="price">
              Precio
            </Label>
            <Input
              required
              defaultValue={product?.price}
              id="price"
              name="price"
              placeholder="Ingrese el precio del producto"
              type="number"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="laboratory">
              Laboratorio
            </Label>
            <Input
              required
              defaultValue={product?.distributor}
              id="laboratory"
              name="distributor"
              placeholder="Ingrese el nombre del laboratorio"
              type="text"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            {product?.id ? 'Actualizar' : 'Agregar'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
