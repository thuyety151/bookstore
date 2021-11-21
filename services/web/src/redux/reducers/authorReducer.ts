import Author from "../../model/author";
import { NAME_ACTIONS } from "../constants/author/actionTypes";

export type AuthorState = {
  requesting: boolean;
  success: Boolean;
  data: Author[];
  message?: string;
};

const initState: AuthorState = {
  requesting: false,
  success: true,
  data: [],
  message: "",
};

const authorReducer = (
  state: AuthorState = initState,
  payload: any
): AuthorState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_ALL.GET_ALL:
      return {
        ...state,
        requesting: true,
        data: [],
      };
    case NAME_ACTIONS.GET_ALL.GET_ALL_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        success: true,
      };
    case NAME_ACTIONS.GET_ALL.GET_ALL_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
        success: false,
      };
    default:
      return state;
  }
};

export default authorReducer;
