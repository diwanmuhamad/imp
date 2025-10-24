import { Hono } from "hono";
import authRoute from "./auth.route.js";
import postRoute from "./post.route.js";

const routes = new Hono();

routes.route("/auth", authRoute);
routes.route("/posts", postRoute);

export default routes;
