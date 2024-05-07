import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { getRegionDetail, getRegionWeekData } from "../api";

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

  const { currDateISO, oneWeekPriorISO } = useMemo(() => {
    const currDate = new Date();
    let currDateISO = currDate.toISOString();
    currDateISO = `${currDateISO.slice(0, 11)}${currDateISO.slice(11, 16)}Z`;

    const oneWeekPrior = new Date();
    oneWeekPrior.setDate(currDate.getDate() - 7);
    let oneWeekPriorISO = oneWeekPrior.toISOString();
    oneWeekPriorISO = `${oneWeekPriorISO.slice(0, 11)}${oneWeekPriorISO.slice(
      11,
      16
    )}Z`;
    return { currDateISO, oneWeekPriorISO };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId]);

  const regionWeekData = useQuery({
    queryKey: ["region", regionId, oneWeekPriorISO, currDateISO],
    queryFn: () => getRegionWeekData(regionId, oneWeekPriorISO, currDateISO),
    enabled: !!regionId && !!oneWeekPriorISO && !!currDateISO,
  });

  console.log("regionWeekData", regionWeekData);
  const sum = regionWeekData?.data?.data?.data.reduce(
    (acc: number, obj: RegionIntensityDetail) => acc + obj.intensity.forecast,
    0
  );
  const regionWeekAverage = Math.round(
    sum / regionWeekData?.data?.data?.data.length
  );
  // console.log("average", average);
  let index;
  if (regionWeekAverage) {
    if (regionWeekAverage < 35) index = "very-low";
    if (regionWeekAverage >= 35 && regionWeekAverage < 110) index = "low";
    if (regionWeekAverage >= 110 && regionWeekAverage < 190) index = "moderate";
    if (regionWeekAverage >= 190 && regionWeekAverage < 270) index = "high";
    if (regionWeekAverage >= 270) index = "very-high";
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
          <span className={`overall-stat ${index}`}>
            {regionWeekAverage}
            <br />
            {index?.replace("-", " ").toUpperCase()}
          </span>
        ) : (
          "calculating..."
        )}
      </h3>
    </dialog>
  );
};

export default RegionDetailDialog;
