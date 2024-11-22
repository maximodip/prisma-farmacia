import {CreditCard, IdCard, MapPinHouse, Phone, User} from "lucide-react";
import Link from "next/link";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {CustomerWithAccounts} from "@/lib/actions/types";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {deleteCustomer} from "@/actions/customers-actions";

export function CustomerDetailsCard({customer}: {customer: CustomerWithAccounts}) {
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
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6" />
            </div>
            <div>
              <CardTitle>{customer.name}</CardTitle>
              <CardDescription>ID: {customer.id}</CardDescription>
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
            <h3 className="mb-4 text-lg font-semibold">Cuentas</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {customer.accounts?.map((account) => (
                <Card key={account.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          {account.createdDate
                            ? new Date(account.createdDate).toLocaleDateString()
                            : "Fecha no válida"}
                        </span>
                      </div>
                      <Badge className="uppercase" variant="default">
                        {account.state}
                      </Badge>
                    </div>
                  </CardContent>
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
          <div className="flex justify-between space-x-4">
            <Button className="font-bold" variant="outline">
              <Link href={`/customers/${customer.id}/edit`}>Editar Cliente</Link>
            </Button>
            <Button
              className="font-bold"
              variant="destructive"
              // onClick={() => {
              // deleteCustomer(customer.id);
              // toast({
              //   title: "Cliente eliminado",
              //   description: `El cliente ${customer.name} ha sido eliminado`,
              // });
              // }}
            >
              Borrar Cliente
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
