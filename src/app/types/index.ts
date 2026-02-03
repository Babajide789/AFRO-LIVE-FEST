export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  genre: string[];
  imageUrl: string;
  featured: boolean;
  artists: Artist[];
  ticketTiers: TicketTier[];
  location: Location;
  capacity: number;
  status: 'upcoming' | 'selling-fast' | 'sold-out';
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  imageUrl: string;
  bio: string;
  spotifyUrl?: string;
  instagramUrl?: string;
}

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  available: boolean;
  description: string;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export type City = 'Lagos' | 'Abuja' | 'Port Harcourt' | 'Ibadan' | 'Kano' | 'Enugu' | 'Calabar';
export type Genre = 'Afrobeats' | 'Hip-Hop' | 'Gospel' | 'Jazz' | 'Amapiano' | 'Highlife' | 'R&B';
