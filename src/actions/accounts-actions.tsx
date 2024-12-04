// app/actions/account.ts
'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Account } from '@prisma/client'

import prisma from '@/lib/prisma'
import { ApiResponse } from '@/lib/actions/types'

export async function createAccount(formData: FormData): Promise<void> {
  try {
    // Parse form data
    const customerId = parseInt(formData.get('customerId') as string)
    const state = (formData.get('state') as string) || 'pending'

    // Extract product IDs and quantities
    const productIds = formData.getAll('productId').map((id) => parseInt(id as string))
    const quantities = formData.getAll('quantity').map((qty) => parseInt(qty as string))

    // Validate input
    if (productIds.length === 0 || productIds.length !== quantities.length) {
      throw new Error('Invalid product or quantity data')
    }

    // Prepare items
    const items = productIds.map((productId, index) => ({
      productId,
      quantity: quantities[index],
    }))

    // Perform transaction
    const account = await prisma.$transaction(async (prisma) => {
      // Check if customer exists
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
      })

      if (!customer) {
        throw new Error(`Customer with ID ${customerId} not found`)
      }

      // Fetch products
      const products = await prisma.product.findMany({
        where: { id: { in: productIds } },
      })

      // Validate all products exist
      if (products.length !== productIds.length) {
        throw new Error('Some products were not found')
      }

      // Calculate total
      const total = items.reduce((acc, item) => {
        const product = products.find((p) => p.id === item.productId)

        if (!product) return acc

        return acc + product.price * item.quantity
      }, 0)

      // Create account with items
      return await prisma.account.create({
        data: {
          customerId,
          state,
          total,
          items: {
            create: items.map((item) => {
              const product = products.find((p) => p.id === item.productId)!

              return {
                productId: item.productId,
                quantity: item.quantity,
                priceAtPurchase: product.price,
                subtotal: product.price * item.quantity,
              }
            }),
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      })
    })

    // Revalidate the path for the customer's accounts page
    revalidatePath(`/customers/${customerId}`)
  } catch (error) {
    console.error('Account creation error:', error)
    throw new Error(error instanceof Error ? error.message : 'Unknown error')
  }
}

export async function removeAccount(formData: FormData) {
  'use server'
  const accountId = formData.get('accountId')?.toString()

  if (!accountId) {
    return
  }

  const account = await prisma.account.findUnique({
    where: { id: parseInt(accountId) },
    select: { customerId: true },
  })

  await prisma.account.delete({
    where: { id: parseInt(accountId) },
  })

  revalidatePath(`/accounts/${accountId}`)
  redirect(`/customers/${account?.customerId}/accounts`)
}

export async function getAccountById(id: number): Promise<ApiResponse<Account | null>> {
  const account = await prisma.account.findUnique({ where: { id } })

  return { data: account }
}

export async function updateAccountState(accountId: number, state: string) {
  await prisma.account.update({ where: { id: accountId }, data: { state } })

  revalidatePath(`/accounts/${accountId}`)
}

export async function getAccountWithItems(accountId: number) {
  try {
    const account = await prisma.account.findUnique({
      where: {
        id: accountId,
      },
      include: {
        items: {
          include: {
            product: true, // This will include the full product details for each item
          },
        },
        customer: true, // Optional: include customer details if needed
      },
    })

    if (!account) {
      return {
        success: false,
        error: `No account found with ID ${accountId}`,
      }
    }

    return {
      success: true,
      data: account,
    }
  } catch (error) {
    console.error('Error fetching account:', error)

    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
