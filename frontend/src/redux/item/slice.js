import { createSlice } from "@reduxjs/toolkit";
import { fetchApartmentId, updateApartment } from "./operation";
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
      .addCase(updateApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.apartmentId = action.payload;
        console.log("Update successful: ", action.payload);
      })
      .addCase(updateApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
     
  },
});
export const apartmentIdReducer = apartmentIdSlice.reducer;
