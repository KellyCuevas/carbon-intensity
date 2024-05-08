import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentRegionalIntensity, getRegionMonthData } from "../api";
import { RegionData, RegionIntensityDetail } from "../types";
import DateSelect from "../components/DateSelect";
import RegionDetailGraph from "../components/RegionDetailGraph";
import RegionSelect from "../components/RegionSelect";
import getDateForParams from "../utils/getDateForParams";

const RegionDetail = () => {
  const { regionId = "" } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const regionalData = useQuery({
    queryKey: ["regionalData"],
    queryFn: getCurrentRegionalIntensity,
    staleTime: 30 * 1000,
  });

  const currRegionData = regionalData?.data?.data[0].regions.filter(
    (region: RegionData) => region.regionid === Number(regionId)
  )[0];

  // console.log(currRegionData);
  // let customStartDateISO = startDate.toISOString();
  // customStartDateISO = `${customStartDateISO.slice(
  //   0,
  //   11
  // )}${customStartDateISO.slice(11, 16)}Z`;
  // let customEndDateISO = endDate.toISOString();
  // customEndDateISO = `${customEndDateISO.slice(0, 11)}${customEndDateISO.slice(
  //   11,
  //   16
  // )}Z`;
  const customStartDateISO = getDateForParams(startDate);
  const customEndDateISO = getDateForParams(endDate);

  const regionCustomRangeData = useQuery({
    queryKey: [
      "region-custom-range",
      regionId,
      customStartDateISO,
      customEndDateISO,
    ],
    queryFn: () =>
      getRegionMonthData(regionId, customStartDateISO, customEndDateISO),
    enabled:
      !!regionId &&
      !!customStartDateISO &&
      !!customEndDateISO &&
      customStartDateISO !== customEndDateISO,
    staleTime: 30 * 1000,
  });

  const customSum = regionCustomRangeData?.data?.data?.data.reduce(
    (acc: number, obj: RegionIntensityDetail) => acc + obj.intensity.forecast,
    0
  );
  const regionCustomRangeAverage = Math.round(
    customSum / regionCustomRangeData?.data?.data?.data.length
  );

  const customRangeIndex = calculateIndex(regionCustomRangeAverage);

  function calculateIndex(averageIntensity: number) {
    let index;
    if (averageIntensity) {
      if (averageIntensity < 35) index = "very-low";
      if (averageIntensity >= 35 && averageIntensity < 110) index = "low";
      if (averageIntensity >= 110 && averageIntensity < 190) index = "moderate";
      if (averageIntensity >= 190 && averageIntensity < 270) index = "high";
      if (averageIntensity >= 270) index = "very-high";
    }
    return index;
  }
  // console.log(regionCustomRangeData);

  return (
    <>
      <div>
        <h1 className="secondary-stat h1">
          Region Detail for {currRegionData.shortname}
        </h1>
        <DateSelect
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <h2>
          The Averge Carbon Intensity from {startDate.toDateString()} to{" "}
          {endDate.toDateString()} is: <br />
          {regionCustomRangeAverage ? (
            <span className={`secondary-stat ${customRangeIndex}`}>
              {regionCustomRangeAverage}
              <br />
              {customRangeIndex?.replace("-", " ").toUpperCase()}
            </span>
          ) : (
            "calculating..."
          )}
        </h2>
        <RegionDetailGraph
          data={
            regionCustomRangeData?.data?.data
              ? regionCustomRangeData?.data?.data
              : []
          }
        />
        <RegionSelect />
      </div>
    </>
  );
};

export default RegionDetail;
