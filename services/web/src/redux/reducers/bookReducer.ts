import { Detail } from "../../model/detail";
import { bookDetailConstant } from "../constants/book-detail/actionTypes";

export type BookState = {
  success: Boolean;
  data: Detail | null;
  message?: string | null;
};

const initState: BookState = {
  success: true,
  data: null,
  message: null,
};

const bookReducer = (state: BookState = initState, payload: any): BookState => {
  console.log("state",state,"p,payloadayload",payload)
  switch (payload.type) {
    case bookDetailConstant.GET_REQUEST:
      return {
        ...state,
      };
    case bookDetailConstant.GET_SUCCESS:
      console.log("change state",{
        ...state,
        success: true,
        data: payload.data,
      });
      return {
        ...state,
        success: true,
        data: payload.data,
      };
    case bookDetailConstant.GET_FAILURE:
      return {
        ...state,
        success: false,
        message: payload.message,
      };
    default:
      return state;
  }
};

export default bookReducer;
