import React, { useEffect, useRef, useState } from "react";
import NavButton from "../components/NavButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const ButtonTypes = [
  "All",
  "Music",
  "Comdedy Clubs",
  "Podcast",
  "Mixes",
  "News",
  "Web Development",
  "Roasts",
  "Pakistan national cricket team",
  "Live",
  "Game shows",
  "History",
  "Web series",
  "Indian pop music",
  "Gaming",
  "Drama",
  "Data Structures",
  "Qawwali music",
  "Recently uplaoded",
  "Watched",
  "New to you",
];
const ButtonList = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Check scroll position and update arrow visibility
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      // Show left arrow if not at the start
      setShowLeftArrow(scrollLeft > 0);

      // Show right arrow if not at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  // Check scroll position on mount and scroll
  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScrollPosition);
      // Also check on resize
      window.addEventListener("resize", checkScrollPosition);

      return () => {
        scrollContainer.removeEventListener("scroll", checkScrollPosition);
        window.removeEventListener("resize", checkScrollPosition);
      };
    }
  }, []);
  return (
    <div className="sticky top-[52px] bg-white z-10 pb-3 pt-3">
      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute -left-2 bottom-1 h-full w-6  z-10 flex items-center justify-start cursor-pointer"
          aria-label="Scroll left"
        >
          <div className="bg-white rounded-full p-1 hover:bg-gray-200">
            <ChevronLeftIcon fontSize="small" />
          </div>
        </button>
      )}

      {/* Scrollable Container */}
      <div ref={scrollContainerRef} className="overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 px-2">
          {ButtonTypes.map((name, index) => (
            <NavButton key={name} name={name} />
          ))}
        </div>
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute -right-2 bottom-1 h-full w-6  z-10 flex items-center justify-end cursor-pointer"
          aria-label="Scroll right"
        >
          <div className="bg-white rounded-full p-1 hover:bg-gray-200">
            <ChevronRightIcon fontSize="small" />
          </div>
        </button>
      )}
    </div>
  );
};

export default ButtonList;