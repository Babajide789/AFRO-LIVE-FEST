import { Event, Artist } from "@/app/types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://afro-live-fest.vercel.app";

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch(`${BASE_URL}/api/artists`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch artists");
  return res.json();
}

export async function getEvents(filters?: {
  city?: string;
  genre?: string;
  featured?: boolean;
}): Promise<Event[]> {
  const params = new URLSearchParams();
  if (filters?.city) params.set("city", filters.city);
  if (filters?.genre) params.set("genre", filters.genre);
  if (filters?.featured) params.set("featured", "true");

  const res = await fetch(`${BASE_URL}/api/events?${params}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
}

export async function getEventBySlug(slug: string): Promise<Event> {
  const res = await fetch(`${BASE_URL}/api/events/${slug}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}