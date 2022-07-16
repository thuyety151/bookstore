import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/coupon/actionTypes";
import store from "../../store";

export const verifyCoupon = (code: string) => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON });
    const response = await api.post("/coupons/verify", {
      code,
      items: store.getState().cart.itemToCheckOut,
    });
    if (response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON_SUCCESS,
        data: response.data.value,
      });
    } else if (!response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON_FAIL,
        message: response.data.error,
      });
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.VERIFY_COUPON.VERIFY_COUPON_FAIL,
      message: error.message,
    });
  }
};

export const getCoupons = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE });

    const response = await api.get("/coupons", {
      params: {
        pageSize: 50,
        predicate: "unExpired",
      },
    });

    if (response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE_SUCCESS,
        data: response.data.value,
      });
    } else if (!response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE_FAILED,
        message: response.data.error,
      });
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.COUPON_HOMEPAGE.GET_COUPON_HOMEPAGE_FAILED,
      message: error.message,
    });
  }
};

export const getUserCoupons = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.COUPON_USER.GET_COUPON_USER });

    const response = await api.get("/coupons/user-coupons");

    if (response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.COUPON_USER.GET_COUPON_USER_SUCCESS,
        data: response.data.value,
      });
    } else if (!response.data.isSuccess) {
      dispatch({
        type: NAME_ACTIONS.COUPON_USER.GET_COUPON_USER_FAILED,
        message: response.data.error,
      });
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.COUPON_USER.GET_COUPON_USER_FAILED,
      message: error.message,
    });
  }
};
