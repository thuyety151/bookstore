import { generatePath } from "react-router-dom";
import { SideBarChildren } from "../model/sidebar";
import { ROUTE_LOGIN, ROUTE_PROFILE_PREDICATE } from "../routers/types";

export const dataHelpSetting: SideBarChildren[] = [
  {
    id: "1",
    name: "Your Account",
    path: generatePath(ROUTE_PROFILE_PREDICATE, {
      tabName: "dashboard",
    }),
    isLogOut: false,
  },
  {
    id: "3",
    name: Boolean(localStorage.getItem("user")) ? "Log out" : "Sign In",
    path: ROUTE_LOGIN,
    isLogOut: true,
  },
];
