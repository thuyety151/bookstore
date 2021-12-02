import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
  pagination: Pagination;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getAttributePagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION });
    const response = await api.get("/attributes", {
      params: props.pagination,
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_SUCCESS,
        data: response.data.value,
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
