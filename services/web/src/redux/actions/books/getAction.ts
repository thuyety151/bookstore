import api from "../../../boot/axios";
import { booksContant } from "../../constants/books/actionTypes";

export const getMostView = () => async (dispatch: any) => {
  try {
    dispatch({ type: booksContant.GET_MOST_VIEW_REQUEST });

    const response = await api.get("/books/books-for-sale", {
      params: {
        predicate: "home-most-view",
      },
    });
    console.log(response);

    dispatch({
      type: booksContant.GET_MOST_VIEW_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: booksContant.GET_MOST_VIEW_FAIL,
      message: error.message,
    });
  }
};

export const getOnSale = () => async (dispatch: any) => {
  try {
    dispatch({ type: booksContant.GET_ON_SALE_REQUEST });

    const response = await api.get("/books/books-for-sale", {
      params: {
        predicate: "on-sale",
      },
    });

    console.log(response);

    dispatch({
      type: booksContant.GET_ON_SALE_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: booksContant.GET_MOST_VIEW_FAIL,
      message: error.message,
    });
  }
};

export const getDealOfWeek = () => async (dispatch: any) => {
  try {
    dispatch({ type: booksContant.GET_DEAL_OF_WEEK_REQUEST });

    const response = await api.get("/books/books-for-sale", {
      params: {
        predicate: "deal-of-week",
      },
    });

    dispatch({
      type: booksContant.GET_DEAL_OF_WEEK_SUCCESS,
      data: response.data.value,
    });
  } catch (error: any) {
    dispatch({
      type: booksContant.GET_DEAL_OF_WEEK_FAIL,
      message: error.message,
    });
  }
};

export type paginationParams = {
  pageSize: number;
  pageIndex: number;
};

export const getBooksForSale =
  (predicate: string, params?: paginationParams) => async (dispatch: any) => {
    dispatch({ type: booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE });

    const response = await api.get("/books/books-for-sale", {
      params: {
        predicate,
        pageSize: params?.pageSize,
        pageIndex: params?.pageIndex,
      },
    });

    if (response.data.value) {
      dispatch({
        type: booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
    } else {
      dispatch({
        type: booksContant.GET_BOOKS_FOR_SALE.GET_BOOKS_FOR_SALE_FAIL,
        data: response.data.error,
      });
    }
  };
