import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSideBar } from "../store/slices/sideBarToggleSlice";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const movieId = searchParams.get("v");
  const sideBarFlag = useSelector((state) => state.sidebar.isSidebarOpen);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(closeSideBar());
  }, []);
  return (
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
    </div>
  );
};

export default WatchPage;
