import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk(
  "user/fetchAll",
  async (params, thunkApi) => {
    try {
      const users = (
        await axios.get("https://jsonplaceholder.typicode.com/users")
      ).data;
      return users;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
