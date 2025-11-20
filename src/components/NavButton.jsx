// NavButton Component
const NavButton = ({ name }) => {
  return (
    <button className="py-1 px-3 bg-gray-50 text-[11px] rounded-md cursor-pointer whitespace-nowrap shrink-0">
      {name}
    </button>
  );
};

export default NavButton;
