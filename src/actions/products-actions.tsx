"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import prisma from "@/lib/prisma";

export async function getProducts() {
  const products = await prisma.product.findMany();

  return {data: products};
}

export async function createProduct(formData: FormData) {
  const name = formData.get("name")?.toString();
  const distributor = formData.get("distributor")?.toString();
  const price = Number(formData.get("price"));

  if (!name || !distributor || !price) {
    return;
  }

  await prisma.product.create({
    data: {
      name: name,
      distributor: distributor,
      price: price,
    },
  });

  redirect("/products");
}

export async function updateProduct(formData: FormData) {
  try {
    const id = formData.get("id")?.toString();
    const name = formData.get("name")?.toString();
    const price = formData.get("price")?.toString();
    const distributor = formData.get("distributor")?.toString();

    // Validation
    if (!id || !name || !price || !distributor) {
      return {error: "Missing required fields"};
    }

    // Convert price to number and validate
    const priceNumber = Number(price);

    if (isNaN(priceNumber)) {
      return {error: "Price must be a valid number"};
    }

    const product = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name: name.toString(),
        price: priceNumber,
        distributor: distributor.toString(),
      },
    });

    return {data: product};
  } catch (error) {
    return {error: "Error updating product"};
  }
}
