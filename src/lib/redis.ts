import { Redis } from "@upstash/redis";

export const redis = Redis.fromEnv();

export const accountKey = (accountId: string) => `account:${accountId}:data`;
