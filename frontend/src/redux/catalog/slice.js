import { createSlice } from "@reduxjs/toolkit";
import { deleteApartment, fetchAllApartment, addApartment } from "./operation";
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
        state.isLoading = false;
        state.error = null;
        state.apartment = action.payload.data;
      })
      .addCase(fetchAllApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.apartment = [];
      })
      .addCase(deleteApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.apartment = state.apartment.filter(
          (apartments) => apartments._id !== action.payload._id
        );
        console.log(state.apartment);
      })
      .addCase(deleteApartment.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      .addCase(addApartment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addApartment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.apartment.push(action.payload.data);
      })
      .addCase(addApartment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const apartmentReducer = catalogSlice.reducer;
