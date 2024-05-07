import React, { useState } from "react";
import { getCurrentOverallIntensity } from "../api";
import { useQuery } from "@tanstack/react-query";
import calculateTotalAverage from "../utils/calculateTotalAverage";
import { CurrOverallIntensityData } from "../types";
import RegionTable from "../components/RegionTable";
import RegionDetailDialog from "../components/RegionDetailDialog";

const Home = () => {
  const [regionId, setRegionId] = useState("");
  //TODO refactor using statistics endpoint
  const currOverallIntensity = useQuery({
    queryKey: ["currOverallIntensity"],
    queryFn: getCurrentOverallIntensity,
  });

  const total = calculateTotalAverage(
    currOverallIntensity.data?.data.filter(
      (segment: CurrOverallIntensityData) => segment.intensity.actual !== null
    )
  );
  console.log(total);
  let index = "";

  if (total) {
    if (total < 35) index = "very-low";
    if (total >= 35 && total < 110) index = "low";
    if (total >= 110 && total < 190) index = "moderate";
    if (total >= 190 && total < 270) index = "high";
    if (total >= 270) index = "very-high";
  }

  const dialog = document.querySelector("dialog");
  const handleRegionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dialog?.showModal();
    setRegionId(e.currentTarget.value);
    console.log(e.currentTarget.value);
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

  //TODO: fix messaging/error handling here
  return (
    <>
      <h1>Carbon Intensity</h1>
      <div>
        <h3>The Current Average Overall Carbon Intensity Today Is:</h3>
        {currOverallIntensity.isLoading && "Calculating..."}
        {total === 0 ? (
          "Sorry - data is not currently available"
        ) : (
          <span className={`overall-stat ${index}`}>
            {total}
            <br />
            {index.toUpperCase()}
          </span>
        )}
      </div>
      <RegionTable handleRegionClick={handleRegionClick} />
      <RegionDetailDialog
        handleCloseModel={handleCloseModel}
        regionId={regionId}
      />
    </>
  );
};

export default Home;
