import { prisma } from "@/prisma";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return new Response(JSON.stringify(await prisma.facility.findMany()), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
