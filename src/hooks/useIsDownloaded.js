// hooks/useIsDownloaded.js
import { useSelector } from 'react-redux';

/**
 * Custom hook to check if a video is already downloaded
 * @param {string} videoId - The YouTube video ID
 * @returns {boolean} - True if video is downloaded, false otherwise
 */
export const useIsDownloaded = (videoId) => {
  return useSelector(state => !!state.downloads.downloadedVideos[videoId]);
};

/**
 * Custom hook to get download info for a video
 * @param {string} videoId - The YouTube video ID
 * @returns {object|null} - Download data if exists, null otherwise
 */
export const useDownloadInfo = (videoId) => {
  return useSelector(state => state.downloads.downloadedVideos[videoId] || null);
};

/**
 * Custom hook to get all downloaded videos
 * @returns {array} - Array of all downloaded videos
 */
export const useAllDownloads = () => {
  const downloadsObj = useSelector(state => state.downloads.downloadedVideos);
  return Object.values(downloadsObj).sort((a, b) => 
    new Date(b.downloadedAt) - new Date(a.downloadedAt)
  );
};

/**
 * Custom hook to get downloads count
 * @returns {number} - Total number of downloads
 */
export const useDownloadsCount = () => {
  const downloadsObj = useSelector(state => state.downloads.downloadedVideos);
  return Object.keys(downloadsObj).length;
};