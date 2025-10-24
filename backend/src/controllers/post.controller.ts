import { Context } from "hono";
import { PostService } from "../services/post.service.js";
import { success, error } from "../utils/response.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.schema.js";
import { ZodError } from "zod";

export const PostController = {
  getAll: async (c: Context) => {
    try {
      const page = Number(c.req.query("page") || 1);
      const limit = Number(c.req.query("limit") || 10);
      const data = await PostService.getAllPosts(page, limit);
      return c.json(success(data, "Posts retrieved successfully"));
    } catch (err: any) {
      return c.json(error(err.message), 400);
    }
  },

  getOne: async (c: Context) => {
    try {
      const id = c.req.param("id");
      const post = await PostService.getPostById(id);
      return c.json(success(post, "Post details retrieved"));
    } catch (err: any) {
      return c.json(error(err.message), 400);
    }
  },

  create: async (c: Context) => {
    try {
      const { title, content } = await c.req.json();
      const user = c.get("user"); // from auth middleware
      const parsed = createPostSchema.parse({
        title,
        content,
        authorId: user.sub,
      });
      const newPost = await PostService.createPost(parsed);
      return c.json(success(newPost, "Post created successfully"), 201);
    } catch (err: any) {
      if (err instanceof ZodError) {
        // ZodError has .issues, not .errors
        const messages = err.issues.map((issue) => issue.message).join(", ");
        return c.json(error(messages), 400);
      }
      return c.json(error(err.message), 400);
    }
  },

  update: async (c: Context) => {
    try {
      const id = c.req.param("id");
      const { title, content } = await c.req.json();
      const parsed = updatePostSchema.parse({ title, content });
      const updatedPost = await PostService.updatePost(id, parsed);
      return c.json(success(updatedPost, "Post updated successfully"));
    } catch (err: any) {
      if (err instanceof ZodError) {
        // ZodError has .issues, not .errors
        const messages = err.issues.map((issue) => issue.message).join(", ");
        return c.json(error(messages), 400);
      }
      return c.json(error(err.message), 400);
    }
  },

  delete: async (c: Context) => {
    try {
      const id = c.req.param("id");
      await PostService.deletePost(id);
      return c.json(success(null, "Post deleted successfully"));
    } catch (err: any) {
      return c.json(error(err.message), 400);
    }
  },
};
