import { createSelector, createSlice } from "@reduxjs/toolkit";
import { deleteApartment, fetchAllApartment } from "./operation";
import { selectorAllApartment } from "./selector";
import {
  selectLocationFilter,
  selectPriceFilter,
  selectRoomFilter,
} from "../Filter/slice";
const initialState = {
  apartment: [],
  isLoading: false,
  error: null,
};
const catalogSlice = createSlice({
  name: "apartment",
  initialState,
  reducers: {
  },
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
      });
  },
});
export const { setLocations } = catalogSlice.actions;
export const selectFilteredApartment = createSelector(
  [
    selectorAllApartment,
    selectPriceFilter,
    selectRoomFilter,
    selectLocationFilter,
  ],
  (apartment, priceFilter, roomFilter, locationFilter) => {
    return apartment.filter((apartments) => {
      const matchPrice = priceFilter ? apartments.price <= priceFilter : true;
      const matchRooms = roomFilter
        ? apartments.rooms <= parseInt(roomFilter, 10)
        : true;
      const matchLocation = locationFilter
        ? apartments.location
            .toLowerCase()
            .includes(locationFilter.toLowerCase())
        : true;
      return matchRooms && matchPrice && matchLocation;
    });
  }
);
export const apartmentReducer = catalogSlice.reducer;
