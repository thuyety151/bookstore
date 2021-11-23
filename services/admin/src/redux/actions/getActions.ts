import api from "../../boot/axios";
import { Pagination } from "../../helper/paginationValue";
import { ACTION_NAMES } from "./actionNames";

export type getPaginationType = {
  pagination: Pagination;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getOrderPagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION });
    const response = await api.get("/orders", {
      params: props.pagination,
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_SUCCESS,
        data: response.data.value,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.GET_ORDER_PAGINATION.GET_ORDER_PAGINATION_SUCCESS,
        data: response.data.value,
      });
      props.onFailure(response.data.error);
    }
  };
