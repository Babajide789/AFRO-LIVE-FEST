import Image from "next/image";
import { Artist } from "@/app/types";
import { Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ArtistCardProps {
  artist: Artist;
}

export function ArtistCard({ artist }: ArtistCardProps) {
  if (!artist) return null;

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <ImageWithFallback
          src={artist.imageUrl}
          alt={artist.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          
        />
        

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white text-sm line-clamp-3">
              {artist.bio}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg group-hover:text-[#008751] transition-colors">
            {artist.name}
          </h3>

          {artist.instagramUrl && (
            <a
              href={artist.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-[#FF6B00] transition-colors"
            >
              <Instagram className="size-5" />
            </a>
          )}
        </div>

        <Badge variant="outline" className="text-xs">
          {artist.genre}
        </Badge>
      </div>
    </Card>
  );
}

