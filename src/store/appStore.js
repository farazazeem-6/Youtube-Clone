import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sideBarToggleSlice";
import moviesReducer from "../store/slices/moviesSlice";

const appStore = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    movies: moviesReducer,
  },
});
export default appStore;
