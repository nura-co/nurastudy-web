/* eslint-disable @typescript-eslint/no-explicit-any */
import { redis } from "./redis";
import { nanoid } from "nanoid";

export interface DeviceData {
  notes: any[];
  secret: string;
  createdAt: number;
}

export async function createDevice(): Promise<{
  deviceId: string;
  secret: string;
}> {
  const deviceId = nanoid(16);
  const secret = nanoid(32);

  const data: DeviceData = { notes: [], secret, createdAt: Date.now() };
  await redis.set(`device:${deviceId}`, JSON.stringify(data));

  return { deviceId, secret };
}

// get device data (requires secret)
export async function getDevice(
  deviceId: string,
  secret: string,
): Promise<DeviceData | null> {
  const device = (await redis.get(`device:${deviceId}`)) as DeviceData | null;
  if (!device) return null;

  if (device.secret !== secret) return null;

  return device;
}

// update device data (requires secret)
export async function updateDevice(
  deviceId: string,
  secret: string,
  newData: Partial<DeviceData>,
) {
  const device = await getDevice(deviceId, secret);
  if (!device) throw new Error("Unauthorized or device not found");

  const updated: DeviceData = { ...device, ...newData };
  await redis.set(`device:${deviceId}`, updated);
}
