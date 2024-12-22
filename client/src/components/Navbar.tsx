import React, { useEffect, useState } from "react";
import { fetchOrganizations } from "../fatches/relationships";

interface NavbarProps {
  onSelectYear: (year: number) => void;
  onSelectOrganization: (organization: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onSelectYear,
  onSelectOrganization,
}) => {
  const currentYear = new Date().getFullYear();
  const [organizations, setOrganizations] = useState<string[]>([]);

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const data = await fetchOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error("Failed to load organizations:", error);
      }
    };

    loadOrganizations();
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white p-4 fixed top-0 w-full z-10 shadow-md">
      <h2 className="text-lg font-bold">Incident Trends</h2>

      <div className="flex space-x-4">
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

        <select
          className="bg-gray-900 text-white px-4 py-2 rounded-md"
          onChange={(e) => onSelectOrganization(e.target.value)}
        >
          <option value="">Select Organization</option>
          {organizations.map((org, index) => (
            <option key={index} value={org}>
              {org}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Navbar;
