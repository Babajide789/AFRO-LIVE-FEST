'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Music, ShoppingBag } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useCart } from '@/app/context/CartContext'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { totalQuantity } = useCart()
  const menuRef = useRef<HTMLDivElement>(null)

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  // Close on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/artists', label: 'Artists' },
    { href: '/map', label: 'Map View' },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">

      <div className="container mx-auto px-4">
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
              <span className="text-xl font-bold leading-none">AfroLive</span>
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
                  isActive(link.href) ? 'text-[#008751]' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Cart */}
          <div className="hidden md:block">
            <Link href="/cart" className="relative">
              <ShoppingBag className="size-6 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#008751] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex md:hidden items-center gap-4">

            {/* Cart always visible on mobile */}
            <Link href="/cart" className="relative">
              <ShoppingBag className="size-6 text-gray-700" />
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#008751] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalQuantity}
                </span>
              )}
            </Link>

            {/* Hamburger */}
            <button
              className="flex flex-col justify-center items-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 w-5 bg-gray-800 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-0.75' : '-translate-y-1'}`} />
              <span className={`block h-0.5 w-5 bg-gray-800 transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100'}`} />
              <span className={`block h-0.5 w-5 bg-gray-800 transition-all duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-0.75' : 'translate-y-1'}`} />
            </button>
          </div>

        </div>
      </div>

      {/* Backdrop — tap outside to close */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-down Menu */}
      <div
        ref={menuRef}
        className={`fixed top-16 left-0 w-full bg-white z-50 md:hidden shadow-xl transition-all duration-300 ease-in-out ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <nav className="px-6 py-6 flex flex-col gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                isActive(link.href)
                  ? 'bg-[#008751]/10 text-[#008751]'
                  : 'text-gray-800 hover:bg-gray-50 hover:text-[#008751]'
              }`}
              style={{ transitionDelay: mobileMenuOpen ? `${i * 40}ms` : '0ms' }}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#008751]" />
              )}
            </Link>
          ))}
        </nav>
      </div>

    </header>
  )
}