import axios from "axios";
import Config from "../config/config";

const apiAddress = axios.create({
  baseURL: Config.apiAddressHost,
  headers: {
    Token: Config.apiAddressKey,
  },
});

export default apiAddress;
