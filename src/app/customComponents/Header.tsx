'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/artists', label: 'Artists' },
    { href: '/map', label: 'Map View' },
  ]

  const isActive = (path: string) => pathname === path
  const { totalQuantity } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      
      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      <div className="container mx-auto px-4 relative z-50">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-10 items-center justify-center rounded-lg bg-linear-to-br from-[#008751] to-[#FF6B00]">
              <Music className="size-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold leading-none">NaijaLive</span>
              <span className="text-xs text-gray-600">Music & Festivals</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#008751] ${
                  isActive(link.href)
                    ? 'text-[#008751]'
                    : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Cart */}
          <div className="hidden md:block">
            <Link href="/cart" className="relative">
              <ShoppingBag className="size-6 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#008751] text-white text-xs rounded-full px-2">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* Animated Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black my-1 transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="border-t py-4">
            <div className="flex flex-col gap-4">
              
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-[#008751] ${
                    isActive(link.href)
                      ? 'text-[#008751]'
                      : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <ShoppingBag className="size-5" />
                <span>Cart ({totalQuantity})</span>
              </Link>

            </div>
          </nav>
        </div>

      </div>
    </header>
  )
}