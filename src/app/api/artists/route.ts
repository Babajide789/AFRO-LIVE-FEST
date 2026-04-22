import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const artists = await prisma.artist.findMany();

    return Response.json(artists);
  } catch (error) {
    console.error("Error fetching artists:", error);
    return new Response("Failed to fetch artists", { status: 500 });
  }
}