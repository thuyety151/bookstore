import axios from "axios";
import Config from "../config/config";

const api = axios.create({ baseURL: Config.apiHost });
// Authentication
// api.interceptors.request.use((config) => {
//   const accessToken = Cookies.get("access_token");
//   if (accessToken) {
//     config.headers.common["Authorization"] = `bearer ${accessToken}`;
//   }
//   return config;
// });

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const accessToken = Cookies.get("access_token");
//     if (error.response.status === 401 && accessToken) {
//       const newAccessToken = await getRefreshToken();
//       if (newAccessToken) {
//         error.config.headers["Authorization"] = `bearer ${newAccessToken}`;
//       }
//       return axios(error.config);
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );
export default  api ;

