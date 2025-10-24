"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/services/auth";
import { useAuthStore } from "@/store/authStore";
import { registerSchema, RegisterForm } from "@/lib/validation";
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
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const [hydrated, setHydrated] = useState(false);
  const { showToast } = useToastStore();

  const onSubmit = async (data: RegisterForm) => {
    try {
      setLoading(true);
      const res = await registerUser(data);
      setUser(res.data.user);
      setToken(res.data.token);
      showToast("Registration successful!", "success");
    } catch (err: any) {
      showToast("Registration failed!", "error");
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Mark store as hydrated after initial load
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && isAuthenticated) {
      window.location.href = "/";
    }
  }, [isAuthenticated, hydrated]);

  if (!hydrated || isAuthenticated) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="input input-bordered w-full"
            {...register("name")}
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}

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
            Register
          </button>
          {error && <p className="text-error text-center mt-2">{error}</p>}
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/signin" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
