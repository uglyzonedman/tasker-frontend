import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthService } from "../components/services/auth.service";
import { IAuthRegister } from "../interfaces/auth.interface";

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password, login }: IAuthRegister) => {
    try {
      const res = await AuthService.register(email, password, login);
      return res;
    } catch (error) {
      alert("error", error.message);
    }
  }
);
