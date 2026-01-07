import { redis } from "@/lib/redis";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

interface DeviceData {
  notes: string[];
  secret: string;
  createdAt: number;
}

// Handle CORS preflight
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, x-device-secret",
    },
  });
}

export async function POST(req: NextRequest) {
  const { deviceId, secret } = await req.json();

  const device = (await redis.get(`device:${deviceId}`)) as DeviceData | null;
  if (!device)
    return NextResponse.json({ error: "Device not found" }, { status: 404 });

  if (device.secret !== secret)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const pairToken = nanoid(10);
  await redis.set(`pair:${pairToken}`, deviceId, { ex: 120 }); // expires in 2 min

  return NextResponse.json({ pairToken });
}
