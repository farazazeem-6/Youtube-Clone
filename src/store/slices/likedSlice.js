import { createSlice } from "@reduxjs/toolkit";

const loadLikedVideos = () => {
  try {
    const saved = localStorage.getItem("likedVideos");
    return saved ? JSON.parse(saved) : {};
  } catch (error) {
    console.error("Error loading liked videos:", error);
    return {};
  }
};

const likedSlice = createSlice({
  name: "liked",
  initialState: {
    likedVideos: loadLikedVideos(), // { videoId: videoData }
  },
  reducers: {
    likeVideo: (state, action) => {
      const { videoId, videoData } = action.payload;
      
      // Add video to liked list with current timestamp
      state.likedVideos[videoId] = {
        ...videoData,
        likedAt: new Date().toISOString(),
      };

      // Save to localStorage
      try {
        localStorage.setItem(
          "likedVideos",
          JSON.stringify(state.likedVideos)
        );
      } catch (error) {
        console.error("Error saving liked videos:", error);
      }
    },

    unlikeVideo: (state, action) => {
      const videoId = action.payload;
      
      delete state.likedVideos[videoId];

      // Update localStorage
      try {
        localStorage.setItem(
          "likedVideos",
          JSON.stringify(state.likedVideos)
        );
      } catch (error) {
        console.error("Error saving liked videos:", error);
      }
    },

    clearAllLikedVideos: (state) => {
      state.likedVideos = {};
      localStorage.removeItem("likedVideos");
    },
  },
});

export const { likeVideo, unlikeVideo, clearAllLikedVideos } =
  likedSlice.actions;

export default likedSlice.reducer;