import React from "react";
import { getCurrentOverallIntensity } from "./api";
import { useQuery } from "@tanstack/react-query";
import calculateTotalAverage from "./utils/calculateTotalAverage";

type CurrOverallIntensityData = {
  from: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
  to: string;
};

const App = () => {
  const currOverallIntensity = useQuery({
    queryKey: ["currOverallIntensity"],
    queryFn: getCurrentOverallIntensity,
  });

  const total = calculateTotalAverage(
    currOverallIntensity.data?.data.filter(
      (segment: CurrOverallIntensityData) => segment.intensity.actual !== null
    )
  );

  return (
    <>
      <h1>Carbon Intensity</h1>
      <div>
        <h3>The Current Average Overall Carbon Intensity Today Is:</h3>
        {total ? total : "calculating..."}
      </div>
    </>
  );
};

export default App;
