import {Customer} from "@prisma/client";
import Link from "next/link";

import {Button, buttonVariants} from "@/components/ui/button";
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
import {createCustomer, updateCustomer} from "@/actions/customers-actions";

export function CustomerForm({customer}: {customer?: Customer}) {
  const functionAction = customer?.id ? updateCustomer : createCustomer;

  return (
    <form action={functionAction}>
      <Link className="text-sm underline opacity-70" href="/">
        ← Volver a Clientes
      </Link>

      <input name="id" type="hidden" value={customer?.id} />
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Customer</CardTitle>
          <CardDescription>Fill out the form below to create a new customer.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                defaultValue={customer?.name}
                id="name"
                name="name"
                placeholder="Name of your customer"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="phone">Phone</Label>
              <Input
                defaultValue={customer?.phone}
                id="phone"
                name="phone"
                placeholder="Phone number of your customer"
                type="number"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                defaultValue={customer?.address}
                id="address"
                name="address"
                placeholder="Address of your customer"
              />
              <div />
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="dni">DNi</Label>
                <Input
                  defaultValue={customer?.dni}
                  id="dni"
                  name="dni"
                  placeholder="Dni of your customer"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link className={buttonVariants({variant: "secondary"})} href="/">
            Cancel
          </Link>
          <Button type="submit">{customer?.id ? "Update Customer" : "Create Customer"}</Button>
        </CardFooter>
      </Card>
    </form>
  );
}
