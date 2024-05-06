import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentRegionalIntensity } from "../api";

type RegionData = {
  regionid: number;
  intensity: {
    forecast: number;
    index: string;
  };
  shortname: string;
};
const RegionTable = () => {
  const [sortAsc, setSortAsc] = useState(true);
  const regionalData = useQuery({
    queryKey: ["regionalData"],
    queryFn: getCurrentRegionalIntensity,
  });

  const tableData = regionalData?.data?.data[0].regions
    .sort((a: RegionData, b: RegionData) =>
      sortAsc
        ? a.intensity.forecast - b.intensity.forecast
        : b.intensity.forecast - a.intensity.forecast
    )
    .map((region: RegionData) => (
      <tr key={region.regionid}>
        <th scope="row">{region.shortname}</th>
        <td className={region.intensity.index.replace(" ", "-")}>
          {region.intensity.forecast}
        </td>
        <td className={region.intensity.index.replace(" ", "-")}>
          {region.intensity.index}
        </td>
      </tr>
    ));

  console.log(regionalData?.data?.data[0].regions);
  return (
    <div>
      <h2 className="table-header">Carbon Intensity By Region</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col">
              <button type="button" onClick={() => setSortAsc(!sortAsc)}>
                {sortAsc ? <span>&#9662;</span> : <span>&#9652;</span>}
              </button>
              Forecast Carbon Intensity &#40;gCO<sub>2</sub>/kWh&#41;
            </th>
            <th scope="col">Index</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default RegionTable;
