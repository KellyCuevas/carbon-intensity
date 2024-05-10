import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentRegionalIntensity } from "../services/api";
import { RegionData } from "../types";

const RegionTable = ({
  handleRegionClick,
}: {
  handleRegionClick: React.MouseEventHandler;
}) => {
  const [sortAsc, setSortAsc] = useState(true);
  const regionalData = useQuery({
    queryKey: ["regionalData"],
    queryFn: getCurrentRegionalIntensity,
  });

  let tableData;
  // console.log(regionalData);
  //this API sometimes returns a status 200 with an error message in the response, so standard error handling has to be amended
  if (regionalData.isSuccess && regionalData?.data?.data !== undefined) {
    tableData = regionalData?.data?.data[0].regions
      .sort((a: RegionData, b: RegionData) =>
        sortAsc
          ? a.intensity.forecast - b.intensity.forecast
          : b.intensity.forecast - a.intensity.forecast
      )
      .map((region: RegionData) => (
        <tr key={region.regionid}>
          <th scope="row">
            <button
              onClick={handleRegionClick}
              value={region.regionid}
              tabIndex={0}
            >
              {region.shortname}
            </button>
          </th>
          <td className={region.intensity.index.replace(" ", "-")}>
            {region.intensity.forecast}
          </td>
          <td className={region.intensity.index.replace(" ", "-")}>
            {region.intensity.index}
          </td>
        </tr>
      ));
  }

  //  console.log(regionalData?.data?.data[0].regions);

  if (regionalData.isPending) return <p className="loading">Loading...</p>;

  if ("error" in regionalData.data)
    return <p className={"error-message"}>😕 Something went wrong 😕</p>;

  return (
    <div>
      <h2 className="table-header">Carbon Intensity By Region</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Region</th>
            <th scope="col">
              <button
                className="sort-button"
                type="button"
                onClick={() => setSortAsc(!sortAsc)}
              >
                {sortAsc ? <span>&#9650;</span> : <span>&#9660;</span>}
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
