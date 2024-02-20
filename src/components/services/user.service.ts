import { $apiWithToken } from "@/src/api/api";

export const UserService = {
  async getProfile() {
    const res = await $apiWithToken.get("user/profile");

    return res.data;
  },
};
