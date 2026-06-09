import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const supervisions = await prisma.supervision.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    const observations = await prisma.observation.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ supervisions, observations });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json({ error: "Failed to fetch records" }, { status: 500 });
  }
}
