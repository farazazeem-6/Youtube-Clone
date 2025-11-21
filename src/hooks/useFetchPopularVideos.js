import React, { useEffect } from "react";
import { API_KEY, YOUTUBE_POPULAR_VIDEOS_API } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies, setLoading } from "../store/slices/moviesSlice";

const useFetchPopularVideos = () => {
  const dispatch = useDispatch();
  dispatch(setLoading(true));
  const fetchPopularVideos = async () => {
    try {
      const data = await fetch(YOUTUBE_POPULAR_VIDEOS_API + API_KEY);
      const json = await data.json();
      dispatch(addPopularMovies(json));
    } catch (error) {
      console.error(error);
      dispatch(setLoading(false)); // ✨ Set to false on error
    }
  };
  useEffect(() => {
    fetchPopularVideos();
  }, []);
  return null;
};

export default useFetchPopularVideos;
