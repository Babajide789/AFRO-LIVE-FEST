import { Event, Artist } from '@/app/types';

export const mockArtists: Artist[] = [
  {
    id: '1',
    name: 'Wizkid',
    genre: 'Afrobeats',
    imageUrl: '/images/wizkid/artist/wizkid12.webp',
    bio: 'Wizkid is one of Africa\'s biggest music stars, known for his smooth Afrobeats sound.',
    instagramUrl: 'https://instagram.com/wizkidayo'
  },
  {
    id: '2',
    name: 'Burna Boy',
    genre: 'Afrobeats',
    imageUrl: '/images/burnaboy/artist/burnaboy1.jpg',
    bio: 'Grammy-winning artist Burna Boy brings authentic African Giant energy to every stage.',
    instagramUrl: 'https://instagram.com/burnaboygram'
  },
  {
    id: '3',
    name: 'Tems',
    genre: 'R&B',
    imageUrl: '/images/tems/artist/tems1.webp',
    bio: 'Tems has taken the world by storm with her soulful voice and unique sound.',
    instagramUrl: 'https://instagram.com/temsbaby'
  },
  {
    id: '4',
    name: 'Asake',
    genre: 'Amapiano',
    imageUrl: '/images/asake/artist/asake5.webp',
    bio: 'Asake blends Amapiano with Afrobeats for an electrifying performance.',
    instagramUrl: 'https://instagram.com/asakemusic'
  },
  {
    id: '5',
    name: 'Rema',
    genre: 'Afrobeats',
    imageUrl: '/images/rema/artist/rema7.webp',
    bio: 'Rema is one of the most influential artists of his generation.',
    instagramUrl: 'https://instagram.com/rema'
  },
  {
    id: '6',
    name: 'The Cavemen',
    genre: 'Highlife',
    imageUrl: 'https://images.unsplash.com/photo-1687589891886-a8578a54ef76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXp6JTIwYmFuZCUyMHNheG9waG9uZXxlbnwxfHx8fDE3Njk3Njg4NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'The Cavemen bring modern Highlife music with traditional instruments.',
    instagramUrl: 'https://instagram.com/thecavemen'
  },
  {
    id: '7',
    name: 'TML Vibes',
    genre: 'Afrobeats',
    imageUrl: '/images/afroadura/artist/tml2.jpeg',
    bio: 'TML Vibes is a dynamic Afrobeats group that brings fresh energy to the music scene.',
    instagramUrl: 'https://instagram.com/tmlvibes'
  },
  {
    id: '8',
    name: 'Bhadboi OML',
    genre: 'Afrobeats',
    imageUrl: '/images/afroadura/artist/oml2.webp',
    bio: 'Bhadboi OML is a rising Afrobeats artist known for his unique sound and energetic performances.',
    instagramUrl: 'https://instagram.com/bhadboiOML'
  },
  {
    id: '9',
    name: 'T. I Blaze',
    genre: 'Afrobeats',
    imageUrl: '/images/afroadura/artist/tiblaze2.jpeg',
    bio: 'T. I Blaze is a rising Afrobeats artist known for his unique sound and energetic performances.',
    instagramUrl: 'https://instagram.com/tiblaze'
  },
];

