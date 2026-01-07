import { NextResponse } from "next/server";
import { signJWT } from "@/lib/jwt";

export async function POST() {
  const accountId = crypto.randomUUID();
  const token = signJWT(accountId);

  return NextResponse.json({
    token,
  });
}
