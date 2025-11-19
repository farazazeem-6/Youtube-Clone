import React from "react";

const SideBarButton = ({ name, img }) => {
  return (
    <div className="flex items-center bg-gray-100 gap-5 rounded-lg px-3 py-[6px] mb-1 mr-2">
      <img className="w-5" src={img} alt={name} />
      <button className="text-[10px]">{name}</button>
    </div>
  );
};

export default SideBarButton;
