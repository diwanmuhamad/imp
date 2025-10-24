// src/components/Toast.tsx
"use client";

import { useToastStore } from "@/store/toastStore";

export default function Toast() {
  const { show, message, type } = useToastStore();

  if (!show || !message) return null;

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`toast ${
          type === "success" ? "toast-success" : "toast-error"
        }`}
      >
        <div
          className={`alert ${
            type === "success" ? "alert-success" : "alert-error"
          }`}
        >
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
}
