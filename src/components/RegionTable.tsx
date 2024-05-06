import React from "react";
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
const OverallTable = () => {
  const regionalData = useQuery({
    queryKey: ["regionalData"],
    queryFn: getCurrentRegionalIntensity,
  });

  const tableData = regionalData?.data?.data[0].regions
    .sort(
      (a: RegionData, b: RegionData) =>
        a.intensity.forecast - b.intensity.forecast
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

export default OverallTable;
