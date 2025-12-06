// store/slices/downloadsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadDownloadsFromStorage = () => {
  try {
    const downloads = localStorage.getItem('downloadedVideos');
    return downloads ? JSON.parse(downloads) : [];
  } catch (error) {
    return [];
  }
};

const downloadsSlice = createSlice({
  name: 'downloads',
  initialState: {
    downloadedVideos: loadDownloadsFromStorage(),
  },
  reducers: {
    addDownload: (state, action) => {
      const { videoId, videoData, downloadedAt } = action.payload;
      
      // Check if already exists
      const exists = state.downloadedVideos.find(v => v.videoId === videoId);
      if (!exists) {
        state.downloadedVideos.unshift({
          videoId,
          ...videoData,
          downloadedAt: downloadedAt || new Date().toISOString(),
          downloadSize: videoData.fileSize || 'Unknown',
        });
        
        // Save to localStorage
        localStorage.setItem('downloadedVideos', JSON.stringify(state.downloadedVideos));
      }
    },
    
    removeDownload: (state, action) => {
      state.downloadedVideos = state.downloadedVideos.filter(
        v => v.videoId !== action.payload
      );
      localStorage.setItem('downloadedVideos', JSON.stringify(state.downloadedVideos));
    },
    
    clearAllDownloads: (state) => {
      state.downloadedVideos = [];
      localStorage.removeItem('downloadedVideos');
    },
  },
});

export const { addDownload, removeDownload, clearAllDownloads } = downloadsSlice.actions;
export default downloadsSlice.reducer;