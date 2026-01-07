import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";

export async function POST() {
  const deviceId = nanoid(16);
  const secret = nanoid(32);

  const data = { notes: [], secret, createdAt: Date.now() };
  await redis.set(`device:${deviceId}`, JSON.stringify(data));

  return NextResponse.json({ deviceId, secret });
}
