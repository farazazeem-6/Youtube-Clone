import React, { useEffect } from "react";
import { API_KEY, YOUTUBE_POPULAR_VIDEOS_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../store/slices/moviesSlice";

const useFetchPopularVideos = () => {
  const dispatch = useDispatch();
  const fetchPopularVideos = async () => {
    const data = await fetch(YOUTUBE_POPULAR_VIDEOS_API + API_KEY);
    const json = await data.json();
    dispatch(addPopularMovies(json));
  };
  useEffect(() => {
    fetchPopularVideos();
  }, []);
  return null;
};

export default useFetchPopularVideos;
