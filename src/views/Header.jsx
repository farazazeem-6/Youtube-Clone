import { YOUTUBE_LOGO_PNG } from "../utils/constants";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../store/slices/sideBarToggleSlice";
import Wrapper from "../components/Wrapper";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const navigate = useNavigate();
  // const inputValue = searchRef.current.value;

  const handleSearchButton = () => {
    const inputValue = searchRef.current?.value || ""; // safe access
    if (inputValue.trim()) {
      navigate(`/results?search_query=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <Wrapper>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white px-6">
        <div className="grid grid-flow-col py-2 items-center">
          <div className="flex items-center col-span-1">
            <i
              onClick={() => dispatch(toggleSidebar())}
              className="ri-menu-line text-lg cursor-pointer px-2 py-1 rounded-4xl hover:bg-gray-100"
            ></i>
            <img className="w-24" src={YOUTUBE_LOGO_PNG} alt="Youtube_Logo" />
          </div>
          <div className="col-span-8 flex justify-center">
            <div className="flex flex-col">
              <div className="border border-gray-200 w-[450px] flex rounded-2xl">
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search"
                  className="border border-white rounded-tl-2xl rounded-bl-2xl px-3 text-[14px]  w-[90%] focus:border-blue-600 focus:outline-none shadow-inner"
                />
                <button
                  onClick={handleSearchButton}
                  className="border-l border-gray-200 px-4 bg-gray-50 rounded-tr-2xl rounded-br-2xl cursor-pointer hover:bg-gray-100"
                >
                  <i className="ri-search-line w-[10%] text-lg"></i>
                </button>
              </div>
              <div className="max-h-[400px] overflow-y-auto fixed z-50 top-[45px] border border-gray-50 w-[400px] rounded-xl bg-white px-1 shadow-lg">
                <ul>
                  <li className="px-2 py-2 text-[13px] font-bold rounded-lg  m-1 hover:bg-gray-100 cursor-default">
                    <i className="ri-search-line pr-2 text-sm"></i> Iphone
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-span-3 flex justify-end">
            <i className="ri-account-circle-line text-2xl cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div className="h-14" /> {/* height = header height */}
    </Wrapper>
  );
};

export default Header;
