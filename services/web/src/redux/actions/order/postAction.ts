import { omit } from "lodash";
import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { apiFCM } from "../../../boot/firebase";
import { formatAddress } from "../../../helper/format";

import { shopAddress } from "../../../mocks/shopInfo";
import { Address } from "../../../model/address";
import { Order } from "../../../model/order";
import { NAME_ACTIONS } from "../../constants/coupon/actionTypes";
import { NAME_ACTIONS as NAME_ACTIONS_ORDER } from "../../constants/order/actionTypes";
import store from "../../store";

export type CreateOrderProps = {
  note: string;
  paymentMethod: number;
  onSuccess: (orderId: any) => void;
  onFailure: (error: any) => void;
};

export const createOrder =
  (props: CreateOrderProps) => async (dispatch: any) => {
    const state = store.getState();
    dispatch({ type: NAME_ACTIONS_ORDER.CREATE_ORDER.CREATE_ORDER });
    const address = store.getState().address.currentAddress;
    const data = {
      itemIds: state.cart.itemToCheckOut.flatMap((x) => x.id),
      addressId: state.address.currentAddress.id,
      orderNote: props.note,
      couponId: state.coupons.selectedCoupon?.id,
      address: omit(address, "id"),
      orderFee: state.order.fee,
      paymentMethod: props.paymentMethod,
      serviceTypeId: state.order.currentService.service_type_id,
      serviceId: state.order.currentService.service_id,
    };
    const response = await api.post("/orders/create", data);

    if (response.data.isSuccess) {
      props.onSuccess(response.data.value);
      dispatch({ type: NAME_ACTIONS_ORDER.CREATE_ORDER.CREATE_ORDER_SUCCESS });
      dispatch({
        type: NAME_ACTIONS.USER_REMOVE_APPLY_COUPON
          .USER_REMOVE_APPLY_COUPON_SUCCESS,
      });
    } else {
      props.onFailure(response.data.error);
      dispatch({
        type: NAME_ACTIONS_ORDER.CREATE_ORDER.CREATE_ORDER_FAIL,
        message: response.data.error,
      });
    }
  };

