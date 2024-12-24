import { useEffect, useState } from "react";
import { ISummaryResult } from "../../../../types/socket";
import {
  onSearchCitiesResults,
  searchCities,
} from "../../../../socket/dashboard";
import { useLocation } from "react-router-dom";

const SearchCities: React.FC<{ onCityClick: (cityData: any) => void }> = ({
  onCityClick,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ISummaryResult[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const location = useLocation() as unknown as { state: { country: string } };
  console.log("Location State:", location?.state);
  const countryName = location?.state?.country || "";
  console.log(countryName);


  useEffect(() => {
    onSearchCitiesResults((data) => {
      setResults(data);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      setIsTyping(true);
      searchCities(countryName, value.trim());
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result: ISummaryResult) => {
    console.log("Selected location:", JSON.stringify(result));
     onCityClick(result);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder={`Search by city in ${countryName}...`}
          value={query}
          onChange={handleInputChange}
          className="w-full p-2 text-center text-gray-800 placeholder-gray-400 bg-transparent border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-800"
        />
      </div>

      {isTyping && results.length === 0 && query.trim() !== "" && (
        <div className="mt-2 text-center text-gray-800">Searching...</div>
      )}

      {results.length > 0 && (
        <ul className="mt-2 bg-transparent border-2 border-gray-700 rounded-md divide-y divide-gray-400">
          {results.map((result, index) => (
            <li
              key={index}
              onClick={() => handleResultClick(result)}
              className="p-2 text-gray-800 cursor-pointer hover:bg-blue-50"
            >
              {result.city || "Unknown Location"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCities;
