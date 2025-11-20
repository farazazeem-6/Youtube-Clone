import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    nextPageToken: null,
  },
  reducers: {
    addPopularMovies: (state, action) => {
      const { items, nextPageToken } = action.payload;
      state.popularMovies = [...state.popularMovies, ...items];
      state.nextPageToken = nextPageToken || null;
    },
  },
});
export default movieSlice.reducer;
export const { addPopularMovies } = movieSlice.actions;
