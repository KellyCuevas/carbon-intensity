import { CurrOverallIntensityData } from "../types";

export default function calculateTotalAverage(
  array: CurrOverallIntensityData[]
) {
  const simpleArray = array?.map((segment) => segment?.intensity?.actual);
  const reduced = simpleArray?.reduce((accum, curr) => accum + curr);
  const currDailyIntensityAverage = Math.round(reduced / simpleArray?.length);
  return currDailyIntensityAverage;
}
