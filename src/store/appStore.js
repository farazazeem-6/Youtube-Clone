import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/slices/sideBarToggleSlice";
import moviesReducer from "../store/slices/moviesSlice";
import channelReducer from "../store/slices/channelSlice";
import searchReducer from "./slices/searchSlice";
import filterReducer from "./slices/filterSlice";


const appStore = configureStore({
  reducer: {
    sidebar: sideBarReducer,
    movies: moviesReducer,
    filter: filterReducer,
    channel: channelReducer,
    search: searchReducer,
  },
});
export default appStore;
