import { redis } from "./redis";

export async function createPairToken(accountId: string) {
  const token = crypto.randomUUID();
  await redis.set(`pair:${token}`, accountId, { ex: 60 });
  return token;
}

export async function claimPairToken(token: string) {
  const accountId = await redis.get<string>(`pair:${token}`);
  if (!accountId) return null;

  await redis.del(`pair:${token}`);
  return accountId;
}
