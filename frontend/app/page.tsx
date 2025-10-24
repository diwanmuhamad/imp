"use client";

import { use, useEffect, useState } from "react";
import { usePostStore } from "@/store/postStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@/lib/types";
import { postSchema, PostFormData } from "@/lib/validation";
import { useAuthStore } from "@/store/authStore";

export default function PostsPage() {
  const {
    posts,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    loading,
    page,
    totalPages,
  } = usePostStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const { logout, isAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const onSubmit = (data: PostFormData) => {
    if (editingId) {
      updatePost(editingId, data);
      setEditingId(null);
    } else {
      createPost(data);
    }
    reset({ title: "", content: "" });
  };

  const startEdit = (post: PostFormData & { id: string }) => {
    setEditingId(post.id);
    reset({ title: post.title, content: post.content });
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/signin";
  };

  useEffect(() => {
    // Mark store as hydrated after initial load
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      window.location.href = "/signin";
    }
  }, [isAuthenticated, hydrated]);

  if (!hydrated || !isAuthenticated) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Posts Management</h1>
        <button className="btn btn-error btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <input
          {...register("title")}
          placeholder="Title"
          className="input input-bordered w-full mb-2"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>
        )}

        <textarea
          {...register("content")}
          placeholder="Content"
          className="textarea textarea-bordered w-full mb-2"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>
        )}

        <button type="submit" className="btn btn-primary">
          {editingId ? "Update Post" : "Create Post"}
        </button>
      </form>

      {/* Posts Table */}
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: Post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.content}</td>
                <td className="space-x-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => startEdit(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => deletePost(post.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          className="btn btn-sm"
          disabled={page <= 1}
          onClick={() => fetchPosts(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          className="btn btn-sm"
          disabled={page >= totalPages}
          onClick={() => fetchPosts(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
