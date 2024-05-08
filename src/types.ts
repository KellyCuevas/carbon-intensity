export type CurrOverallIntensityData = {
  from: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
  to: string;
};
export type RegionData = {
  regionid: number;
  intensity: {
    forecast: number;
    index: string;
  };
  shortname: string;
};

export type RegionIntensityDetail = {
  intensity: {
    forecast: number;
  };
};
