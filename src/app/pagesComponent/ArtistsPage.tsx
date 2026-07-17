import { ArtistCard } from "../customComponents/ArtistCard";
import { Artist } from "@/app/types";

async function getArtists(): Promise<Artist[]> {
  const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://afro-live-fest.vercel.app";

  const res = await fetch(`${baseUrl}/api/artists`, {
    cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }

  return res.json();
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Featured Artists</h1>
          <p className="text-gray-600">
            Discover the incredible talent performing at concerts and festivals across Nigeria
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}