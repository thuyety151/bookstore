import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
  pagination: Pagination;
  keywords: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getCategories = () => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_CATEGORIES });

  var response = await api.get("/categories/all");

  if (response.data?.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_SUCCESS,
      data: response.data.value,
    });
  } else {
    dispatch({
      type: ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_FAIL,
      message: response.data.error,
    });
  }
};

export const getCategoryPagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION });
    const response = await api.get("/categories/all", {
      params: {
        ...props.pagination,
        keywords: props.keywords,
      },
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_FAIL,
        data: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };
export const getListParent =
  (onSuccess: (data: any) => void) => async (dispatch: any) => {
    const response = await api.get("/categories/all");
    if (response.data.isSuccess) {
      onSuccess(response.data.value);
    }
  };
