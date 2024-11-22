"use server";

import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

import {CustomerWithAccounts, ApiResponse} from "@/lib/actions/types";
import prisma from "@/lib/prisma";

export async function getCustomers(): Promise<ApiResponse<CustomerWithAccounts[]>> {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        accounts: true,
      },
    });

    const parsedCustomers: CustomerWithAccounts[] = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      dni: customer.dni.toString(),
      createdAt: customer.createdAt,
      accounts: customer.accounts.map((account) => ({
        id: account.id,
        createdDate: account.createdAt,
        total: account.total.toNumber(),
        state: account.state,
        customerId: account.customerId,
      })),
    }));

    return {data: parsedCustomers};
  } catch (error) {
    return {error: "Error loading customers"};
  }
}

export async function createCustomer(formData: FormData) {
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  const address = formData.get("address")?.toString();
  const dni = Number(formData.get("dni"));

  if (!name || !phone || !address || !dni) {
    return;
  }

  await prisma.customer.create({
    data: {
      name: name,
      phone: phone,
      address: address,
      dni: dni.toString(),
    },
  });

  redirect("/");
}

export async function updateCustomer(formData: FormData) {
  const id = formData.get("id")?.toString();
  const name = formData.get("name")?.toString();
  const phone = formData.get("phone")?.toString();
  const address = formData.get("address")?.toString();
  const dni = Number(formData.get("dni"));

  if (!id || !name || !phone || !address || !dni) {
    return;
  }

  await prisma.customer.update({
    where: {
      id: parseInt(id),
    },
    data: {
      name: name,
      phone: phone,
      address: address,
      dni: dni.toString(),
    },
  });

  redirect("/");
}

export async function getCustomerById(id: number) {
  try {
    const customer = await prisma.customer.findUnique({
      where: {id},
      include: {
        accounts: {
          // include: {
          //   products: true,
          // },
        },
      },
    });

    return {data: customer};
  } catch (error) {
    return {error: "Error loading customer"};
  }
}

export async function deleteCustomer(id: number) {
  await prisma.customer.delete({
    where: {id},
  });

  redirect("/");
}