export const mockEvents: Event[] = [
  {
    id: '1',
    slug: 'afronation-lagos-2026',
    title: 'Afro Nation Lagos',
    description: 'The biggest Afrobeats festival returns to Lagos with an incredible lineup of Africa\'s finest artists. Experience three days of non-stop music, culture, and celebration.',
    date: '2026-12-26',
    time: '18:00',
    venue: 'Eko Atlantic City',
    city: 'Lagos',
    genre: ['Afrobeats', 'Amapiano', 'Hip-Hop'],
    imageUrl: '/images/wizkid/event/wizkid5.webp',
    featured: true,
    artists: [mockArtists[0], mockArtists[1], mockArtists[3]],
    ticketTiers: [
      { id: 't1', name: 'General Admission', price: 25000, available: true, description: 'Access to main stage area' },
      { id: 't2', name: 'VIP', price: 75000, available: true, description: 'VIP area with exclusive lounge access' },
      { id: 't3', name: 'VVIP', price: 150000, available: false, description: 'Meet & greet with artists, backstage access' },
    ],
    location: {
      lat: 6.4098,
      lng: 3.4111,
      address: 'Eko Atlantic City, Victoria Island, Lagos'
    },
    capacity: 50000,
    status: 'upcoming'
  },
  {
    id: '2',
    slug: 'burna-boy-live-abuja',
    title: 'Burna Boy Live in Abuja',
    description: 'The African Giant brings his electrifying performance to the capital. Get ready for an unforgettable night of music and energy.',
    date: '2026-03-15',
    time: '20:00',
    venue: 'Velodrome Stadium',
    city: 'Abuja',
    genre: ['Afrobeats'],
    imageUrl: '/images/burnaboy/event/burnaboy5.jpg',
    featured: true,
    artists: [mockArtists[1]],
    ticketTiers: [
      { id: 't4', name: 'Regular', price: 20000, available: true, description: 'Standing area' },
      { id: 't5', name: 'Premium', price: 50000, available: true, description: 'Reserved seating' },
      { id: 't6', name: 'Diamond', price: 100000, available: true, description: 'Front row seats with exclusive perks' },
    ],
    location: {
      lat: 9.0579,
      lng: 7.4951,
      address: 'Velodrome Stadium, Package B, Abuja'
    },
    capacity: 15000,
    status: 'selling-fast'
  },
  {
    id: '3',
    slug: 'tems-live-in-lagos-tour',
    title: 'Tems Music Festival',
    description: 'The African Queen in the flesh in real time.',
    date: '2026-04-20',
    time: '17:00',
    venue: 'Liberation Stadium',
    city: 'Laagos',
    genre: ['R&B'],
    imageUrl: '/images/tems/artist/tems4.jpg',
    featured: false,
    artists: [mockArtists[2]],
    ticketTiers: [
      { id: 't7', name: 'General', price: 5000, available: true, description: 'General admission' },
      { id: 't8', name: 'VIP', price: 15000, available: true, description: 'VIP seating area' },
    ],
    location: {
      lat: 4.8156,
      lng: 7.0498,
      address: 'Liberation Stadium, Elekahia, Port Harcourt'
    },
    capacity: 20000,
    status: 'upcoming'
  },
  {
    id: '4',
    slug: 'asake-night-in-lagos',
    title: 'Asake Night in Lagos',
    description: 'Celebrate the golden sounds of asake and enjoy music. An evening of smooth melodies and cultural heritage.',
    date: '2026-05-10',
    time: '19:00',
    venue: 'Jogor Center',
    city: 'Lagos',
    genre: ['Afrobeats', 'Amapiano', 'Fuji'],
    imageUrl: '/images/asake/artist/asake2.jpg',
    featured: false,
    artists: [mockArtists[5]],
    ticketTiers: [
      { id: 't9', name: 'Standard', price: 8000, available: true, description: 'Standard seating' },
      { id: 't10', name: 'Premium', price: 20000, available: true, description: 'Premium tables with complimentary drinks' },
    ],
    location: {
      lat: 7.3775,
      lng: 3.9470,
      address: 'Jogor Center, Ring Road, Ibadan'
    },
    capacity: 5000,
    status: 'upcoming'
  },
  {
    id: '5',
    slug: 'wizkid-made-in-lagos-tour',
    title: 'Wizkid: Made in Lagos Tour',
    description: 'Starboy returns home with the Made in Lagos experience. Witness chart-topping hits performed live.',
    date: '2026-06-25',
    time: '21:00',
    venue: 'Tafawa Balewa Square',
    city: 'Lagos',
    genre: ['Afrobeats', 'R&B'],
    imageUrl: '/images/wizkid/event/wizkid5.webp',
    featured: true,
    artists: [mockArtists[0], mockArtists[2]],
    ticketTiers: [
      { id: 't11', name: 'Early Bird', price: 15000, available: false, description: 'Early bird special (Sold Out)' },
      { id: 't12', name: 'Regular', price: 30000, available: true, description: 'General admission' },
      { id: 't13', name: 'VIP', price: 80000, available: true, description: 'VIP section with bar access' },
    ],
    location: {
      lat: 6.4444,
      lng: 3.3964,
      address: 'Tafawa Balewa Square, Lagos Island, Lagos'
    },
    capacity: 30000,
    status: 'selling-fast'
  },
  {
    id: '6',
    slug: 'calabar-carnival-concert',
    title: 'Calabar Carnival Concert',
    description: 'Part of Africa\'s biggest street party, this concert features diverse Nigerian music celebrating our rich culture.',
    date: '2026-12-27',
    time: '16:00',
    venue: 'U.J. Esuene Stadium',
    city: 'Calabar',
    genre: ['Afrobeats', 'Highlife', 'Hip-Hop'],
    imageUrl: 'https://images.unsplash.com/photo-1756978303719-57095d8bd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY29uY2VydCUyMGNyb3dkfGVufDF8fHx8MTc2OTg0OTMzNnww&ixlib=rb-4.1.0&q=80&w=1080',
    featured: false,
    artists: [mockArtists[0], mockArtists[3], mockArtists[5], mockArtists[4]],
    ticketTiers: [
      { id: 't14', name: 'Festival Pass', price: 12000, available: true, description: 'Access to concert area' },
      { id: 't15', name: 'VIP Pass', price: 35000, available: true, description: 'VIP area with amenities' },
    ],
    location: {
      lat: 4.9517,
      lng: 8.3417,
      address: 'U.J. Esuene Stadium, Calabar'
    },
    capacity: 25000,
    status: 'upcoming'
  },
  {
    id: '7',
    slug: 'asake-x-wizkid',
    title: 'Asake x Wizkid Festival',
    description: 'Starboy returns home with the Made in Lagos experience. Witness chart-topping hits performed live.',
    date: '2026-06-25',
    time: '21:00',
    venue: 'Tafawa Balewa Square',
    city: 'Lagos',
    genre: ['Afrobeats', 'R&B'],
    imageUrl: '/images/wizkid/event/wizkid5.webp',
    featured: true,
    artists: [mockArtists[0], mockArtists[2], mockArtists[5]],
    ticketTiers: [
      { id: 't11', name: 'Early Bird', price: 15000, available: false, description: 'Early bird special (Sold Out)' },
      { id: 't12', name: 'Regular', price: 30000, available: true, description: 'General admission' },
      { id: 't13', name: 'VIP', price: 80000, available: true, description: 'VIP section with bar access' },
    ],
    location: {
      lat: 6.4444,
      lng: 3.3964,
      address: 'Tafawa Balewa Square, Lagos Island, Lagos'
    },
    capacity: 30000,
    status: 'selling-fast'
  },
  {
    id: '8',
    slug: 'fola-fest',
    title: 'Fola Live in Lagos',
    description: 'Celebrate the golden sounds of asake and enjoy music. An evening of smooth melodies and cultural heritage.',
    date: '2026-05-10',
    time: '19:00',
    venue: 'Balmoral Event Center',
    city: 'Lagos',
    genre: ['Afrobeats', 'Amapiano', 'Fuji'],
    imageUrl: '/images/asake/artist/asake2.jpg',
    featured: false,
    artists: [mockArtists[5]],
    ticketTiers: [
      { id: 't9', name: 'Standard', price: 8000, available: true, description: 'Standard seating' },
      { id: 't10', name: 'Premium', price: 20000, available: true, description: 'Premium tables with complimentary drinks' },
    ],
    location: {
      lat: 7.3775,
      lng: 3.9470,
      address: 'Jogor Center, Ring Road, Ibadan'
    },
    capacity: 5000,
    status: 'upcoming'
  },
];

export const cities = ['Lagos', 'Abuja', 'Port Harcourt', 'Ibadan', 'Kano', 'Enugu', 'Calabar'];
export const genres = ['Afrobeats', 'Hip-Hop', 'Gospel', 'Jazz', 'Amapiano', 'Highlife', 'R&B'];
