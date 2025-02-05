import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.baseURL = "https://rent-apartment-l6ss.onrender.com/";
export const fetchAllApartment = createAsyncThunk(
  "apartment/fetchAll",
  async (queryParams = {}, thunkAPI) => {
    try {
      const response = await axios.get("/", { params: queryParams });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const deleteApartment = createAsyncThunk(
  "apartment/deleteApartment",
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addApartment = createAsyncThunk(
  "apartment/addApartment",
  async (apartmentData, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("title", apartmentData.title);
      formData.append("price", apartmentData.price);
      formData.append("description", apartmentData.description);
      formData.append("rooms", apartmentData.rooms);
      formData.append("location", apartmentData.location);
      formData.append("floor", apartmentData.floor);
      formData.append("square", apartmentData.square);
      apartmentData.photo.forEach((file) => {
        formData.append("photo", file);
      });
      const response = await axios.post("/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
