import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

interface DeviceData {
  notes: string[];
  secret: string;
  createdAt: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const secret = req.headers.get("x-device-secret");
  const device = (await redis.get(`device:${id}`)) as DeviceData | null;

  if (!device)
    return NextResponse.json({ error: "Device not found" }, { status: 404 });

  if (device.secret !== secret)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  return NextResponse.json({ notes: device.notes });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { notes, secret } = await req.json();

  const device = (await redis.get(`device:${id}`)) as DeviceData | null;
  if (!device)
    return NextResponse.json({ error: "Device not found" }, { status: 404 });

  if (device.secret !== secret)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  device.notes = notes;
  await redis.set(`device:${id}`, JSON.stringify(device));

  return NextResponse.json({ ok: true });
}
