import api from "boot/axios";
import { omit } from "lodash";
import { FnActionProps } from "model/actionProps";
import { Coupon } from "redux/reducers/couponReducer";
import { ACTION_NAMES } from "./actionType";

export const upsertCoupon =
  (props: { data: Coupon } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON});
      const response = props.data.id
        ? await api.post("/coupons", props.data)
        : await api.post("/coupons", omit(props.data, "id"));

      if (response.data.isSuccess) {
        dispatch({
          type: ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON_SUCCESS,
          data: response.data.value,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON_FAIL,
          data: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({
        type: ACTION_NAMES.UPSERT_COUPON.UPSERT_COUPON_FAIL,
        data: error,
      });
      props.onFailure(error);
    }
  };

export const deleteCoupon =
  (props: { id: string } & FnActionProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.DELETE_COUPON.DELETE_COUPON});
      const response = await api.delete("/coupons", {
        data: {
          id: props.id,
        },
      });

      if (response.data.isSuccess) {
        dispatch({ type: ACTION_NAMES.DELETE_COUPON.DELETE_COUPON_SUCCESS});
        props.onSuccess();
      } else {
        dispatch({ type: ACTION_NAMES.DELETE_COUPON.DELETE_COUPON_FAIL});
        props.onFailure(response.data.error);
      }
    } catch (error: any) {
      dispatch({ type: ACTION_NAMES.DELETE_COUPON.DELETE_COUPON_FAIL});
      props.onFailure(error);
    }
  };
