import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionType";

export type getPaginationType = {
  pagination: Pagination;
  predicate: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const getCouponPagination = (props: getPaginationType) => async (
  dispatch: any
) => {
  dispatch({ type: ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION });
  const response = await api.get("/coupons", {
    params: {
      pageSize: props.pagination.pageSize,
      pageIndex: props.pagination.pageIndex,
      predicate: props.predicate,
    },
  });

  if (response.data.isSuccess) {
    dispatch({
      type: ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION_SUCCESS,
      data: response.data.value,
      pagination: response.headers.pagination,
    });
    props.onSuccess();
  } else {
    dispatch({
      type: ACTION_NAMES.GET_PAGINATION.GET_COUPON_PAGINATION_FAIL,
      data: response.data.error,
    });
    props.onFailure(response.data.error);
  }
};
