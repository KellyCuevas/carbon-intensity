import axios from "axios";

const API_URL = "https://api.carbonintensity.org.uk";

export default axios.create({
  baseURL: API_URL,
});
