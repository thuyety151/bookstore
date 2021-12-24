import apiGHN from "boot/apiGHN";
import { shopInfo } from "mock/shopInfo";
import { Order } from "model/order";
import { ACTION_NAMES } from "./actionTypes";

type CancelOrderProps = {
  order: Order;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const cancelOrder =
  (props: CancelOrderProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER });
      const response = await apiGHN.post("/v2/switch-status/cancel", {
        shop_id: shopInfo.shop_id,
        order_codes: [props.order.orderCode],
      });
      dispatch({
        type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER_SUCCESS,
        order: props.order,
      });
      if (response.data.code === 200) {
        props.onSuccess();
      } else {
        props.onFailure(response.data.message);
        dispatch({
          type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER_FAIL,
        });
      }
    } catch (error) {
      props.onFailure(error);
      dispatch({
        type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER_FAIL,
      });
    }
  };
