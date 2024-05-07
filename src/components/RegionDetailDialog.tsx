import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getRegionDetail, getRegionWeekData, getRegionMonthData } from "../api";
import { Link } from "react-router-dom";

type RegionIntensityDetail = {
  intensity: {
    forecast: number;
  };
};

const RegionDetailDialog = ({
  handleCloseModel,
  regionId,
}: {
  handleCloseModel: React.MouseEventHandler;
  regionId: string;
}) => {
  const regionData = useQuery({
    queryKey: ["region", regionId],
    queryFn: () => getRegionDetail(regionId),
    enabled: !!regionId,
  });

  const { currDateISO, oneWeekPriorISO, oneMonthPriorISO } = useMemo(() => {
    const currDate = new Date();
    let currDateISO = currDate.toISOString();
    currDateISO = `${currDateISO.slice(0, 11)}${currDateISO.slice(11, 16)}Z`;

    //for consistency, the function is pulling data from the last 7 days, regardless of the current day of the week (i.e. if it is Tuesday, it will get data from last Tues to this Tues)
    const oneWeekPrior = new Date();
    oneWeekPrior.setDate(currDate.getDate() - 7);
    let oneWeekPriorISO = oneWeekPrior.toISOString();
    oneWeekPriorISO = `${oneWeekPriorISO.slice(0, 11)}${oneWeekPriorISO.slice(
      11,
      16
    )}Z`;
    //for consistency, the function is pull data from the last 30 days, regardless of the current day of the month
    const oneMonthPrior = new Date();
    oneMonthPrior.setDate(currDate.getDate() - 30);
    let oneMonthPriorISO = oneMonthPrior.toISOString();
    oneMonthPriorISO = `${oneMonthPriorISO.slice(
      0,
      11
    )}${oneMonthPriorISO.slice(11, 16)}Z`;
    return { currDateISO, oneWeekPriorISO, oneMonthPriorISO };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  const regionWeekData = useQuery({
    queryKey: ["region-week", regionId, oneWeekPriorISO, currDateISO],
    queryFn: () => getRegionWeekData(regionId, oneWeekPriorISO, currDateISO),
    enabled: !!regionId && !!oneWeekPriorISO && !!currDateISO,
  });

  const regionMonthData = useQuery({
    queryKey: ["region-month", regionId, oneMonthPriorISO, currDateISO],
    queryFn: () => getRegionMonthData(regionId, oneMonthPriorISO, currDateISO),
    enabled: !!regionId && !!oneMonthPriorISO && !!currDateISO,
  });

  // console.log("regionWeekData", regionWeekData);
  // console.log("regionMonthData", regionMonthData);
  const sum = regionWeekData?.data?.data?.data.reduce(
    (acc: number, obj: RegionIntensityDetail) => acc + obj.intensity.forecast,
    0
  );
  const regionWeekAverage = Math.round(
    sum / regionWeekData?.data?.data?.data.length
  );
  const monthSum = regionMonthData?.data?.data?.data.reduce(
    (acc: number, obj: RegionIntensityDetail) => acc + obj.intensity.forecast,
    0
  );
  const regionMonthAverage = Math.round(
    monthSum / regionMonthData?.data?.data?.data.length
  );

  const regionWeekIndex = calculateIndex(regionWeekAverage);
  const regionMonthIndex = calculateIndex(regionMonthAverage);
  // console.log("average", average);
  //TODO: turn this into a function for reusability
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

  return (
    <dialog className="side-panel-dialog">
      <button type="button" onClick={(e) => handleCloseModel(e)}>
        X
      </button>
      <h1>{regionData?.data?.data[0].shortname}</h1>
      <h2>
        The current carbon intensity is: <br />
        <span
          className={`overall-stat ${regionData?.data?.data[0].data[0].intensity.index.replace(
            " ",
            "-"
          )}`}
        >
          {regionData?.data?.data[0].data[0].intensity.forecast}
          <br />
          {
            regionData?.data?.data[0].data[0].intensity.index.toUpperCase() as string
          }
        </span>
      </h2>
      <h3>
        The carbon intensity in {regionData?.data?.data[0].shortname} over the
        past week was:
        <br />
        {regionWeekAverage ? (
          <span className={`secondary-stat ${regionWeekIndex}`}>
            {regionWeekAverage}
            <br />
            {regionWeekIndex?.replace("-", " ").toUpperCase()}
          </span>
        ) : (
          "calculating..."
        )}
      </h3>
      <h3>
        The carbon intensity in {regionData?.data?.data[0].shortname} over the
        past month was:
        <br />
        {regionMonthAverage ? (
          <span className={`secondary-stat ${regionMonthIndex}`}>
            {regionMonthAverage}
            <br />
            {regionMonthIndex?.replace("-", " ").toUpperCase()}
          </span>
        ) : (
          "calculating..."
        )}
      </h3>
      <footer>
        <Link to={`/detail/${regionId}`}>Go To Detail Page</Link>
      </footer>
    </dialog>
  );
};

export default RegionDetailDialog;
