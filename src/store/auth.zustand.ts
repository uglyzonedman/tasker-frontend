import create from "zustand";
import { useGetStoreLocal } from "../hooks/hooks";
import { persist, devtools, createJSONStorage } from "zustand/middleware";
import { AuthService } from "../components/services/auth.service";
import Cookies from "js-cookie";
import { IAuthState } from "../interfaces/auth.interface";

export const authZustand = create<IAuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user:
          typeof window !== "undefined" ? localStorage.getItem("user") : null,
        isLoading: false,
        error: null,
        register: async (email: string, password: string, login: string) => {
          set({ isLoading: true });

          await AuthService.register(email, password, login)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              set({ isLoading: true });
              console.error(err);
            });
        },
        login: async (email: string, password: string) => {
          set({ isLoading: true });

          await AuthService.login(email, password)
            .then((res) => {
              console.log("zustand login successful");
              let user = {
                id: res.id,
                email: res.email,
              };
              window.location.href = "/";
              localStorage.setItem("user", JSON.stringify(user));
              Cookies.set("accessToken", res.accessToken, {
                path: "/",
              });
              set({ isLoading: false, user: user });
            })
            .catch((err) => {
              set({ isLoading: true });
              console.error(err);
            });
        },
      }),
      {
        name: "auth",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
