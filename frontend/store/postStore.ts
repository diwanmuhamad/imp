// src/store/usePostStore.ts
import { create } from "zustand";
import api from "@/lib/api";
import { useToastStore } from "./toastStore";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  page: number;
  totalPages: number;
  fetchPosts: (page?: number, limit?: number) => Promise<void>;
  createPost: (data: { title: string; content: string }) => Promise<void>;
  updatePost: (
    id: string,
    data: { title: string; content: string }
  ) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const usePostStore = create<PostState>((set, get) => ({
  posts: [],
  loading: false,
  page: 1,
  totalPages: 1,

  fetchPosts: async (page = 1, limit = 5) => {
    set({ loading: true });
    try {
      const res = await api.get(`/posts?page=${page}&limit=${limit}`);
      console.log(res);
      set({
        posts: res.data.data.posts,
        page,
        totalPages: res.data.data.pagination.pages,
      });
    } catch (err: any) {
      useToastStore
        .getState()
        .showToast(
          err.response?.data?.message || "Failed to fetch posts",
          "error"
        );
    } finally {
      set({ loading: false });
    }
  },

  createPost: async (data) => {
    set({ loading: true });
    try {
      const res = await api.post("/posts", data);
      useToastStore
        .getState()
        .showToast("Post created successfully", "success");
      get().fetchPosts();
    } catch (err: any) {
      useToastStore
        .getState()
        .showToast(
          err.response?.data?.message || "Failed to create post",
          "error"
        );
    } finally {
      set({ loading: false });
    }
  },

  updatePost: async (id, data) => {
    set({ loading: true });
    try {
      const res = await api.put(`/posts/${id}`, data);
      useToastStore
        .getState()
        .showToast("Post updated successfully", "success");
      get().fetchPosts();
    } catch (err: any) {
      useToastStore
        .getState()
        .showToast(
          err.response?.data?.message || "Failed to update post",
          "error"
        );
    } finally {
      set({ loading: false });
    }
  },

  deletePost: async (id) => {
    set({ loading: true });
    try {
      await api.delete(`/posts/${id}`);
      useToastStore
        .getState()
        .showToast("Post deleted successfully", "success");
      get().fetchPosts();
    } catch (err: any) {
      useToastStore
        .getState()
        .showToast(
          err.response?.data?.message || "Failed to delete post",
          "error"
        );
    } finally {
      set({ loading: false });
    }
  },
}));
