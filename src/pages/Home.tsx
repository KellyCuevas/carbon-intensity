import React, { useState } from "react";
import RegionTable from "../components/RegionTable";
import RegionDetailDialog from "../components/RegionDetailDialog";
import NationalCurrAvg from "../components/NationalCurrAvg";

const Home = () => {
  const [regionId, setRegionId] = useState("");

  const dialog = document.querySelector("dialog");

  const handleRegionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dialog?.showModal();
    setRegionId(e.currentTarget.value);
  };

  const handleCloseModel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dialog?.close();
  };

  dialog?.addEventListener("click", (e) => {
    const dialogDimensions = dialog.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      dialog.close();
    }
  });

  return (
    <>
      <h1>Carbon Intensity</h1>
      <NationalCurrAvg />

      <RegionTable handleRegionClick={handleRegionClick} />
      <RegionDetailDialog
        handleCloseModel={handleCloseModel}
        regionId={regionId}
      />
    </>
  );
};

export default Home;