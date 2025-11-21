import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    nextPageToken: null,
    isLoading: false,
  },
  reducers: {
    addPopularMovies: (state, action) => {
      const { items, nextPageToken } = action.payload;
      state.popularMovies = [...state.popularMovies, ...items];
      state.nextPageToken = nextPageToken || null;
       state.isLoading = false;
    },
       setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});
export default movieSlice.reducer;
export const { addPopularMovies,setLoading } = movieSlice.actions;
