import { createSlice } from "@reduxjs/toolkit";

const loadHistory = () => {
  try {
    const saved = localStorage.getItem("videoHistory");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Error loading history:", error);
    return {};
  }
};

const historySlice = createSlice({
  name: "history",
  initialState: {
    watchedVideos: loadHistory(), // { videoId: videoData }
  },
  reducers: {
    addToHistory: (state, action) => {
      const { videoId, videoData } = action.payload;
      
      // Add/Update video in history with current timestamp
      state.watchedVideos[videoId] = {
        ...videoData,
        watchedAt: new Date().toISOString(),
      };

      try {
        localStorage.setItem(
          "videoHistory",
          JSON.stringify(state.watchedVideos)
        );
      } catch (error) {
        console.error("Error saving history:", error);
      }
    },

    removeFromHistory: (state, action) => {
      const videoId = action.payload;
      
      delete state.watchedVideos[videoId];

      try {
        localStorage.setItem(
          "videoHistory",
          JSON.stringify(state.watchedVideos)
        );
      } catch (error) {
        console.error("Error saving history:", error);
      }
    },

    clearAllHistory: (state) => {
      state.watchedVideos = {};
      localStorage.removeItem("videoHistory");
    },
  },
});

export const { addToHistory, removeFromHistory, clearAllHistory } =
  historySlice.actions;

export default historySlice.reducer;