import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { fetchUser } from "./user.actions";

const initialState = {
  lng: "en",
  themeSetting: "light",
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    changeTheme: (state, action: PayloadAction<string>) => {
      state.themeSetting = action.payload;
    },
    changeLocal: (state, action: PayloadAction<string>) => {
      state.lng = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default userSlice;
export const { changeTheme, changeLocal } = userSlice.actions;
