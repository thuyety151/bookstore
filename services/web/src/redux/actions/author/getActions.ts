import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/author/actionTypes";
import { paginationParams } from "../books/getAction";

export const getAllAuthor = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL });
  const response = await api.get("/authors?predicate=all");
  if (response.data) {
    dispatch({
      type: NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_ALL_AUTHOR.GET_ALL_FAIL,
      message: response.data.error,
    });
  }
};

export const getAuthorPagination =
  (predicate: string, pagination?: paginationParams) => async (dispatch: any) => {
    dispatch({
      type: NAME_ACTIONS.GET_AUTHORS_PAGINATION.GET_AUTHORS_PAGINATION,
    });
    const response = await api.get("/authors", {
      params: {
        predicate,
        pageSize: pagination?.pageSize,
        pageIndex: pagination?.pageIndex,
      },
    });
    if (response.data) {
      dispatch({
        type: NAME_ACTIONS.GET_AUTHORS_PAGINATION
          .GET_AUTHORS_PAGINATION_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
    }
  };
