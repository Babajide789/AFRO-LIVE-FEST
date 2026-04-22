import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    const genre = searchParams.get("genre");
    const featured = searchParams.get("featured");
    const slug = searchParams.get("slug");

    const events = await prisma.event.findMany({
      where: {
        ...(city && { city }),
        ...(genre && { genres: { has: genre } }),
        ...(featured === "true" && { featured: true }),
        ...(slug && { slug }),
      },
      include: {
        artists: true,
        ticketTiers: true,
      },
      orderBy: { date: "asc" },
    });

    // Shape the response to match your frontend Event type
    const shaped = events.map((event) => ({
      ...event,
      date: event.date.toISOString().split("T")[0], // DateTime → "YYYY-MM-DD" string
      location: {
        lat: event.lat,
        lng: event.lng,
        address: event.address,
      },
    }));

    return Response.json(shaped);
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response("Failed to fetch events", { status: 500 });
  }
}