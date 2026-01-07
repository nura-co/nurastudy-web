import { NextResponse } from "next/server";
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

export async function POST() {
  const accountId = crypto.randomUUID();
  const token = signJWT(accountId);

  return NextResponse.json({
    token,
  });
}
