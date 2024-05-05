import React from "react";
import { getCurrentOverallIntensity } from "./api";
import { useQuery } from "@tanstack/react-query";

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

  const total = calculateTotal(
    currOverallIntensity.data?.data.filter(
      (segment: CurrOverallIntensityData) => segment.intensity.actual !== null
    )
  );

  function calculateTotal(array: CurrOverallIntensityData[]) {
    const simpleArray = array?.map((segment) => segment?.intensity?.actual);
    const reduced = simpleArray?.reduce((accum, curr) => accum + curr);
    const currDailyIntensityAverage = Math.round(reduced / simpleArray?.length);
    return currDailyIntensityAverage;
  }

  return (
    <>
      <h1>Carbon Intensity</h1>
      <div>
        <h3>The Current Overall Carbon Intensity Today Is:</h3>
        {total ? total : "calculating..."}
      </div>
    </>
  );
};

export default App;
