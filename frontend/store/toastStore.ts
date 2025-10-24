// src/store/useToastStore.ts
import { create } from "zustand";

type ToastType = "success" | "error";

interface ToastState {
  message: string | null;
  type: ToastType | null;
  show: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: null,
  show: false,
  showToast: (message, type) => {
    set({ message, type, show: true });

    // Auto-hide after 3s
    setTimeout(() => set({ show: false, message: null, type: null }), 3000);
  },
  hideToast: () => set({ show: false, message: null, type: null }),
}));
