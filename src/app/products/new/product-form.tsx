import {Product} from "@prisma/client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {createProduct} from "@/actions/products-actions";

export function ProductForm({product}: {product?: Product}) {
  return (
    <form action={createProduct}>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Agregar Nuevo Producto</CardTitle>
          <CardDescription>Ingrese los detalles del nuevo producto</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium" htmlFor="name">
              Nombre del producto
            </Label>
            <Input
              required
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
              id="laboratory"
              name="distributor"
              placeholder="Ingrese el nombre del laboratorio"
              type="text"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Agregar Producto
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
