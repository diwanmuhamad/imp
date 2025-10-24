import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import routes from "./routes/index.js";

// Create Hono app
const app = new Hono();

// Global Middlewares
app.use("*", logger());
app.use("*", cors());

app.route("/api", routes);

// Root route (health check)
app.get("/", (c) => c.text("🚀 Hono backend is running!"));

// Fallback
app.notFound((c) => c.json({ message: "Route not found" }, 404));

export default app;
