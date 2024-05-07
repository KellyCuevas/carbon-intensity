import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCurrentRegionalIntensity } from "../api";
import { RegionData } from "../types";

const RegionDetail = () => {
  const { regionId } = useParams();

  const regionalData = useQuery({
    queryKey: ["regionalData"],
    queryFn: getCurrentRegionalIntensity,
  });

  const currRegionData = regionalData?.data?.data[0].regions.filter(
    (region: RegionData) => region.regionid === Number(regionId)
  )[0];

  console.log(currRegionData);
  return (
    <div>
      <h1 className="h1">Region Detail for {currRegionData.shortname}</h1>
    </div>
  );
};

export default RegionDetail;
