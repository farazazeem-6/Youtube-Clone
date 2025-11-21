// src/store/slices/searchSlice.js
import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    searchQuery: "",
    isLoading: false,
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setSearchResults, setSearchQuery, setLoading } = searchSlice.actions;
export default searchSlice.reducer;
