import { Hono } from "hono";
import { PostController } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const postRoute = new Hono();

postRoute.get("/", PostController.getAll);
postRoute.get("/:id", PostController.getOne);

// Protected routes
postRoute.post("/", authMiddleware, PostController.create);
postRoute.put("/:id", authMiddleware, PostController.update);
postRoute.delete("/:id", authMiddleware, PostController.delete);

export default postRoute;
