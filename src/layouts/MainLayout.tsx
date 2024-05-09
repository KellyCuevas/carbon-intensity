import React from "react";
import MainNav from "../components/MainNav";
import { MainFooter } from "../components/MainFooter";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="wrapper">
        <MainNav />
        <main className="main-wrapper">
          <Outlet />
        </main>

        <MainFooter />
      </div>
    </>
  );
};

export default MainLayout;
