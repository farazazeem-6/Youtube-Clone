import { createSlice } from "@reduxjs/toolkit";

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    isSidebarOpen: true,
  },
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSideBar: (state) => {
      state.isSidebarOpen = false;
    },
  },
});

export const { toggleSidebar,closeSideBar } = sideBarSlice.actions;
export default sideBarSlice.reducer;
