import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import { useMemo } from "react";
import { bindActionCreators } from "@reduxjs/toolkit";
import { authZustand } from "../store/auth.zustand";
import { IAuthState } from "../interfaces/auth.interface";

export const useGetStoreLocal = (name: string) => {
  if (typeof window !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};
export const useAuth = () => authZustand((state: IAuthState) => state);
