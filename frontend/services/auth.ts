import api from "@/lib/api";
import { LoginInput, RegisterInput } from "@/lib/types";

export async function loginUser(data: LoginInput) {
  const res = await api.post("/auth/signin", data);
  return res.data;
}

export async function registerUser(data: RegisterInput) {
  const res = await api.post("/auth/signup", data);
  return res.data;
}
