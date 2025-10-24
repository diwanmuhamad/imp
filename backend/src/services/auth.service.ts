import prisma from "../db/prisma.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";
import type { User } from "../types/user.js";

export const registerUser = async (
  data: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (existing) throw new Error("Email already registered");

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { name: data.name, email: data.email, password: hashed },
  });

  const token = await generateToken(user.id);
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid credentials");

  const match = await comparePassword(password, user.password);
  if (!match) throw new Error("Invalid credentials");

  const token = await generateToken(user.id);
  return { user, token };
};
