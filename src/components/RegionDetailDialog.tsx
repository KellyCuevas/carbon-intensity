import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
  getRegionDetail,
  getRegionWeekData,
  getRegionMonthData,
} from "../services/api";
import { Link } from "react-router-dom";
import { RegionIntensityDetail } from "../types";
import getCarbonIndexName from "../utils/getCarbonIndexName";
import getDateForParams from "../utils/getDateForParams";

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
    staleTime: 30 * 1000,
  });

  const { currDateISO, oneWeekPriorISO, oneMonthPriorISO } = useMemo(() => {
    const currDate = new Date();
    const currDateISO = getDateForParams(currDate);
    //for consistency, the function is pulling data from the last 7 days, regardless of the current day of the week (i.e. if it is Tuesday, it will get data from last Tues to this Tues)
    const oneWeekPrior = new Date(currDate.getTime() - 6 * 24 * 60 * 60 * 1000);

    const oneWeekPriorISO = getDateForParams(oneWeekPrior);

    //for consistency, the function is pull data from the last 30 days, regardless of the current day of the month
    const oneMonthPrior = new Date(
      currDate.getTime() - 30 * 24 * 60 * 60 * 1000
    );

    const oneMonthPriorISO = getDateForParams(oneMonthPrior);
    return { currDateISO, oneWeekPriorISO, oneMonthPriorISO };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  const regionWeekData = useQuery({
    queryKey: ["region-week", regionId, oneWeekPriorISO, currDateISO],
    queryFn: () => getRegionWeekData(regionId, oneWeekPriorISO, currDateISO),
    enabled: !!regionId && !!oneWeekPriorISO && !!currDateISO,
    staleTime: 30 * 1000,
  });

  const regionMonthData = useQuery({
    queryKey: ["region-month", regionId, oneMonthPriorISO, currDateISO],
    queryFn: () => getRegionMonthData(regionId, oneMonthPriorISO, currDateISO),
    enabled: !!regionId && !!oneMonthPriorISO && !!currDateISO,
    staleTime: 30 * 1000,
  });

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

  const regionWeekIndex = getCarbonIndexName(regionWeekAverage);
  const regionMonthIndex = getCarbonIndexName(regionMonthAverage);

  return (
    <dialog className="side-panel-dialog">
      <div className="dialog-content-container">
        <button
          className="sort-button"
          type="button"
          onClick={(e) => handleCloseModel(e)}
        >
          X
        </button>
        <h2>{regionData?.data?.data[0].shortname}</h2>
        <h3 className="secondary-stat">
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
        </h3>
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
        <footer className="dialog-footer">
          <Link to={`/detail/${regionId}`} className="button-link">
            Go To Detail Page
          </Link>
        </footer>
      </div>
    </dialog>
  );
};

export default RegionDetailDialog;
