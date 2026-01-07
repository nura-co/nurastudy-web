import { redis } from "./redis";
import { nanoid } from "nanoid";

export interface DeviceData {
  notes: string[];
  secret: string;
  createdAt: number;
}

// Start QR pairing
export async function startPairing(
  deviceId: string,
  secret: string,
): Promise<string> {
  const device = (await redis.get(`device:${deviceId}`)) as DeviceData | null;
  if (!device) throw new Error("Device not found");

  if (device.secret !== secret) throw new Error("Unauthorized");

  const pairToken = nanoid(10);
  await redis.set(`pair:${pairToken}`, deviceId, { ex: 120 }); // expires in 2 minutes

  return pairToken;
}

// Claim QR pairing on a new device
export async function claimPairing(
  pairToken: string,
  newDeviceId: string,
  newDeviceSecret: string,
) {
  const oldDeviceId = (await redis.get(`pair:${pairToken}`)) as string | null;
  if (!oldDeviceId) throw new Error("Invalid or expired QR token");

  const oldDevice = (await redis.get(
    `device:${oldDeviceId}`,
  )) as DeviceData | null;
  if (!oldDevice) throw new Error("Old device not found");

  // Create new device with old notes + new secret
  const newDevice: DeviceData = {
    notes: oldDevice.notes,
    secret: newDeviceSecret,
    createdAt: Date.now(),
  };

  await redis.set(`device:${newDeviceId}`, newDevice);

  // Delete old device and one-time pair token
  await redis.del(`device:${oldDeviceId}`);
  await redis.del(`pair:${pairToken}`);
}
