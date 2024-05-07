import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegionDetail from "./pages/RegionDetail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:regionId" element={<RegionDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
