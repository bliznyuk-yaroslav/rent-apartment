import { createSlice } from "@reduxjs/toolkit";
import {  fetchApartmentId } from "./operation";
const initialState = {
  
    apartmentId: {},
    isLoading: false,
    error: null,
 
};
const apartmentIdSlice = createSlice({
  name: "apartmentId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartmentId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchApartmentId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.apartmentId = action.payload.data;
      })
      .addCase(fetchApartmentId.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.apartmentId = {};
      })
     
  },
});
export const apartmentIdReducer = apartmentIdSlice.reducer;
