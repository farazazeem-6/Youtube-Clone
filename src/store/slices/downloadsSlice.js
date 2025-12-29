// store/slices/downloadsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadDownloadsFromStorage = () => {
  try {
    const downloads = localStorage.getItem('downloadedVideos');
    return downloads ? JSON.parse(downloads) : {};
  } catch  {
    return {};
  }
};

const downloadsSlice = createSlice({
  name: 'downloads',
  initialState: {
    // Changed structure: { videoId: videoData }
    downloadedVideos: loadDownloadsFromStorage(),
  },
  reducers: {
    addDownload: (state, action) => {
      const { videoId, videoData, downloadedAt } = action.payload;
      
      // Add to downloads with videoId as key
      state.downloadedVideos[videoId] = {
        videoId,
        ...videoData,
        downloadedAt: downloadedAt || new Date().toISOString(),
        downloadSize: videoData.fileSize || 'Unknown',
      };
      
      // Save to localStorage
      localStorage.setItem('downloadedVideos', JSON.stringify(state.downloadedVideos));
    },
    
    removeDownload: (state, action) => {
      const videoId = action.payload;
      delete state.downloadedVideos[videoId];
      localStorage.setItem('downloadedVideos', JSON.stringify(state.downloadedVideos));
    },
    
    clearAllDownloads: (state) => {
      state.downloadedVideos = {};
      localStorage.removeItem('downloadedVideos');
    },
  },
});

export const { addDownload, removeDownload, clearAllDownloads } = downloadsSlice.actions;
export default downloadsSlice.reducer;