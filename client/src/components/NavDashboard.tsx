import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSearch: () => void;
}

const NavDashboard: React.FC<NavbarProps> = ({ onSearch }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const handleSearchClick = () => {
    setIsOpen((prev) => !prev); 
    onSearch(); 
  };
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <h2 className="text-lg font-bold">Map of terrorist incidents</h2>

      <div className="flex space-x-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          onClick={() => navigate("/countries")}
        >
          View as list
        </button>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          onClick={handleSearchClick}
        >
          {isOpen ? "Close search" : "Search"}
        </button>
      </div>
    </div>
  );
};

export default NavDashboard;
