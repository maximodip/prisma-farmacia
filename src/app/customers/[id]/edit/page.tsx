import {redirect} from "next/navigation";

import {CustomerForm} from "@/app/new/customer-form";
import prisma from "@/lib/prisma";

export default async function CustomerPageEdit({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const customer = await prisma.customer.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!customer) {
    redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <CustomerForm customer={customer} />
    </div>
  );
}
