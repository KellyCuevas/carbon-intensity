export type CurrOverallIntensityData = {
  from: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
  to: string;
};
