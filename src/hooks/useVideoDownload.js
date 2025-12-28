// hooks/useVideoDownload.js
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addDownload } from "../store/slices/downloadsSlice";

const API_BASE = "http://localhost:5000/api";

export const useVideoDownload = (videoData) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const downloadVideo = async (videoId) => {
    // console.log("🎬 downloadVideo called with videoId:", videoId);
    // console.log("📦 videoData received:", videoData);

    setDownloading(true);
    setProgress(0);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoId, quality: "best" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          try {
            const data = JSON.parse(line);

            if (data.type === "progress") {
              setProgress(Math.round(data.progress));
            } else if (data.type === "complete") {
              if (data.success) {
                setProgress(100);

                const baseURL = API_BASE.replace("/api", "");
                const downloadURL = `${baseURL}${data.downloadUrl}`;

                // Create temporary link and trigger download
                const link = document.createElement("a");
                link.href = downloadURL;
                link.download = data.filename || "video.mp4";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // SAVE TO REDUX STORE - THIS WAS MISSING!
                // console.log("💾 Saving to Redux with videoId:", videoId);
                // console.log("💾 VideoData being saved:", videoData);
                dispatch(
                  addDownload({
                    videoId: videoId,
                    videoData: {
                      ...videoData,
                      filename: data.filename,
                    },
                    downloadedAt: new Date().toISOString(),
                  })
                );

                // Reset after 2 seconds
                setTimeout(() => {
                  setDownloading(false);
                  setProgress(0);
                }, 2000);
              } else {
                throw new Error(data.error || "Download failed");
              }
            } else if (data.type === "error") {
              throw new Error(data.error || "An error occurred");
            }
          } catch (parseError) {
            console.error("Parse error:", parseError);
          }
        }
      }
    } catch (err) {
      console.error("Download error:", err);
      setError(err.message);
      setDownloading(false);
      setProgress(0);
    }
  };

  const reset = () => {
    setDownloading(false);
    setProgress(0);
    setError(null);
  };

  return {
    downloading,
    progress,
    error,
    downloadVideo,
    reset,
  };
};
