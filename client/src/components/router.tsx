import React from "react";
import { Routes, Route } from "react-router-dom";
import CountryList from "./pages/analysis/CountryList";
import CityList from "./pages/analysis/CityList";
import Map from "./Map";
import DeadliestAttackGraph from "./pages/analysis/DeadliestAttackGraph";
import IncidentTrendsGraph from "./pages/analysis/IncidentTrendsGraph";
import RegionsList from "./pages/relationships/RegionsList";
import TopGroupsGraph from "./pages/relationships/TopGroupsGraph";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<CountryList />} />
      <Route path="/cities" element={<CityList />} />
      <Route path="/map" element={<Map />} />
      <Route path="/deadliest-attack" element={<DeadliestAttackGraph />} />
      <Route path="/incident-trends" element={<IncidentTrendsGraph />} />
      <Route path="/regions-list" element={<RegionsList />} />
      <Route path="/top-groups" element={<TopGroupsGraph/>} />
    </Routes>
  );
};

export default AppRouter;
