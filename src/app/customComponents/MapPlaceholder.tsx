import { MapPin, Navigation } from 'lucide-react';

interface MapPlaceholderProps {
  location?: {
    lat: number;
    lng: number;
    address: string;
  };
  height?: string;
  showControls?: boolean;
}

export function MapPlaceholder({ location, height = 'h-96', showControls = true }: MapPlaceholderProps) {
  return (
    <div className={`${height} bg-linear-to-br from-gray-100 to-gray-200 rounded-lg relative overflow-hidden`}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div key={i} className="border border-gray-400" />
          ))}
        </div>
      </div>

      {/* Map Pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-bounce">
          <MapPin className="size-12 text-[#FF6B00] fill-[#FF6B00]/20" />
        </div>
      </div>

      {/* Location Info */}
      {location && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-[#008751] mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm mb-1">Event Location</p>
              <p className="text-sm text-gray-600">{location.address}</p>
              <p className="text-xs text-gray-500 mt-1">
                Lat: {location.lat.toFixed(4)}, Lng: {location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
            <Navigation className="size-5 text-gray-700" />
          </button>
        </div>
      )}

      {/* Placeholder Text */}
      <div className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 rounded-full text-xs text-gray-600">
        Interactive Map (Google Maps / Mapbox)
      </div>
    </div>
  );
}
