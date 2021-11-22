import { Book } from "../../model";
import { booksContant } from "../constants/books/actionTypes";

export type BestSellingState = {
  success: Boolean;
  data: Book[];
  message: string | null;
  requesting: boolean;
};

const initialState: BestSellingState = {
  success: true,
  data: [] as Book[],
  message: null,
  requesting: false,
};

const bestSellingReducer = (
  state: BestSellingState = initialState,
  payload: any
): BestSellingState => {
  switch (payload.type) {
    case booksContant.GET_BEST_SELLING.GET_BEST_SELLING:
      return {
        ...state,
        requesting: true,
      };
    case booksContant.GET_BEST_SELLING.GET_BEST_SELLING_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        success: true,
      };
    case booksContant.GET_BEST_SELLING.GET_BEST_SELLING_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        data: [],
        message: payload.message,
      };
    default:
      return state;
  }
};

export default bestSellingReducer;
