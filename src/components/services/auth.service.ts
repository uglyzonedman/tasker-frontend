import { $apiWithoutToken } from "@/src/api/api";

export const AuthService = {
  async register(email: string, password: string, login: string) {
    const res = await $apiWithoutToken.post("auth/register", {
      email: email,
      password: password,
      login,
    });

    return res.data;
  },
  async login(email: string, password: string) {
    const res = await $apiWithoutToken.post("auth/login", {
      email: email,
      password: password,
    });

    return res.data;
  },
};
