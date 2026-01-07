import { NextResponse } from "next/server";
import { redis, accountKey } from "@/lib/redis";
import { requireAuth } from "@/lib/auth";

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

export async function GET(req: Request) {
  const accountId = requireAuth(req);

  const result = await redis.get(accountKey(accountId));

  return NextResponse.json(result ?? { data: null, updatedAt: 0 });
}

export async function PUT(req: Request) {
  const accountId = requireAuth(req);
  const body = await req.json();

  await redis.set(accountKey(accountId), {
    data: body.data,
    updatedAt: body.updatedAt ?? Date.now(),
  });

  return NextResponse.json({ ok: true });
}
