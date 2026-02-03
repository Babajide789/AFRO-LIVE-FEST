import { Button } from '@/components/ui/button';
import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  onReset?: () => void;
}

export function EmptyState({
  title = 'No events found',
  description = 'Try adjusting your filters or search query',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-100 rounded-full p-6 mb-4">
        <SearchX className="size-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {onReset && (
        <Button onClick={onReset} variant="outline">
          Clear Filters
        </Button>
      )}
    </div>
  );
}
