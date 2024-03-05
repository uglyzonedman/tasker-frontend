import { useDispatch, useSelector } from "react-redux";
import { Dispatch, bindActionCreators } from "@reduxjs/toolkit";
import { authZustand } from "../store/auth.zustand";
import { IAuthState } from "../interfaces/auth.interface";

export const useGetStoreLocal = (name: string) => {
  if (typeof window !== "undefined") {
    const ls = localStorage.getItem(name);
    return ls ? JSON.parse(ls) : null;
  }
  return null;
};

export const useTypedDispatch = () => useDispatch<Dispatch>();

export const useAuth: any = () => authZustand((state: IAuthState) => state);

export const useGetDaysUntilTask = (dateString: string): string => {
  const taskDate = new Date(dateString);
  const currentDate = new Date();

  const timeDiff = taskDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    return "Task overdue";
  } else if (daysDiff <= 3) {
    return "Days left until the task: " + daysDiff;
  } else {
    const options: any = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = taskDate.toLocaleDateString("ru-RU", options);
    return "Task date: " + formattedDate;
  }
};
