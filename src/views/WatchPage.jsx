import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../store/slices/sideBarToggleSlice";
import { useSearchParams } from "react-router-dom";
import { formatViews } from "../utils/constants";
import SuggestionPage from "./SuggestionPage";
import { useComments } from "../hooks/useFetchComments";
import CommentsList from "./CommentsList";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("v");
  const sideBarFlag = useSelector((state) => state.sidebar.isSidebarOpen);

  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const searchResults = useSelector((state) => state.search.searchResults);
  // if (searchResults) console.log(searchResults);

  //Find the movie matching the ID
  let currentVideo = popularMovies.find((movie) => movie.id === movieId);

  // If not found in popularMovies, check searchResults
  if (!currentVideo) {
    currentVideo = searchResults.find((movie) => {
      // Search API returns id.videoId, Popular API returns just id
      const videoIdFromSearch = movie.id?.videoId || movie.id;
      return videoIdFromSearch === movieId;
    });
  }

  // Extract channel ID
  const channelId = currentVideo?.snippet?.channelId;
  const videoTitle = currentVideo?.snippet?.title;
  const videoLikes = currentVideo?.statistics?.likeCount;

  // if (channelId) {
  //   console.log(channelId);
  //   console.log(videoTitle);

  // } else {
  //   console.log("no channel id found");
  // }
  // here i find that particular channel data and the particular video data also from store  because now i have channel id
  const channelInfo = useSelector((state) => state.channel.channels[channelId]);

  // if(channelData)console.log(channelData);

  // extract the data we want from that channel api data
  const channelAvatar = channelInfo?.snippet?.thumbnails?.medium?.url;
  const channelPublishedDate = channelInfo?.snippet?.publishedAt;
  const channelTitle = channelInfo?.snippet?.title;
  const channelSubscriber = channelInfo?.statistics?.subscriberCount;

  // calling comments hook
  useComments(movieId);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar());
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);
  return (
    <div className="flex gap-6">
      <div className={`${sideBarFlag ? "pl-2" : "pl-30"}`}>
        <div className=" rounded-2xl overflow-hidden w-[800px] h-[450px]">
          <iframe
            width="800"
            height="450"
            className="w-full h-full rounded-2xl"
            src={`https://www.youtube.com/embed/${movieId}?si=GXl76taUpWIp4fFh`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-sm text-black font-bold py-2 px-2">{videoTitle}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img className="w-10 rounded-full" src={channelAvatar} alt="" />
            <div>
              <p className="text-[12px] font-bold">{channelTitle}</p>
              <p className="text-[11px]">
                {formatViews(channelSubscriber)} subscribers
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-gray-200 px-2 rounded-xl text-[12px] flex items-center gap-2">
              <i className="ri-thumb-up-line text-lg"></i>{" "}
              {formatViews(videoLikes || 124453)} |{" "}
              <i className="ri-thumb-down-line text-lg"></i>
            </button>
            <button className="bg-gray-200 px-2 rounded-xl text-[12px] flex items-center gap-2">
              <i className="ri-share-forward-line text-lg"></i> Share
            </button>
            <button className="bg-gray-200 px-2 rounded-xl text-[12px] flex items-center gap-2">
              <i className="ri-download-line text-lg"></i> Download
            </button>
            <button className="bg-gray-200 px-2 rounded-xl text-[12px] flex items-center gap-2">
              <i className="ri-more-line text-lg"></i>
            </button>
          </div>
        </div>
        <div className="mt-4">
          <CommentsList  videoId={movieId}/>
        </div>
      </div>
      <div className="max-w-[290px]">
        <SuggestionPage />
      </div>
    </div>
  );
};

export default WatchPage;
