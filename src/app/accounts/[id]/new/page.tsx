import {PrismaClient} from "@prisma/client";

import {AccountForm} from "./account-form";

const prisma = new PrismaClient();

export default async function CustomerDetailsPage({params}: {params: {id: string}}) {
  const customerId = parseInt(params.id, 10);

  // Fetch customer and products
  const customer = await prisma.customer.findUnique({
    where: {id: customerId},
  });

  const products = await prisma.product.findMany();

  if (!customer) {
    return <div>Customer not found</div>;
  }

  // Serialize Decimal to plain objects
  const serializedProducts = products.map((product) => ({
    ...product,
    price: product.price.toString(), // Convert Decimal to string
  }));

  return (
    <div>
      <h1>{customer.name} Details</h1>
      {/* Pass serialized products to the client component */}
      <AccountForm customer={customer} products={serializedProducts} />
    </div>
  );
}
