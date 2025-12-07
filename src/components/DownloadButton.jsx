// components/DownloadButton.jsx - DEBUG VERSION
import React from 'react';
import { useVideoDownload } from '../hooks/useVideoDownload';
import { useSelector } from 'react-redux';

const DownloadButton = ({ videoId, videoData }) => {
  const { downloading, progress, error, downloadVideo } = useVideoDownload(videoData);
  
  // DEBUG: Log the entire downloads state
  const downloadsState = useSelector(state => state.downloads);
  // console.log('📦 Full Downloads State:', downloadsState);
  // console.log('📦 Downloaded Videos Object:', downloadsState?.downloadedVideos);
  // console.log('🎬 Current Video ID:', videoId);
  // console.log('✅ Is Downloaded?:', !!downloadsState?.downloadedVideos?.[videoId]);
  
  const isDownloaded = useSelector(state => !!state.downloads?.downloadedVideos?.[videoId]);

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDownloaded && !downloading) {
      downloadVideo(videoId);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading || isDownloaded}
        className={`
          relative overflow-hidden
          px-4 py-3 rounded-full font-semibold text-[10px] 
          flex items-center gap-2 
          transition-colors
          ${isDownloaded 
            ? 'bg-green-200 cursor-not-allowed' 
            : downloading 
              ? 'bg-gray-200 cursor-not-allowed' 
              : 'bg-gray-200 hover:bg-gray-300 cursor-pointer'
          }
        `}
      >
        {downloading && (
          <div 
            className="absolute left-0 top-0 h-full bg-blue-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {isDownloaded ? (
            <>
              <i className="ri-check-line"></i>
              Downloaded
            </>
          ) : downloading ? (
            <>
              {progress}%
            </>
          ) : (
            <>
              <i className="ri-download-line"></i>
              Download
            </>
          )}
        </span>
      </button>
      
      {error && (
        <div className="absolute top-full left-0 mt-1 bg-red-500 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
          {error}
        </div>
      )}
    </div>
  );
};

export default DownloadButton;