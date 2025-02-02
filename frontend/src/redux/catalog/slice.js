import { createSlice } from "@reduxjs/toolkit";
import { fetchAllApartment } from "./operation";
const initialState = {
  apartment: [],
  isLoading: false,
  error: null,
};
const catalogSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllApartment.fulfilled, (state, action) => {
        console.log("Received data:", action.payload);
        state.isLoading = false;
        state.error = null;
        state.apartment = action.payload.data;
        console.log(action.payload.data);
      })
      .addCase(fetchAllApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.apartment = [];
      });
  },
});
export const apartmentReducer = catalogSlice.reducer;
