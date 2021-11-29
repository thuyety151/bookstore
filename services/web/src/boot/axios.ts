import axios from "axios";
import { useHistory } from "react-router";
import Config from "../config/config";
import { ROUTE_LOGIN } from "../routers/types";

const api = axios.create({ baseURL: Config.apiHost });
// Authentication
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");
  if (user) {
    const token = JSON.parse(user).token;
    config.headers.common["Authorization"] = `bearer ${token}`;
  }
  return config;
});

// api.interceptors.response.use(response => {
//   return response;
// }, error => {
//  if (error.response.status === 401) {
//   //place your reentry code
//   console.log("responsepush")
//  }
//  return error;
// });

// api.interceptors.response.use(
//   (response) => {
//     console.log("response",response)
//     return response;
//   },
//   async (error) => {
//     const history = useHistory();
//     // const accessToken = Cookies.get("access_token");
//     console.log("error",error.response)
//     if (error.response.status === 401 /*&& accessToken*/) {
//       history.push(ROUTE_LOGIN);
//       console.log("push")
//       // const newAccessToken = await getRefreshToken();
//       // if (newAccessToken) {
//       //   error.config.headers["Authorization"] = `bearer ${newAccessToken}`;
//       // }
//       return axios(error.config);
//     } else {
//       console.log("push",error)
//       return Promise.reject(error);
//     }
//   }
// );
export default api;
