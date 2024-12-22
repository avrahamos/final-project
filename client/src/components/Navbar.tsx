import React from "react";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSelectYear: (year: number) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSelectYear }) => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleSelectYear = (year: number) => {
    onSelectYear(year); 
    navigate("/groups-by-year", { state: { year } });
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <h2 className="text-lg font-bold">Incident Trends</h2>

      <select
        className="bg-gray-900 text-white px-4 py-2 rounded-md"
        onChange={(e) => handleSelectYear(Number(e.target.value))}
      >
        <option value="">Select Year</option>
        {Array.from({ length: 50 }, (_, i) => currentYear - i).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Navbar;
