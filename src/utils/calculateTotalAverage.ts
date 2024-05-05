type CurrOverallIntensityData = {
  from: string;
  intensity: {
    forecast: number;
    actual: number;
    index: string;
  };
  to: string;
};

export default function calculateTotalAverage(
  array: CurrOverallIntensityData[]
) {
  const simpleArray = array?.map((segment) => segment?.intensity?.actual);
  const reduced = simpleArray?.reduce((accum, curr) => accum + curr);
  const currDailyIntensityAverage = Math.round(reduced / simpleArray?.length);
  return currDailyIntensityAverage;
}
