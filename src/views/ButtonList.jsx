import React from "react";
import NavButton from "../components/NavButton";

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
  return (
    <div className="overflow-x-auto pb-3 hide-scrollbar sticky top-0 bg-white z-10">
      <div className="flex gap-2">
        {ButtonTypes.map((name, index) => (
          <NavButton key={index} name={name} />
        ))}
      </div>
    </div>
  );
};

export default ButtonList;
