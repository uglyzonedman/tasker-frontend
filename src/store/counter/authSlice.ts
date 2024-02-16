import { register } from "@/src/actions/auth.action";
import { useGetStoreLocal } from "@/src/hooks/hooks";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: useGetStoreLocal("user"),
  isLoading: false,
  setAuth: false,
  accessToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});
export const authReducer = authSlice.reducer;
