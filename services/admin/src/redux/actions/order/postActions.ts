import apiGHN from "boot/apiGHN";
import api from "boot/axios";
import { shopInfo } from "mock/shopInfo";
import { Order } from "model/order";
import { ACTION_NAMES } from "./actionTypes";

type OrderProps = {
  order: Order;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const cancelOrder = (props: OrderProps) => async (dispatch: any) => {
  try {
    dispatch({ type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER });
    const response = await apiGHN.post("/v2/switch-status/cancel", {
      shop_id: shopInfo.shop_id,
      order_codes: [props.order.orderCode],
    });

    if (response.data.code === 200) {
      const result = await api.post("/orders/update-order-status", {
        orderCode: props.order.orderCode,
      });
      if (result.data.isSuccess) {
        props.onSuccess();
        dispatch({
          type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER_SUCCESS,
          order: props.order,
        });
      } else {
        props.onFailure(response.data?.message);
        dispatch({
          type: ACTION_NAMES.CANCEL_ORDER.CANCEL_ORDER_FAIL,
        });
      }
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
type UpdateOrderProps = {
  orderId: string;
  orderNote: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const updateOrderNote =
  (props: UpdateOrderProps) => async (dispatch: any) => {
    try {
      dispatch({ type: ACTION_NAMES.UPDATE_ORDER.UPDATE_ORDER_NOTE });
      const response = await api.post("orders/update-order-note", {
        orderId: props.orderId,
        orderNote: props.orderNote,
      });
      if (response.data?.isSuccess) {
        props.onSuccess();
        dispatch({
          type: ACTION_NAMES.UPDATE_ORDER.UPDATE_ORDER_NOTE_SUCCESS,
        });
      } else {
        props.onFailure(response.data.message);
        dispatch({
          type: ACTION_NAMES.UPDATE_ORDER.UPDATE_ORDER_NOTE_FAIL,
        });
      }
    } catch (error) {
      props.onFailure(error);
      dispatch({
        type: ACTION_NAMES.UPDATE_ORDER.UPDATE_ORDER_NOTE_FAIL,
      });
    }
  };
