import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <div className="flex align-center justify-between p-2 bg-gray-400">
      <h1 className="text-md font-bold text-center">Planero project manager</h1>
      <button>
        <FaUserCircle size={26} />
      </button>
    </div>
  );
};

export default Header;
