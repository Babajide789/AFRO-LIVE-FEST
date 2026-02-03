import Link from 'next/link';
import { Music, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

export function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex size-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#008751] to-[#FF6B00]">
                <Music className="size-6 text-white" />
              </div>
              <span className="text-xl font-bold">NaijaLive</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Nigeria&apos;s premier platform for discovering and experiencing the best concerts and music festivals.
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-[#008751] transition-colors">
                <Instagram className="size-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#008751] transition-colors">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#008751] transition-colors">
                <Facebook className="size-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-[#008751] transition-colors">
                <Youtube className="size-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/artists" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link href="/map" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Map View
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  About Us
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-[#008751] transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get the latest event announcements and exclusive offers.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="text-sm"
                id="newsletter-email"
              />
              <Button 
                className="bg-[#008751] hover:bg-[#006b40]"
                onClick={() => {
                  const input = document.getElementById('newsletter-email') as HTMLInputElement;
                  if (input && input.value) {
                    toast.success('Successfully subscribed!', {
                      description: 'You\'ll receive updates about upcoming events.'
                    });
                    input.value = '';
                  } else {
                    toast.error('Please enter your email address');
                  }
                }}
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} NaijaLive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}