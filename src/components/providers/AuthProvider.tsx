"use client";
import React, { FC, PropsWithChildren, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { AuthService } from "../services/auth.service";
import { useAuth } from "@/src/hooks/hooks";
import NotFound from "../screens/not-found/NotFound";

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuth();

  console.log("user", user);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken && user) {
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
    }

    // Redirect to "/auth/sign_in" if the user is not authenticated
    if (!user && !pathname.startsWith("/auth/")) {
      router.push("/auth/sign_in");
    }
  }, [pathname, user, router]);

  console.log("user", user);

  return <>{children}</>;
};

export default AuthProvider;
