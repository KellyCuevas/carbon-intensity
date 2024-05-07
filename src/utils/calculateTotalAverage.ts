import { CurrOverallIntensityData } from "../types";

export default function calculateTotalAverage(
  array: CurrOverallIntensityData[]
) {
  const reduced = array?.reduce(
    (accum, curr) => accum + curr.intensity.actual,
    0
  );

  const currDailyIntensityAverage = Math.round(reduced / array?.length) || 0;

  return currDailyIntensityAverage;
}
