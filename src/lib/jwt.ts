import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev-secret";

export function signJWT(accountId: string) {
  return jwt.sign({ accountId }, SECRET, { expiresIn: "15m" });
}

export function verifyJWT(token: string): { accountId: string } {
  return jwt.verify(token, SECRET) as { accountId: string };
}
