import { Book } from "../../model";
import { booksContant } from "../constants/books/actionTypes";

export type BooksSate = {
  success: Boolean;
  data: Book[];
  message: string | null;
  requesting: boolean;
  pagination: {
    pageIndex: number;
    pageSize: number;
    totalPage: number;
    totalCount: number;
  };
  keywords?: string | null;
};

const initialState: BooksSate = {
  success: true,
  data: [] as Book[],
  message: null,
  requesting: false,
  pagination: {
    pageIndex: 0,
    pageSize: 20,
    totalPage: 0,
    totalCount: 0,
  },
  keywords: null,
};

const booksReducer = (
  state: BooksSate = initialState,
  payload: any
): BooksSate => {
  switch (payload.type) {
    case booksContant.GET_MOST_VIEW_REQUEST:
      return {
        ...state,
      };
    case booksContant.GET_MOST_VIEW_SUCCESS:
      return {
        ...state,
        success: true,
        data: payload.data,
      };
    case booksContant.GET_MOST_VIEW_FAIL:
      return {
        ...state,
        success: false,
        message: payload.message,
      };
    case booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE:
      return {
        ...state,
        requesting: true,
      };
    case booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE_SUCCESS:
      return {
        ...state,
        requesting: false,
        data: payload.data,
        success: true,
        pagination: JSON.parse(payload.pagination),
      };
    case booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        data: [],
        message: payload.message,
      };
    case booksContant.SET_KEYWORDS:
      return {
        ...state,
        keywords: payload.data,
      };
    default:
      return state;
  }
};

export default booksReducer;
