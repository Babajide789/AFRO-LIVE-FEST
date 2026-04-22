import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }  // ← Promise
) {
  try {
    const { slug } = await params   // ← await it first

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        artists: true,
        ticketTiers: true,
      },
    });

    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    const shaped = {
      ...event,
      date: event.date.toISOString().split("T")[0],
      location: {
        lat: event.lat,
        lng: event.lng,
        address: event.address,
      },
    };

    return Response.json(shaped);
  } catch (error) {
    console.error("Error fetching event:", error);
    return new Response("Failed to fetch event", { status: 500 });
  }
}