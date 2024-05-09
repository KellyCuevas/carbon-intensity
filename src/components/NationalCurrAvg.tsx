import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentDayStats } from "../services/api";
import getCarbonIndexName from "../utils/getCarbonIndexName";

const NationalCurrAvg = () => {
  const currDay = new Date().toISOString().slice(0, 10);
  const from = `${currDay}T00:00Z`;
  const to = `${currDay}T23:30Z`;

  const currDayStats = useQuery({
    queryKey: ["currDayStats", from, to],
    queryFn: () => getCurrentDayStats(from, to),
  });

  let total;
  let index;
  if (!currDayStats.isPending && currDayStats?.data?.data !== undefined) {
    total = currDayStats?.data?.data[0].intensity.average;
    index = getCarbonIndexName(total);
  }

  return (
    <div>
      <h2 className="overall-stat">
        The Current Average Overall Carbon Intensity Today Is:
        <br />
        {currDayStats.isPending && (
          <span className="loading">Calculating...</span>
        )}
        {!currDayStats.isPending && total === undefined ? (
          <span className="error-message">
            Sorry - data is not currently available
          </span>
        ) : (
          <span className={`overall-stat ${index}`}>
            {total}
            <br />
            {index?.toUpperCase()}
          </span>
        )}{" "}
      </h2>
    </div>
  );
};

export default NationalCurrAvg;
