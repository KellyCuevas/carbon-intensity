import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegionDetail from "./pages/RegionDetail";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:regionId" element={<RegionDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
