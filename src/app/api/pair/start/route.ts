import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createPairToken } from "@/lib/pair";

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function POST(req: Request) {
  const accountId = requireAuth(req);
  const pairToken = await createPairToken(accountId);

  return NextResponse.json({ pairToken });
}
