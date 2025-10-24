import prisma from "../db/prisma.js";
import type { Post } from "../types/post.js";

export const PostService = {
  async getAllPosts(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        skip,
        take: limit,
        include: { author: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.post.count(),
    ]);

    return {
      posts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    };
  },

  async getPostById(id: string) {
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: { select: { id: true, name: true, email: true } } },
    });
    if (!post) throw new Error("Post not found");
    return post;
  },

  async createPost(data: Omit<Post, "id" | "createdAt" | "updatedAt">) {
    return prisma.post.create({ data });
  },

  async updatePost(
    id: string,
    data: { title?: string | undefined; content?: string | undefined }
  ) {
    return prisma.post.update({
      where: { id },
      data,
    });
  },

  async deletePost(id: string) {
    return prisma.post.delete({ where: { id } });
  },
};
