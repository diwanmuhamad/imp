import { Context, Next } from "hono";
import { verifyToken } from "../utils/jwt.js";
import { error } from "../utils/response.js";

export const authMiddleware = async (c: Context, next: Next) => {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json(error("Unauthorized"), 401);
  }

  const token = header.split(" ")[1];
  try {
    const decoded = (await verifyToken(token)) as any;
    c.set("user", decoded);
    await next();
  } catch {
    return c.json(error("Invalid or expired token"), 401);
  }
};
