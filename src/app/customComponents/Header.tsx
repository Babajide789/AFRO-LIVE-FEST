import { Link, useLocation } from 'react-router-dom';
import { Music, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/artists', label: 'Artists' },
    { href: '/map', label: 'Map View' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#008751] ${
                  isActive(link.href) ? 'text-[#008751]' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90">
              Get Tickets
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t py-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-[#008751] ${
                    isActive(link.href) ? 'text-[#008751]' : 'text-gray-700'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90 w-full">
                Get Tickets
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
