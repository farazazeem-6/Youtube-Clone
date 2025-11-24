import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    storeComments: {},
    isLoading: false,
  },
  reducers: {
    addComments: (state, action) => {
      const { videoId, data } = action.payload;
      // Store comments with videoId as key
      state.storeComments[videoId] = data;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { addComments, setLoading } = commentsSlice.actions;
export default commentsSlice.reducer;