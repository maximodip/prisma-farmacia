'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/dist/server/web/spec-extension/revalidate'

import prisma from '@/lib/prisma'

export async function getProducts() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      distributor: true,
    },
  })

  return products.map((product) => ({
    ...product,
    price: product.price, // Convert Decimal to number
  }))
}

export async function createProduct(formData: FormData): Promise<void> {
  const name = formData.get('name')?.toString()
  const distributor = formData.get('distributor')?.toString()
  const price = Number(formData.get('price'))

  if (!name || !distributor || !price) {
    throw new Error('Missing required fields')
  }

  await prisma.product.create({
    data: { name, distributor, price },
  })

  redirect('/products')
}

export async function updateProduct(formData: FormData) {
  const id = formData.get('id')?.toString()
  const name = formData.get('name')?.toString()
  const price = formData.get('price')?.toString()
  const distributor = formData.get('distributor')?.toString()

  if (!id || !name || !price || !distributor) {
    throw new Error('Missing required fields')
  }

  await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name,
      price: Number(price),
      distributor,
    },
  })

  revalidatePath(`/products/${id}`)
  redirect('/products')
}

export async function deleteProduct(formData: FormData) {
  'use server'
  const productId = parseInt(formData.get('productId')?.toString() || '0')

  if (!productId) return

  await prisma.product.delete({
    where: { id: productId },
  })

  redirect('/products')
}
