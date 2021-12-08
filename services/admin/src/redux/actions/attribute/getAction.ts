import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getAtributeType = {
  onSuccess: (data: any) => void;
  onFailure: (error: any) => void;
};


export const getAttributes =
  (props: getAtributeType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_ATTRIBUTES });

    var response = await api.get("/attributes");

    if (response.data?.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_SUCCESS,
        data: response.data.value,
      });
      props.onSuccess(response.data.value);
    } else {
      dispatch({
        type: ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_FAIL,
        message: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };

  
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
