import { Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cities, genres } from '@/app/data/mockData';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCity: string;
  onCityChange: (value: string) => void;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  onReset?: () => void;
}

export function FilterBar({
  searchQuery,
  onSearchChange,
  selectedCity,
  onCityChange,
  selectedGenre,
  onGenreChange,
  onReset,
}: FilterBarProps) {
  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* City Filter */}
        <Select value={selectedCity} onValueChange={onCityChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Cities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Genre Filter */}
        <Select value={selectedGenre} onValueChange={onGenreChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Active Filters */}
      {(searchQuery || selectedCity !== 'all' || selectedGenre !== 'all') && (
        <div className="mt-4 flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SlidersHorizontal className="size-4" />
            <span>Active filters:</span>
          </div>
          {searchQuery && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              Search: "{searchQuery}"
            </div>
          )}
          {selectedCity !== 'all' && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {selectedCity}
            </div>
          )}
          {selectedGenre !== 'all' && (
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm">
              {selectedGenre}
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-[#FF6B00] hover:text-[#FF6B00]"
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}
