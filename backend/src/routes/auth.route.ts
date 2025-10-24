import { Hono } from "hono";
import { register, login } from "../controllers/auth.controller.js";

const authRoutes = new Hono();

authRoutes.post("/signup", register);
authRoutes.post("/signin", login);

export default authRoutes;
