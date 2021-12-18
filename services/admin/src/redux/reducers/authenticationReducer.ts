import { ACTION_NAMES } from "redux/actions/user/actionTypes";

export type UserState = {
  requesting: boolean;
  user: any;
};

const initState: UserState = {
  requesting: false,
  user: JSON.parse(localStorage.getItem("user")!),
};

// let user = localStorage.getItem("user");
// if (user) {
//   user = JSON.parse(localStorage.getItem("user")!);
// }

// const initialState = user ? { requesting: false, user } : {};

const authenticationReducer = (
  state: UserState = initState,
  payload: any
): UserState => {
  switch (payload.type) {
    case ACTION_NAMES.LOGIN.LOGIN:
      return {
        ...state,
        requesting: true,
        user: payload.data,
      };
    case ACTION_NAMES.LOGIN.LOGIN_SUCCESS:
      return {
        ...state,
        requesting: false,
        user: payload.data,
      };
    case ACTION_NAMES.LOGIN.LOGIN_FAIL:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};
export default authenticationReducer;
