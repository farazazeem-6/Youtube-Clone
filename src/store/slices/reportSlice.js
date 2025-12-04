import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportedVideos: {}, // Store as object with videoId as key
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {
    reportVideo: (state, action) => {
      const { videoId, videoData, reason, reasonTitle, description, reportedAt } = action.payload;
      
      state.reportedVideos[videoId] = {
        id: videoId,
        ...videoData,
        reason,
        reasonTitle,
        description,
        reportedAt: reportedAt || new Date().toISOString(),
      };
    },
    
    removeReport: (state, action) => {
      const videoId = action.payload;
      delete state.reportedVideos[videoId];
    },
    
    clearAllReports: (state) => {
      state.reportedVideos = {};
    },
  },
});

export const { reportVideo, removeReport, clearAllReports } = reportSlice.actions;
export default reportSlice.reducer;