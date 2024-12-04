// lib/actions/types.ts
import { Prisma } from '@prisma/client'

export type Customer = {
  id: number
  name: string
  phone: string
  address: string
  dni: string
  createdAt: Date
  accounts?: Account[]
}

export type Account = {
  id: number
  createdDate: Date
  total: number
  state: string
  customerId: number
  customer: Customer
  products?: Product[]
}

export type Product = {
  id: number
  name: string
  price: number
  distributor: string | null
}

export type CustomerWithAccounts = {
  id: number
  name: string
  phone: string | null
  address: string | null
  dni: string
  createdAt: Date
  accounts: {
    id: number
    createdDate: Date
    total: number
    state: string
    customerId: number
  }[]
}

// Modify the ActionResponse type to be more specific
export type ApiResponse<T> =
  | {
      data: T
      error?: never
    }
  | {
      data?: never
      error: string
    }
