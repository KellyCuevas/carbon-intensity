import React, { useState } from "react";
import { getCurrentOverallIntensity } from "../api";
import { useQuery } from "@tanstack/react-query";
import calculateTotalAverage from "../utils/calculateTotalAverage";
import { CurrOverallIntensityData } from "../types";
import OverallTable from "../components/RegionTable";

const Home = () => {
  const currOverallIntensity = useQuery({
    queryKey: ["currOverallIntensity"],
    queryFn: getCurrentOverallIntensity,
  });

  const total = calculateTotalAverage(
    currOverallIntensity.data?.data.filter(
      (segment: CurrOverallIntensityData) => segment.intensity.actual !== null
    )
  );

  let index = "";

  if (total) {
    if (total < 35) index = "very-low";
    if (total >= 35 && total < 110) index = "low";
    if (total >= 110 && total < 190) index = "moderate";
    if (total >= 190 && total < 270) index = "high";
    if (total >= 270) index = "very-high";
  }

  return (
    <>
      <h1>Carbon Intensity</h1>
      <div>
        <h3>The Current Average Overall Carbon Intensity Today Is:</h3>
        {total ? (
          <span className={`overall-stat ${index}`}>
            {total}
            <br />
            {index.toUpperCase()}
          </span>
        ) : (
          "calculating..."
        )}
      </div>
      <OverallTable />
    </>
  );
};

export default Home;
