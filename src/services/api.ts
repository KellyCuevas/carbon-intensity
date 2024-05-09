import axios from "./axios";

export async function getCurrentOverallIntensity() {
  const response = await axios.get("/intensity/date");
  return response.data;
}

export async function getCurrentDayStats(from: string, to: string) {
  const response = await axios.get(`/intensity/stats/${from}/${to}`);
  return response.data;
}

export async function getCurrentRegionalIntensity() {
  const response = await axios.get("/regional");
  return response.data;
}

export async function getRegionDetail(regionId: string) {
  const response = await axios.get(`/regional/regionid/${regionId}`);
  return response.data;
}

export async function getRegionWeekData(
  regionId: string,
  from: string,
  to: string
) {
  const response = await axios.get(
    `/regional/intensity/${from}/${to}/regionid/${regionId}`
  );
  return response.data;
}
export async function getRegionMonthData(
  regionId: string,
  from: string,
  to: string
) {
  const response = await axios.get(
    `/regional/intensity/${from}/${to}/regionid/${regionId}`
  );
  return response.data;
}
