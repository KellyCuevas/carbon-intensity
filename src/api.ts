import axios from "./axios";

export async function getCurrentOverallIntensity() {
  const response = await axios.get("/intensity/date");
  return response.data;
}

export async function getCurrentRegionalIntensity() {
  const response = await axios.get("/regional");
  return response.data;
}
