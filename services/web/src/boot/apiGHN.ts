import axios from "axios";
import Config from "../config/config";

// Config.apiAddressHost = https://dev-online-gateway.ghn.vn/shiip/public-api
// Config.apiAddressKey = a907bd6b-3508-11ec-b514-aeb9e8b0c5e3

const apiGHN = axios.create({
  baseURL: Config.apiAddressHost,
  headers: {
    Token: Config.apiAddressKey,
  },
});

export default apiGHN;
