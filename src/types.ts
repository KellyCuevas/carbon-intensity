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
  from: string;
  to: string;
  intensity: {
    forecast: number;
  };
};

export type RegionIntensityData = {
  regionid: number;
  shortname: string;
  data: RegionIntensityDetail[];
};
