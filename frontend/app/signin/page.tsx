"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { loginSchema, LoginForm } from "@/lib/validation";
import Link from "next/link";
import { useToastStore } from "@/store/toastStore";

export default function RegisterPage() {
  const {
    setUser,
    setToken,
    loading,
    setLoading,
    error,
    setError,
    isAuthenticated,
  } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { showToast } = useToastStore();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      setUser(res.data.user);
      setToken(res.data.token);
      showToast("User logged in successfully!", "success");
    } catch (err: any) {
      showToast("Invalid credentials!", "error");
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    return <p className="text-center mt-20">You are already logged in.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            Login
          </button>
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="link link-primary">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
