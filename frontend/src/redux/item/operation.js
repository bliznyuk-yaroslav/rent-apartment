import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://rent-apartment-l6ss.onrender.com/";
export const fetchApartmentId = createAsyncThunk(
  "/apartment/fetchApartmentId",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.get(`/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateApartment = createAsyncThunk(
  "/apartment/updateApartment",
  async ({ _id, formData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/${_id}`, formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

