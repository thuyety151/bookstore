/** @format */

import { NAME_ACTIONS } from "../constants/category/actionTypes";

const initState = {
  requesting: true,
  success: false,
  message: null,
  data: [],
};

const categoryReducer = (state = initState, payload: any) => {
  switch (payload.type) {
    //root
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_CATEGORY:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_SUCCESS:
      console.log("reducer", payload);
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
      };
    case NAME_ACTIONS.SIDEBAR.GET_ROOT_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };

    //sub
    case NAME_ACTIONS.SIDEBAR.GET_SUB_CATEGORY:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.SIDEBAR.GET_SUB_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: payload.data,
      };
    case NAME_ACTIONS.SIDEBAR.GET_SUB_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    default:
      return state;
  }
};
export default categoryReducer;