export type CancelOrderProps = {
  orderCode: string;
  orderId: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const cancelOrder =
  (props: CancelOrderProps) => async (dispatch: any) => {
    try {
      const response = await apiGHN.post("/v2/switch-status/cancel", {
        order_codes: [props.orderCode],
        shop_id: shopAddress.shop_id,
      });
      if (response.data.code === 200) {
        const result = await api.post("/orders/update-order-status", {
          orderCode: props.orderCode,
        });
        if (result.data.isSuccess) {
          props.onSuccess();
          dispatch({
            type: NAME_ACTIONS_ORDER.CANCCEL_ORDER.REMOVE_ORDER_FROM_ARRAY,
            orderCode: props.orderCode,
          });

          // create noti to admin

          const tokens = await api.get("/notis/list-admin-token");
          Promise.all(
            tokens.data.value.map(async (token: string) => {
              await apiFCM.post("/send", {
                to: token,
                notification: {
                  title: `Order was canceled `,
                  body: `Order ${props.orderCode} was canceled `,
                  mutable_content: true,
                  sound: "Tri-tone",
                },
              });
            })
          );
          await api.post("/notis/create", {
            fcmTokens: tokens.data.value,
            userIds: [],
            metadata: JSON.stringify({
              title: `Order ${props.orderCode} was canceled `,
              body: {
                type: "Canceled",
                orderCode: props.orderCode,
                orderId: props.orderId,
                contents: `Order ${props.orderCode} was canceled `,
                custom: false,
              },
              mutable_content: true,
              sound: "Tri-tone",
            }),
            createdDate: new Date(),
          });
          return;
        }
      }
      throw new Error(response.data?.message);
    } catch (error: any) {
      props.onFailure(error);
    }
  };

export type CreateOrderGHNProps = {
  order: Order;
  address: Address;
  onSuccess: (code: any, orderId: any) => void;
  onFailure: (error: any) => void;
};

export const createOrderGHN =
  (props: CreateOrderGHNProps) => async (dispatch: any) => {
    dispatch({
      type: NAME_ACTIONS_ORDER.CREATE_DELIVERY_FOR_ORDER
        .CREATE_DELIVERY_FOR_ORDER,
    });
    //call api GHN
    const order = {
      payment_type_id: 2,
      note: props.order.orderNote,
      return_phone: props.address.phone,
      return_address: formatAddress(props.address),
      return_district_id: shopAddress.district_id,
      return_ward_code: shopAddress.ward_code,
      to_name: props.address.firstName + " " + props.address.lastName,
      to_phone: props.address.phone,
      to_address: formatAddress(props.address),
      to_district_id: props.address.districtId,
      to_ward_code: props.address.wardCode,
      required_note: "KHONGCHOXEMHANG",
      deliver_station_id: null,
      weight: 200,
      order_value: Math.round(props.order.total * 23000),
      service_type_id: props.order.serviceTypeId,
      service_id: props.order.serviceId,
      insurance_value: Math.round(props.order.total * 23000),
      cod_amount:
        props.order.paymentMethod === "MoMo" //MoMo
          ? 0
          : Math.round(props.order.total * 23000),
      pick_station_id: 1444,
      items: props.order.items.map((item) => {
        return {
          name: item.productName,
          quantity: item.quantity,
          price: Math.round(item.price * 23000),
          category: {
            level1: "book",
          },
        };
      }),
    };
    try {
      const createDelivery = await apiGHN.post(
        "/v2/shipping-order/create",
        order
      );
      if (createDelivery.data.code === 200) {
        // TODO: Integrate API UPDATE ORDER CODE
        const resultUpdateOrderCode = await api.post(
          "/orders/update-order-code",
          {
            id: props.order.id,
            orderCode: createDelivery.data.data.order_code,
          }
        );
        if (resultUpdateOrderCode.data.isSuccess) {
          props.onSuccess(
            createDelivery.data.data.order_code,
            resultUpdateOrderCode.data.value
          );
          dispatch({
            type: NAME_ACTIONS_ORDER.CREATE_DELIVERY_FOR_ORDER
              .CREATE_DELIVERY_FOR_ORDER_SUCCESS,
          });
          const tokens = await api.get("/notis/list-admin-token");
          await apiFCM.post("/send", {
            to: JSON.stringify(tokens.data.value),
            notification: {
              title: `New order`,
              body: `You have a new order - ${createDelivery.data.data.order_code} `,
              mutable_content: true,
              sound: "Tri-tone",
            },
          });
          await api.post("/notis/create", {
            fcmTokens: tokens.data.value,
            metadata: JSON.stringify({
              title: `New order`,
              body: {
                type: "Ready To Pick",
                orderCode: createDelivery.data.data.order_code,
                orderId: props.order.id,
                contents: `You have a new order - ${createDelivery.data.data.order_code}`,
              },
              mutable_content: true,
              sound: "Tri-tone",
            }),
            createdDate: new Date(),
          });
        } else {
          /**
           * Delete order when create GHN fail
           */
          await api.delete("/orders/delete-order-fail", {
            params: {
              id: props.order.id,
            },
          });
          props.onFailure("Create order fail!");
          dispatch({
            type: NAME_ACTIONS_ORDER.CREATE_DELIVERY_FOR_ORDER
              .CREATE_DELIVERY_FOR_ORDER_FAIL,
            message: resultUpdateOrderCode.data.message,
          });
        }
      }
    } catch (error: any) {
      /**
       * Delete order when create GHN fail
       */
      await api.delete("/orders/delete-order-fail", {
        params: {
          id: props.order.id,
        },
      });
      props.onFailure(error.response?.data?.message);
      dispatch({
        type: NAME_ACTIONS_ORDER.CREATE_DELIVERY_FOR_ORDER
          .CREATE_DELIVERY_FOR_ORDER_FAIL,
        message: error?.message,
      });
    }
  };
