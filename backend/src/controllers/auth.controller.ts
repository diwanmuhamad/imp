import { Context } from "hono";
import * as AuthService from "../services/auth.service.js";
import { success, error } from "../utils/response.js";
import { RegisterInput, registerSchema } from "../schemas/auth.schema.js";
import { ZodError } from "zod";

export const register = async (c: Context) => {
  try {
    const body: RegisterInput = await c.req.json();
    const parsed = registerSchema.parse(body);
    const result = await AuthService.registerUser(parsed);
    return c.json(success(result, "User registered successfully"), 201);
  } catch (err: any) {
    if (err instanceof ZodError) {
      // ZodError has .issues, not .errors
      const messages = err.issues.map((issue) => issue.message).join(", ");
      return c.json(error(messages), 400);
    }
    return c.json(error(err.message), 400);
  }
};

export const login = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const result = await AuthService.loginUser(email, password);
    return c.json(success(result, "User logged in successfully"));
  } catch (err: any) {
    return c.json(error(err.message), 400);
  }
};
