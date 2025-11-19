import React from "react";
import { YOUTUBE_LOGO_PNG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/sideBarToggleSlice";
import Wrapper from "./Wrapper";

const Header = () => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <div className="grid grid-flow-col py-2 items-center">
        <div className="flex items-center col-span-1">
          <i
            onClick={dispatch(toggleSidebar())}
            className="ri-menu-line text-lg cursor-pointer"
          ></i>
          <img className="w-24" src={YOUTUBE_LOGO_PNG} alt="Youtube_Logo" />
        </div>
        <div className="col-span-8 flex justify-center">
          <div className="border border-gray-200 w-[450px] flex rounded-2xl">
            <input
              type="text"
              placeholder="Search"
              className="border border-white rounded-tl-2xl rounded-bl-2xl px-3 text-[14px]  w-[90%] focus:border-blue-800 focus:outline-none"
            />
            <button className="border-l border-gray-200 px-4 bg-gray-50 rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-gray-100">
              <i className="ri-search-line w-[10%] text-lg"></i>
            </button>
          </div>
        </div>
        <div className="col-span-3 flex justify-end">
          <i className="ri-account-circle-line text-2xl cursor-pointer"></i>
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
