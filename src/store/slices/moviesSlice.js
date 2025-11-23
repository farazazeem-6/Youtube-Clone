// moviesSlice.js
import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    popularMovies: [],
    popularNextPageToken: null,
    categoryMovies: [],
    categoryNextPageToken: null,
    isLoading: false,
  },
  reducers: {
    addPopularMovies: (state, action) => {
      const { items = [], nextPageToken } = action.payload;
      state.popularMovies = [...state.popularMovies, ...items];
      state.popularNextPageToken = nextPageToken || null;
      state.isLoading = false;
    },

    setCategoryMovies: (state, action) => {
      const { items = [], nextPageToken } = action.payload;
      state.categoryMovies = items;
      state.categoryNextPageToken = nextPageToken || null;
      state.isLoading = false;
    },

    addMoreCategoryMovies: (state, action) => {
      const { items = [], nextPageToken } = action.payload;
      state.categoryMovies = [...state.categoryMovies, ...items];
      state.categoryNextPageToken = nextPageToken || null;
      state.isLoading = false;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    resetPopularMovies: (state) => {
      state.popularMovies = [];
      state.popularNextPageToken = null;
    },

    resetCategoryMovies: (state) => {
      state.categoryMovies = [];
      state.categoryNextPageToken = null;
    },
  },
});

export default movieSlice.reducer;
export const {
  addPopularMovies,
  setCategoryMovies,
  addMoreCategoryMovies,
  setLoading,
  resetPopularMovies,
  resetCategoryMovies,
} = movieSlice.actions;