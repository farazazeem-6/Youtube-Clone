import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sideBarToggleSlice";
import moviesReducer from "../store/slices/moviesSlice";
import channelReducer from "../store/slices/channelSlice";
import searchReducer from "./slices/searchSlice";

const appStore = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    movies: moviesReducer,
    channel: channelReducer,
    search: searchReducer,
  },
});
export default appStore;
