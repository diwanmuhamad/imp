import { z } from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .refine((val) => val.trim().length > 0, {
      message: "Title is required",
    }),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .refine((val) => val.trim().length > 0, {
      message: "Content is required",
    }),

  authorId: z.string(),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must not exceed 100 characters")
    .optional(),

  content: z
    .string()
    .min(10, "Content must be at least 10 characters long")
    .optional(),
});
