import { useEffect, useState } from "react";
import { ISearchResult } from "../../../../types/socket";
import { onSearchResults, searchCountries } from "../../../../socket/dashboard";
import { useNavigate } from "react-router-dom";

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    onSearchResults((data) => {
      setResults(data);
    });
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim() !== "") {
      setIsTyping(true);
      searchCountries({ country: value });
    } else {
      setResults([]);
    }
  };

  const handleResultClick = (result: ISearchResult) => {
     navigate("/country-map", { state: result });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by country..."
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
              className="p-2 text-blue-500 cursor-pointer hover:bg-blue-50"
            >
              {result.country || "Unknown Location"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
