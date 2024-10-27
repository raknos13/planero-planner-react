import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-400">
      <h1 className="text-md font-bold text-center">Planero project manager</h1>
      <button>
        <FaUserCircle size={26} />
      </button>
    </div>
  );
};

export default Header;
