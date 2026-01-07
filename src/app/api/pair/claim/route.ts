import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

interface DeviceData {
  notes: string[];
  secret: string;
  createdAt: number;
}

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
  const { pairToken, newDeviceId, newDeviceSecret } = await req.json();

  const originalDeviceId = (await redis.get(`pair:${pairToken}`)) as
    | string
    | null;
  if (!originalDeviceId) {
    return NextResponse.json(
      { error: "Invalid or expired pair token" },
      { status: 400 },
    );
  }

  const originalDevice = (await redis.get(
    `device:${originalDeviceId}`,
  )) as DeviceData | null;
  if (!originalDevice) {
    return NextResponse.json(
      { error: "Original device not found" },
      { status: 404 },
    );
  }

  const newDevice: DeviceData = {
    notes: originalDevice.notes,
    secret: newDeviceSecret,
    createdAt: Date.now(),
  };
  await redis.set(`device:${newDeviceId}`, newDevice);

  await redis.del(`device:${originalDeviceId}`);

  await redis.del(`pair:${pairToken}`);

  return NextResponse.json({ ok: true, deviceId: newDeviceId });
}
