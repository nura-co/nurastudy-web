import { verifyJWT } from "./jwt";

export function requireAuth(req: Request) {
  const header = req.headers.get("authorization");
  if (!header) throw new Error("No auth header");

  const token = header.replace("Bearer ", "");
  const payload = verifyJWT(token);

  return payload.accountId;
}
