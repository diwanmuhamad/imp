import { sign, verify } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET!;

// Sign a JWT (for login)
export const generateToken = async (userId: string) => {
  const payload = {
    sub: userId,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // expires in 1 day
  };
  return await sign(payload, JWT_SECRET);
};

// Verify a JWT (middleware)
export const verifyToken = async (token: string | undefined) => {
  if (!token) throw new Error("No token provided");
  return await verify(token, JWT_SECRET);
};
