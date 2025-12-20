import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../store/slices/filterSlice";

const NavButton = ({ name }) => {
  const dispatch = useDispatch();
  const activeCategory = useSelector((state) => state.filter.category);
  const isActive = activeCategory === name;

  const handleClick = () => {
    dispatch(setCategory(name));
  };

  return (
    <button
      onClick={handleClick}
      className={`py-1 px-3 text-[11px] rounded-md cursor-pointer whitespace-nowrap shrink-0 ${
        isActive ? "bg-black text-white" : "bg-gray-50 hover:bg-gray-200"
      }`}
    >
      {name}
    </button>
  );
};

export default NavButton;
