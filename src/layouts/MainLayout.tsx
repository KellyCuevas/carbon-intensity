import React from "react";
import MainNav from "../components/MainNav";
import { MainFooter } from "../components/MainFooter";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
      <MainFooter />
    </>
  );
};

export default MainLayout;
