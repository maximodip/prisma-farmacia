'use client'
import clsx from 'clsx'
import { Home, Users, Package, Menu, X, LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavLinkProps {
  href: string
  icon: LucideIcon
  children: React.ReactNode
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // eslint-disable-next-line react/no-unstable-nested-components
  function NavLink({ href, icon: Icon, children }: NavLinkProps) {
    return (
      <Link
        className={clsx(
          'flex items-center space-x-2 rounded-md px-3 py-2 transition-colors',
          pathname === href ? 'text-emerald-600' : 'text-gray-600 hover:text-emerald-600',
        )}
        href={href}
      >
        <Icon size={18} />
        <span>{children}</span>
      </Link>
    )
  }

  return (
    <header className="border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link
              className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700"
              href="/"
            >
              <Image alt="logo de farmacia sisa" height={50} src="/logo.jpg" width={50} />
              <span className="text-2xl font-semibold">Farmacia Sisa</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="flex items-center space-x-1 max-sm:hidden">
            <NavLink href="/" icon={Users}>
              Clientes
            </NavLink>
            {/* <NavLink href="/" icon={Home}>
              Inicio
            </NavLink> */}
            <NavLink href="/products" icon={Package}>
              Productos
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              className="p-2 text-gray-600 hover:text-emerald-600"
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="py-4 md:hidden">
            <div className="flex flex-col space-y-4">
              <a
                className="flex items-center space-x-2 px-2 py-1 text-gray-600 hover:text-emerald-600"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <Users size={18} />
                <span>Clientes</span>
              </a>
              {/* <a
                className="flex items-center space-x-2 px-2 py-1 text-gray-600 hover:text-emerald-600"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home size={18} />
                <span>Inicio</span>
              </a> */}

              <a
                className="flex items-center space-x-2 px-2 py-1 text-gray-600 hover:text-emerald-600"
                href="/products"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package size={18} />
                <span>Productos</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
