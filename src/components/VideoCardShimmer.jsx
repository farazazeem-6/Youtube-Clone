const VideoCardShimmer = () => {
  return (
    <div className="p-2 rounded-2xl my-2 animate-pulse">
      {/* Video Thumbnail Shimmer */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-300">
        <div className="w-full h-full bg-linear-to-r from-gray-300 via-gray-200 to-gray-300 bg-[length:200%_100%] animate-shimmer"></div>
      </div>

      {/* Video Info Shimmer */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar Shimmer */}
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-300"></div>
        </div>

        {/* Video Details Shimmer */}
        <div className="flex-1 min-w-0 space-y-2">
          {/* Video Title Shimmer - 2 lines */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          </div>

          {/* Channel Name Shimmer */}
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>

          {/* Views and Time Shimmer */}
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
