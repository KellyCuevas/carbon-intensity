import axios from "./axios";

export async function getCurrentOverallIntensity() {
  const response = await axios.get("/intensity/date");
  return response.data;
}
