import { configureStore } from "@reduxjs/toolkit";
import sideBarReducer from "../store/sideBarToggleSlice";

const appStore = configureStore({
  reducer: {
    sidebar: sideBarReducer,
  },
});
export default appStore