'use client'

import React, { useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { SearchInput } from './ui/search-inpu'

import { CustomerWithAccounts } from '@/lib/actions/types'

export function SearchCustomersInput({ customers }: { customers: CustomerWithAccounts[] }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  // Get the current search term from URL params
  const currentSearch = searchParams.get('search') || ''
  const [searchTerm, setSearchTerm] = useState(currentSearch)

  const handleSearch = (term: string) => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams(searchParams)

    // Set or delete the search parameter
    if (term) {
      params.set('search', term)
    } else {
      params.delete('search')
    }

    // Replace the current URL with the new search params
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <SearchInput
      className="mt-4 w-full"
      placeholder="Buscar clientes por nombre..."
      value={searchTerm}
      onChange={(e) => {
        const value = e.target.value

        setSearchTerm(value)
        handleSearch(value)
      }}
    />
  )
}
