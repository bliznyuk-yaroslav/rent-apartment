import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://rent-apartment-l6ss.onrender.com/";
export const fetchAllApartment = createAsyncThunk(
  "/apartment/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
