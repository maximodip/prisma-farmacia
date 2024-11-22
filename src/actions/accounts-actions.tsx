// app/actions/account.ts
"use server";
import {Decimal} from "@prisma/client/runtime/library";
import {revalidatePath} from "next/cache";

import prisma from "@/lib/prisma";

export async function createAccount(formData: FormData) {
  const customerId = parseInt(formData.get("customerId") as string);
  const state = formData.get("state") as string;

  // Get all product IDs and quantities
  const productIds = formData.getAll("productId").map((id) => parseInt(id as string));
  const quantities = formData.getAll("quantity").map((qty) => parseInt(qty as string));

  const items = productIds
    .map((productId, index) => ({
      productId,
      quantity: quantities[index],
    }))
    .filter((item) => !isNaN(item.productId) && !isNaN(item.quantity));

  return await prisma.$transaction(async (prisma) => {
    const customer = await prisma.customer.findUnique({where: {id: customerId}});

    if (!customer) {
      throw new Error(`Customer with ID ${customerId} not found`);
    }

    const products = await prisma.product.findMany({
      where: {id: {in: productIds}},
    });

    const total = items.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) return acc;

      return acc.add(new Decimal(product.price).mul(item.quantity));
    }, new Decimal(0));

    const account = await prisma.account.create({
      data: {
        total,
        state,
        customerId,
        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!;

            return {
              productId: item.productId,
              quantity: item.quantity,
              priceAtPurchase: product.price,
              subtotal: new Decimal(product.price).mul(item.quantity),
            };
          }),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Serialize the Decimal fields
    const serializedAccount = {
      ...account,
      total: account.total.toString(),
      items: account.items.map((item) => ({
        ...item,
        priceAtPurchase: item.priceAtPurchase.toString(),
        subtotal: item.subtotal.toString(),
      })),
    };

    return {success: true, data: serializedAccount};
  });
}
