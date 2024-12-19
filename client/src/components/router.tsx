import React from "react";
import { Routes, Route } from "react-router-dom";
import CountryList from "./pages/analysis/CountryList";
import CityList from "./pages/analysis/CityList";
import Map from "./Map";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/cities" element={<CityList />} />
      <Route path="/map" element={<Map />} />
    </Routes>
  );
};

export default AppRouter;
