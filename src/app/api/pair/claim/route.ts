import { NextResponse } from "next/server";
import { claimPairToken } from "@/lib/pair";
import { signJWT } from "@/lib/jwt";

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
  const { pairToken } = await req.json();

  const accountId = await claimPairToken(pairToken);
  if (!accountId) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 400 },
    );
  }

  const token = signJWT(accountId);
  return NextResponse.json({ token });
}
