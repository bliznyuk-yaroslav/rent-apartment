import { createSlice } from "@reduxjs/toolkit";
const filterSlice = createSlice({
  name: "filters",
  initialState: {
    price: "",
    rooms: "",
    location: "",
  },
  reducers: {
    changeFilter: (state, action) => {
      state.price = action.payload;
    },
    changeRoomFilter: (state, action) => {
      state.rooms = action.payload;
    },
    changeLocationFilter: (state, action) => {
      state.location = action.payload;
    },
  },
});
export const { changeFilter, changeRoomFilter, changeLocationFilter } =
  filterSlice.actions;
export const selectPriceFilter = (state) => state.filters.price;
export const selectRoomFilter = (state) => state.filters.rooms;
export const selectLocationFilter = (state) => state.filters.location;
export const filterReducer = filterSlice.reducer;
