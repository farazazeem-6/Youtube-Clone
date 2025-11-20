
const SideBarButton = ({ name, img }) => {
  return (
    <div className="flex items-center gap-5 rounded-lg px-3 py-1.5 mb-1 mr-2 hover:cursor-pointer hover:bg-gray-100">
      <img className="w-5" src={img} alt={name} />
      <button className="text-[10px]">{name}</button>
    </div>
  );
};

export default SideBarButton;
