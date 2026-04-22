import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as dotenv from "dotenv";

dotenv.config();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  // ── ARTISTS ──────────────────────────────────────────────
  const artists = await Promise.all([
    prisma.artist.upsert({
      where: { name: "Wizkid" },
      update: {},
      create: {
        name: "Wizkid",
        genre: "Afrobeats",
        imageUrl: "/images/wizkid/artist/wizkid12.webp",
        bio: "Wizkid is one of Africa's biggest music stars, known for his smooth Afrobeats sound.",
        instagramUrl: "https://instagram.com/wizkidayo",
      },
    }),
    prisma.artist.upsert({
      where: { name: "Burna Boy" },
      update: {},
      create: {
        name: "Burna Boy",
        genre: "Afrobeats",
        imageUrl: "/images/burnaboy/artist/burnaboy1.jpg",
        bio: "Grammy-winning artist Burna Boy brings authentic African Giant energy to every stage.",
        instagramUrl: "https://instagram.com/burnaboygram",
      },
    }),
    prisma.artist.upsert({
      where: { name: "Tems" },
      update: {},
      create: {
        name: "Tems",
        genre: "R&B",
        imageUrl: "/images/tems/artist/tems1.webp",
        bio: "Tems has taken the world by storm with her soulful voice and unique sound.",
        instagramUrl: "https://instagram.com/temsbaby",
      },
    }),
    prisma.artist.upsert({
      where: { name: "Asake" },
      update: {},
      create: {
        name: "Asake",
        genre: "Amapiano",
        imageUrl: "/images/asake/artist/asake5.webp",
        bio: "Asake blends Amapiano with Afrobeats for an electrifying performance.",
        instagramUrl: "https://instagram.com/asakemusic",
      },
    }),
    prisma.artist.upsert({
      where: { name: "Rema" },
      update: {},
      create: {
        name: "Rema",
        genre: "Afrobeats",
        imageUrl: "/images/rema/artist/rema7.webp",
        bio: "Rema is one of the most influential artists of his generation.",
        instagramUrl: "https://instagram.com/rema",
      },
    }),
    prisma.artist.upsert({
      where: { name: "The Cavemen" },
      update: {},
      create: {
        name: "The Cavemen",
        genre: "Highlife",
        imageUrl: "/images/cavemen/cavemen2.webp",
        bio: "The Cavemen bring modern Highlife music with traditional instruments.",
        instagramUrl: "https://instagram.com/thecavemen",
      },
    }),
    prisma.artist.upsert({
      where: { name: "TML Vibes" },
      update: {},
      create: {
        name: "TML Vibes",
        genre: "Afrobeats",
        imageUrl: "/images/afroadura/artist/tml2.jpeg",
        bio: "TML Vibes is a dynamic Afrobeats group that brings fresh energy to the music scene.",
        instagramUrl: "https://instagram.com/tmlvibes",
      },
    }),
    prisma.artist.upsert({
      where: { name: "Bhadboi OML" },
      update: {},
      create: {
        name: "Bhadboi OML",
        genre: "Afrobeats",
        imageUrl: "/images/afroadura/artist/oml2.webp",
        bio: "Bhadboi OML is a rising Afrobeats artist known for his unique sound and energetic performances.",
        instagramUrl: "https://instagram.com/bhadboiOML",
      },
    }),
    prisma.artist.upsert({
      where: { name: "T. I Blaze" },
      update: {},
      create: {
        name: "T. I Blaze",
        genre: "Afrobeats",
        imageUrl: "/images/afroadura/artist/tiblaze2.jpeg",
        bio: "T. I Blaze is a rising Afrobeats artist known for his unique sound and energetic performances.",
        instagramUrl: "https://instagram.com/tiblaze",
      },
    }),
  ]);

  const [wizkid, burnaboy, tems, asake, rema, cavemen] = artists;
  console.log(`✅ Seeded ${artists.length} artists`);

  // ── EVENTS ───────────────────────────────────────────────
  const eventsData = [
    {
      slug: "afronation-lagos-2026",
      title: "Afro Nation Lagos",
      description: "The biggest Afrobeats festival returns to Lagos with an incredible lineup of Africa's finest artists. Experience three days of non-stop music, culture, and celebration.",
      date: new Date("2026-12-26"),
      time: "18:00",
      venue: "Eko Atlantic City",
      city: "Lagos",
      genres: ["Afrobeats", "Amapiano", "Hip-Hop"],
      imageUrl: "/images/wizkid/event/wizkid5.webp",
      featured: true,
      capacity: 50000,
      status: "upcoming",
      lat: 6.4098,
      lng: 3.4111,
      address: "Eko Atlantic City, Victoria Island, Lagos",
      artists: [wizkid.id, burnaboy.id, asake.id],
      ticketTiers: [
        { name: "General Admission", price: 25000, available: true, description: "Access to main stage area" },
        { name: "VIP", price: 75000, available: true, description: "VIP area with exclusive lounge access" },
        { name: "VVIP", price: 150000, available: false, description: "Meet & greet with artists, backstage access" },
      ],
    },
    {
      slug: "burna-boy-live-abuja",
      title: "Burna Boy Live in Abuja",
      description: "The African Giant brings his electrifying performance to the capital. Get ready for an unforgettable night of music and energy.",
      date: new Date("2026-03-15"),
      time: "20:00",
      venue: "Velodrome Stadium",
      city: "Abuja",
      genres: ["Afrobeats"],
      imageUrl: "/images/burnaboy/event/burnaboy5.jpg",
      featured: true,
      capacity: 15000,
      status: "selling-fast",
      lat: 9.0579,
      lng: 7.4951,
      address: "Velodrome Stadium, Package B, Abuja",
      artists: [burnaboy.id],
      ticketTiers: [
        { name: "Regular", price: 20000, available: true, description: "Standing area" },
        { name: "Premium", price: 50000, available: true, description: "Reserved seating" },
        { name: "Diamond", price: 100000, available: true, description: "Front row seats with exclusive perks" },
      ],
    },
    {
      slug: "tems-live-in-lagos-tour",
      title: "Tems Music Festival",
      description: "The African Queen in the flesh in real time.",
      date: new Date("2026-04-20"),
      time: "17:00",
      venue: "Liberation Stadium",
      city: "Port Harcourt",
      genres: ["R&B"],
      imageUrl: "/images/tems/artist/tems4.jpg",
      featured: false,
      capacity: 20000,
      status: "upcoming",
      lat: 4.8156,
      lng: 7.0498,
      address: "Liberation Stadium, Elekahia, Port Harcourt",
      artists: [tems.id],
      ticketTiers: [
        { name: "General", price: 5000, available: true, description: "General admission" },
        { name: "VIP", price: 15000, available: true, description: "VIP seating area" },
      ],
    },
    {
      slug: "asake-night-in-lagos",
      title: "Asake Night in Lagos",
      description: "Celebrate the golden sounds of asake and enjoy music. An evening of smooth melodies and cultural heritage.",
      date: new Date("2026-05-10"),
      time: "19:00",
      venue: "Jogor Center",
      city: "Ibadan",
      genres: ["Afrobeats", "Amapiano", "Fuji"],
      imageUrl: "/images/asake/artist/asake2.jpg",
      featured: false,
      capacity: 5000,
      status: "upcoming",
      lat: 7.3775,
      lng: 3.947,
      address: "Jogor Center, Ring Road, Ibadan",
      artists: [asake.id],
      ticketTiers: [
        { name: "Standard", price: 8000, available: true, description: "Standard seating" },
        { name: "Premium", price: 20000, available: true, description: "Premium tables with complimentary drinks" },
      ],
    },
    {
      slug: "wizkid-made-in-lagos-tour",
      title: "Wizkid: Made in Lagos Tour",
      description: "Starboy returns home with the Made in Lagos experience. Witness chart-topping hits performed live.",
      date: new Date("2026-06-25"),
      time: "21:00",
      venue: "Tafawa Balewa Square",
      city: "Lagos",
      genres: ["Afrobeats", "R&B"],
      imageUrl: "/images/wizkid/event/wizkid5.webp",
      featured: true,
      capacity: 30000,
      status: "selling-fast",
      lat: 6.4444,
      lng: 3.3964,
      address: "Tafawa Balewa Square, Lagos Island, Lagos",
      artists: [wizkid.id, tems.id],
      ticketTiers: [
        { name: "Early Bird", price: 15000, available: false, description: "Early bird special (Sold Out)" },
        { name: "Regular", price: 30000, available: true, description: "General admission" },
        { name: "VIP", price: 80000, available: true, description: "VIP section with bar access" },
      ],
    },
    {
      slug: "calabar-carnival-concert",
      title: "Calabar Carnival Concert",
      description: "Part of Africa's biggest street party, this concert features diverse Nigerian music celebrating our rich culture.",
      date: new Date("2026-12-27"),
      time: "16:00",
      venue: "U.J. Esuene Stadium",
      city: "Calabar",
      genres: ["Afrobeats", "Highlife", "Hip-Hop"],
      imageUrl: "https://images.unsplash.com/photo-1756978303719-57095d8bd250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGZlc3RpdmFsJTIwY29uY2VydCUyMGNyb3dkfGVufDF8fHx8MTc2OTg0OTMzNnww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
      capacity: 25000,
      status: "upcoming",
      lat: 4.9517,
      lng: 8.3417,
      address: "U.J. Esuene Stadium, Calabar",
      artists: [wizkid.id, asake.id, cavemen.id, rema.id],
      ticketTiers: [
        { name: "Festival Pass", price: 12000, available: true, description: "Access to concert area" },
        { name: "VIP Pass", price: 35000, available: true, description: "VIP area with amenities" },
      ],
    },
    {
      slug: "asake-x-wizkid",
      title: "Asake x Wizkid Festival",
      description: "Starboy returns home with the Made in Lagos experience. Witness chart-topping hits performed live.",
      date: new Date("2026-06-25"),
      time: "21:00",
      venue: "Tafawa Balewa Square",
      city: "Lagos",
      genres: ["Afrobeats", "R&B"],
      imageUrl: "/images/wizkid/event/wizkid5.webp",
      featured: true,
      capacity: 30000,
      status: "selling-fast",
      lat: 6.4444,
      lng: 3.3964,
      address: "Tafawa Balewa Square, Lagos Island, Lagos",
      artists: [wizkid.id, tems.id, asake.id, rema.id],
      ticketTiers: [
        { name: "Early Bird", price: 15000, available: false, description: "Early bird special (Sold Out)" },
        { name: "Regular", price: 30000, available: true, description: "General admission" },
        { name: "VIP", price: 80000, available: true, description: "VIP section with bar access" },
      ],
    },
    {
      slug: "fola-fest",
      title: "Fola Live in Lagos",
      description: "Celebrate the golden sounds of asake and enjoy music. An evening of smooth melodies and cultural heritage.",
      date: new Date("2026-05-10"),
      time: "19:00",
      venue: "Balmoral Event Center",
      city: "Lagos",
      genres: ["Afrobeats", "Amapiano", "Fuji"],
      imageUrl: "/images/fola/fola1.webp",
      featured: false,
      capacity: 5000,
      status: "upcoming",
      lat: 7.3775,
      lng: 3.947,
      address: "Jogor Center, Ring Road, Ibadan",
      artists: [cavemen.id],
      ticketTiers: [
        { name: "Standard", price: 8000, available: true, description: "Standard seating" },
        { name: "Premium", price: 20000, available: true, description: "Premium tables with complimentary drinks" },
      ],
    },
  ];

  for (const event of eventsData) {
    const { artists: artistIds, ticketTiers, lat, lng, address, genres, ...rest } = event;

    await prisma.event.upsert({
      where: { slug: rest.slug },
      update: {},
      create: {
        ...rest,
        genres,
        lat,
        lng,
        address,
        artists: {
          connect: artistIds.map((id) => ({ id })),
        },
        ticketTiers: {
          create: ticketTiers,
        },
      },
    });
  }

  console.log(`✅ Seeded ${eventsData.length} events`);
  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });