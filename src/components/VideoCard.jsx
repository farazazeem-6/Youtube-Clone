import React from "react";
import { formatViews } from "../utils/constants";

const VideoCard = ({ info }) => {
  if (!info) return;
  const { snippet, statistics } = info;
  // console.log(snippet);
  // console.log(statistics);
  const { channelTitle, title, thumbnails } = snippet;
  const { viewCount, likeCount } = statistics;

  return (
    <div className="p-2 transition-all ease-in-out duration-500 cursor-pointer hover:bg-gray-200 rounded-2xl my-2">
      <img
        className="rounded-xl w-full"
        src={thumbnails.medium.url}
        alt={title}
      />
      <p className="font-semibold flex flex-wrap px-2 my-1 text-sm">{title}</p>
      <div className="flex gap-1">
        <p className="text-[12px] pl-2">{channelTitle}</p>
        <p className="pl-2 text-[12px]">{formatViews(viewCount)} views</p>
      </div>
    </div>
  );
};

export default VideoCard;
