import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../store/slices/sideBarToggleSlice";
import { useSearchParams } from "react-router-dom";
import { formatViews } from "../utils/constants";
import SuggestionPage from "./SuggestionPage";
import { useComments } from "../hooks/useFetchComments";
import CommentsList from "./CommentsList";
import { useChannel } from "../hooks/useFetchChannels";
import SubscribeButton from "../components/SubscribeButton";
import { addToHistory } from "../store/slices/historySlice";
import LikeButton from "../components/LikeButton";
import WatchLaterButton from "../components/WatchLaterButton";
import useFetchSingleVideoData from "../hooks/useFetchSingleVideoData";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("v");
  const sideBarFlag = useSelector((state) => state.sidebar.isSidebarOpen);

  const popularMovies = useSelector((state) => state.movies.popularMovies);
  const searchResults = useSelector((state) => state.search.searchResults);
  const categoryMovies = useSelector((state) => state.movies.categoryMovies);

  // Find the movie matching the ID
  let currentVideo = popularMovies.find((movie) => movie.id === movieId);

  // If not found in popularMovies, check categoryMovies
  if (!currentVideo) {
    currentVideo = categoryMovies.find((movie) => {
      const videoIdFromCategory = movie.id?.videoId || movie.id;
      return videoIdFromCategory === movieId;
    });
  }

  // If still not found, check searchResults
  if (!currentVideo) {
    currentVideo = searchResults.find((movie) => {
      const videoIdFromSearch = movie.id?.videoId || movie.id;
      return videoIdFromSearch === movieId;
    });
  }
  if (!currentVideo) {
    const { data, loading, error } = useFetchSingleVideoData(movieId);
    // data? console.log(data):console.log('no data found');
    currentVideo = data;
  }

  // Extract channel ID
  const channelId = currentVideo?.snippet?.channelId;

  const videoTitle = currentVideo?.snippet?.title;
  const videoLikes = currentVideo?.statistics?.likeCount;

  // Fetch channel data
  useChannel(channelId);
  const channelInfo = useSelector((state) => state.channel.channels[channelId]);

  // Extract channel data
  const channelAvatar = channelInfo?.snippet?.thumbnails?.medium?.url;
  const channelPublishedDate = channelInfo?.snippet?.publishedAt;
  const channelTitle = channelInfo?.snippet?.title;
  const channelSubscriber = channelInfo?.statistics?.subscriberCount;

  // Calling comments hook
  useComments(movieId);

  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(closeSideBar());
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  // Add video to history when it's played
  useEffect(() => {
    if (currentVideo && movieId) {
      dispatch(
        addToHistory({
          videoId: movieId,
          videoData: {
            id: movieId,
            title: currentVideo.snippet?.title,
            thumbnail:
              currentVideo.snippet?.thumbnails?.medium?.url ||
              currentVideo.snippet?.thumbnails?.default?.url,
            channelTitle: currentVideo.snippet?.channelTitle,
            channelId: currentVideo.snippet?.channelId,
            publishedAt: currentVideo.snippet?.publishedAt,
            description: currentVideo.snippet?.description,
          },
        })
      );
    }
  }, [movieId, currentVideo, dispatch]);

  // Add debugging
  useEffect(() => {
    if (!channelId) {
      console.log("No channelId found for video:", movieId);
      console.log("currentVideo:", currentVideo);
    }
    if (channelInfo) {
      console.log("Channel info loaded:", channelInfo);
    }
  }, [channelId, movieId, currentVideo, channelInfo]);

  return (
    <div className="flex gap-6">
      <div className={`${sideBarFlag ? "pl-3" : "pl-50"} flex-1`}>
        <div className="rounded-2xl overflow-hidden w-[800px] h-[450px]">
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
            {channelAvatar ? (
              <img
                className="rounded-full w-10 h-10"
                src={channelAvatar}
                onError={(e) =>
                  (e.target.src =
                    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?q=80&w=829&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")
                }
                alt=""
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            )}
            <div>
              <p className="text-[12px] font-bold">
                {channelTitle || (
                  <div className="w-18 h-5 rounded-md bg-gray-300"></div>
                )}
              </p>
              <p className="text-[11px]">
                {channelSubscriber
                  ? `${formatViews(channelSubscriber)} subscribers`
                  : ""}
              </p>
            </div>
            <div>
              <SubscribeButton
                channelId={channelId}
                channelInfo={channelInfo}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <LikeButton
              videoId={movieId}
              videoData={{
                title: videoTitle,
                thumbnail:
                  currentVideo?.snippet?.thumbnails?.medium?.url ||
                  currentVideo?.snippet?.thumbnails?.default?.url,
                channelTitle: currentVideo?.snippet?.channelTitle,
                channelId: channelId,
                publishedAt: currentVideo?.snippet?.publishedAt,
                description: currentVideo?.snippet?.description,
              }}
              likeCount={videoLikes}
            />
            <button className="bg-gray-200 px-4 rounded-3xl text-[12px] flex items-center gap-2">
              <i className="ri-thumb-down-line text-lg"></i>
            </button>
            <WatchLaterButton
              videoId={movieId}
              videoData={{
                title: videoTitle,
                thumbnail:
                  currentVideo?.snippet?.thumbnails?.medium?.url ||
                  currentVideo?.snippet?.thumbnails?.default?.url,
                channelTitle: currentVideo?.snippet?.channelTitle,
                channelId: channelId,
                publishedAt: currentVideo?.snippet?.publishedAt,
                description: currentVideo?.snippet?.description,
              }}
            />
            <button className="bg-gray-200 px-4 rounded-full text-[12px] flex items-center gap-2">
              <i className="ri-more-line text-lg"></i>
            </button>
          </div>
        </div>

        {/* Comments section */}
        <div className="mt-4">
          <CommentsList videoId={movieId} />
        </div>
      </div>

      {/* STICKY SUGGESTIONS SIDEBAR */}
      <div className="w-[290px] shrink-0">
        <div className="sticky top-14 max-h-[calc(100vh-2rem)] overflow-y-auto hide-scrollbar">
          <SuggestionPage />
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
