import axios from "axios";
import { BASE_URL } from "../env";

export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});
