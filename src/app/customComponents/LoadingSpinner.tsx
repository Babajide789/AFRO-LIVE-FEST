import { Music } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-[#008751]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Music className="size-6 text-[#008751]" />
          </div>
        </div>
        <p className="mt-4 text-gray-600">Loading events...</p>
      </div>
    </div>
  );
}
