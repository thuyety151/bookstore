import axios from "axios";
import Config from "../config/config";

const apiGHN = axios.create({
  baseURL: Config.apiAddressHost,
  headers: {
    Token: Config.apiAddressKey,
  },
});

export default apiGHN;
