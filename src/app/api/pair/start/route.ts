import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createPairToken } from "@/lib/pair";

export async function POST(req: Request) {
  const accountId = requireAuth(req);
  const pairToken = await createPairToken(accountId);

  return NextResponse.json({ pairToken });
}
