'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { CustomerWithAccounts, ApiResponse } from '@/lib/actions/types'
import prisma from '@/lib/prisma'

// Get all customers with their accounts
export async function getCustomers(): Promise<ApiResponse<CustomerWithAccounts[]>> {
  try {
    const customers = await prisma.customer.findMany({
      include: {
        accounts: true,
      },
    })

    // Parse customers and their accounts to match the `CustomerWithAccounts` type
    const parsedCustomers: CustomerWithAccounts[] = customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      dni: customer.dni?.toString() || '',
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
      accounts: customer.accounts.map((account) => ({
        id: account.id,
        createdDate: account.createdAt,
        total: account.total,
        state: account.state,
        customerId: account.customerId,
      })),
    }))

    return { data: parsedCustomers }
  } catch (error) {
    console.error('Error loading customers:', error)

    return { error: 'Error loading customers' }
  }
}

// Create a new customer
export async function createCustomer(formData: FormData) {
  const name = formData.get('name')?.toString()
  const phone = formData.get('phone')?.toString()
  const address = formData.get('address')?.toString()
  const dni = formData.get('dni') ? Number(formData.get('dni')) : undefined

  // Validate required fields
  if (!name || !phone || !address || typeof dni !== 'number') {
    throw new Error('Missing required fields')
  }

  await prisma.customer.create({
    data: {
      name,
      phone,
      address,
      dni: dni.toString(),
    },
  })

  revalidatePath('/') // Revalidate the cache for the customers list
  redirect('/')
}

// Update an existing customer
export async function updateCustomer(formData: FormData) {
  const id = formData.get('id')?.toString()
  const name = formData.get('name')?.toString()
  const phone = formData.get('phone')?.toString()
  const address = formData.get('address')?.toString()
  const dni = formData.get('dni') ? Number(formData.get('dni')) : undefined

  // Validate required fields
  if (!id || !name || !phone || !address || typeof dni !== 'number') {
    throw new Error('Missing required fields')
  }

  await prisma.customer.update({
    where: {
      id: parseInt(id, 10),
    },
    data: {
      name,
      phone,
      address,
      dni: dni.toString(),
    },
  })

  revalidatePath(`/customers/${id}`) // Revalidate the cache for this customer
  redirect('/')
}

// Get a single customer by ID
export async function getCustomerById(
  id: number,
): Promise<ApiResponse<CustomerWithAccounts | null>> {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: {
        accounts: {
          select: {
            id: true,
            createdAt: true,
            total: true,
            state: true,
            customerId: true,
          },
        },
      },
    })

    if (!customer) {
      return { data: null }
    }

    // Parse the customer to match the `CustomerWithAccounts` type
    const parsedCustomer: CustomerWithAccounts = {
      id: customer.id,
      name: customer.name,
      phone: customer.phone,
      address: customer.address,
      dni: customer.dni?.toString() || '',
      createdAt: customer.createdAt,
      accounts: customer.accounts.map((account) => ({
        id: account.id,
        createdDate: account.createdAt,
        total: account.total,
        state: account.state,
        customerId: account.customerId,
      })),
    }

    return { data: parsedCustomer }
  } catch (error) {
    console.error('Error loading customer:', error)

    return { error: 'Error loading customer' }
  }
}

// Delete a customer by ID
export async function deleteCustomer(id: number) {
  try {
    await prisma.customer.delete({
      where: { id },
    })

    revalidatePath('/') // Revalidate the cache for the customers list
    redirect('/')
  } catch (error) {
    console.error('Error deleting customer:', error)
    throw new Error('Error deleting customer')
  }
}
