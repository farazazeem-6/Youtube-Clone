// components/DownloadButton.jsx
import React from 'react';
import { useVideoDownload } from '../hooks/useVideoDownload';

const DownloadButton = ({ videoId, videoData }) => {
  const { downloading, progress, error, downloadVideo } = useVideoDownload(videoData);

  const handleDownload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    downloadVideo(videoId);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={`
          relative overflow-hidden
          bg-gray-200 px-4 py-3 rounded-full font-semibold text-[10px] 
          flex items-center gap-2 
          hover:bg-gray-300 transition-colors
          ${downloading ? 'cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        {downloading && (
          <div 
            className="absolute left-0 top-0 h-full bg-gray-400 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        )}
        
        <span className="relative z-10 flex items-center gap-2">
          {downloading ? (
            <>
              {/* <i className="ri-loader-4-line animate-spin"></i> */}
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