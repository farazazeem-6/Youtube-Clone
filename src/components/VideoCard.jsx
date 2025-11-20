import { useSelector } from "react-redux";
import { useChannel } from "../hooks/useFetchChannels";
import { formatViews, timeAgo } from "../utils/constants";

const VideoCard = ({ info }) => {
  if (!info) return;
  const { snippet, statistics } = info;
  // console.log(snippet);
  // console.log(statistics);
  const { channelTitle, title, thumbnails, channelId } = snippet;
  const { viewCount, likeCount } = statistics;
  const channelInfo = useSelector((state) => state.channel.channels[channelId]);
  // console.log(channelInfo);
  console.log(channelId);
  
  useChannel(channelId);
  return (
    <div className="p-2 transition-all ease-in-out duration-500 cursor-pointer hover:bg-gray-200 rounded-2xl my-2">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-300">
        <img
          className="w-full h-full object-cover"
          src={thumbnails.medium.url}
          alt={title}
        />
      </div>

      <div className="flex gap-3 mt-3">
        <div className="shrink-0">
          <img
            className="w-9 h-9 rounded-full"
            src={channelInfo?.snippet?.thumbnails?.medium?.url}
            alt=""
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm leading-5 line-clamp-2 mb-1">
            {title}
          </h3>

          <p className="text-xs text-gray-600 truncate mb-1">{channelTitle}</p>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>{formatViews(viewCount)} views</span>
            <span>•</span>
            <span>{timeAgo(channelInfo?.snippet?.publishedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
