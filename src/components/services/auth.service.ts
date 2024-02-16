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
};
