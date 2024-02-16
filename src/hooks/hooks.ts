import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useGetStoreLocal = (name: string) => {
  if (typeof window !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};
