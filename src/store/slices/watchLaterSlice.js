import { createSlice } from "@reduxjs/toolkit";

// Load watch later videos from localStorage on init
const loadWatchLater = () => {
  try {
    const saved = localStorage.getItem("watchLater");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Error loading watch later:", error);
    return {};
  }
};

const watchLaterSlice = createSlice({
  name: "watchLater",
  initialState: {
    watchLaterVideos: loadWatchLater(), // { videoId: videoData }
  },
  reducers: {
    addToWatchLater: (state, action) => {
      const { videoId, videoData } = action.payload;
      
      // Add video to watch later list with current timestamp
      state.watchLaterVideos[videoId] = {
        ...videoData,
        addedAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        localStorage.setItem(
          "watchLater",
          JSON.stringify(state.watchLaterVideos)
        );
      } catch (error) {
        console.error("Error saving watch later:", error);
      }
    },

    removeFromWatchLater: (state, action) => {
      const videoId = action.payload;
      
      delete state.watchLaterVideos[videoId];

      // Update localStorage
      try {
        localStorage.setItem(
          "watchLater",
          JSON.stringify(state.watchLaterVideos)
        );
      } catch (error) {
        console.error("Error saving watch later:", error);
      }
    },

    clearAllWatchLater: (state) => {
      state.watchLaterVideos = {};
      localStorage.removeItem("watchLater");
    },
  },
});

export const { addToWatchLater, removeFromWatchLater, clearAllWatchLater } =
  watchLaterSlice.actions;

export default watchLaterSlice.reducer;