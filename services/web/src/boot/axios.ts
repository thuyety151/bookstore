import axios from "axios";
import Config from "../config/config";
import { ROUTE_LOGIN } from "../routers/types";
import { createBrowserHistory } from "history";

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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const history = createBrowserHistory();

    if (error.response?.status === 401 && history.location.pathname !== '/login') {
      const history = createBrowserHistory({ forceRefresh: true });

      const user = localStorage.getItem("user");
      if (user) {
        localStorage.removeItem("user");
      }
      history.push(ROUTE_LOGIN);
      return axios(error.config);
    } else if (error.response?.status === 401 && history.location.pathname === '/login'){
      return;
    }
    else {
      return Promise.reject(error);
    }
  }
);
export default api;
