import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface NavbarProps {
  onSelectYear: (year: number) => void;
  onSelectRange: (startYear: number, endYear: number) => void;
  onRecentYears: (limit: number) => void;
}

const NavbarToIncident: React.FC<NavbarProps> = ({
  onSelectYear,
  onSelectRange,
  onRecentYears,
}) => {
  const currentYear = new Date().getFullYear();
  const [range, setRange] = useState<[number, number]>([
    currentYear - 5,
    currentYear,
  ]);
  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10">
      <h2 className="text-lg font-bold">Incident Trends</h2>

      <div className="flex items-center">
        <button
          className="bg-blue-600 px-4 py-2 rounded-md text-white hover:bg-blue-700 mr-4"
          onClick={() => onRecentYears(5)}
        >
          Last 5 Years
        </button>
        <button
          className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-700"
          onClick={() => onRecentYears(10)}
        >
          Last 10 Years
        </button>
      </div>

      <div className="bg-white shadow-md rounded-md p-2 w-full max-w-md flex flex-col space-y-2">
        <div className="text-gray-700 text-sm text-center font-medium">
          Selected Range: <span className="font-bold">{range[0]}</span> -{" "}
          <span className="font-bold">{range[1]}</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Slider
              range
              min={currentYear - 54}
              max={currentYear}
              defaultValue={range}
              onChange={(value) => setRange(value as [number, number])}
              className="w-full"
            />
          </div>
          <button
            className="bg-purple-600 px-2 py-1 rounded-lg text-white hover:bg-purple-700 shadow-md transition-transform duration-300 transform hover:scale-105"
            onClick={() => onSelectRange(range[0], range[1])}
          >
            Apply Range
          </button>
        </div>
      </div>

      <select
        className="bg-gray-900 text-white px-4 py-2 rounded-md"
        onChange={(e) => onSelectYear(Number(e.target.value))}
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

export default NavbarToIncident;
