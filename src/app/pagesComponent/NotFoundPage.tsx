import Link from 'next/link';

import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <div className="text-9xl font-bold bg-linear-to-r from-[#008751] to-[#FF6B00] bg-clip-text text-transparent">
            404
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-linear-to-r from-[#008751] to-[#FF6B00] hover:opacity-90 w-full sm:w-auto">
              <Home className="size-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="outline" className="w-full sm:w-auto">
              <Search className="size-4 mr-2" />
              Browse Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
