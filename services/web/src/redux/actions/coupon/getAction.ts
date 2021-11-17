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
