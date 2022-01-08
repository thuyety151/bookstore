import { omit } from "lodash";
import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { formatAddress } from "../../../helper/format";
import { shopAddress } from "../../../mocks/shopInfo";
import { PaymentMethod } from "../../../shared/enum/paymentMethod";
import { NAME_ACTIONS } from "../../constants/order/actionTypes";
import { total } from "../../reducers/orderReducer";
import store from "../../store";

export type CreateOrderProps = {
  note: string;
  paymentMethod: any;
  onSuccess: (code: any, orderId: any) => void;
  onFailure: (error: any) => void;
};
export const createOrder =
  (props: CreateOrderProps) => async (dispatch: any) => {
    const state = store.getState();
    dispatch({ type: NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER });
    const address = store.getState().address.currentAddress;
    const data = {
      itemIds: state.cart.itemToCheckOut.flatMap((x) => x.id),
      addressId: state.address.currentAddress.id,
      orderNote: props.note,
      coupon: {
        code: state.order.coupon?.code,
      },
      address: omit(address, "id"),
      orderFee: state.order.fee,
      paymentMethod: props.paymentMethod || "1",
    };
    const response = await api.post("/orders/create", data);

    if (response.data.isSuccess) {
      dispatch({ type: NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_SUCCESS });
      //call api GHN
      const order = {
        payment_type_id: 2,
        note: props.note,
        return_phone: address.phone,
        return_address: formatAddress(address),
        return_district_id: shopAddress.district_id,
        return_ward_code: shopAddress.ward_code,
        to_name: address.firstName + " " + address.lastName,
        to_phone: address.phone,
        to_address: formatAddress(address),
        to_district_id: address.districtId,
        to_ward_code: address.wardCode,
        required_note: "KHONGCHOXEMHANG",
        deliver_station_id: null,
        weight: 200,
        order_value: Math.round(total() * 23000),
        service_type_id: state.order.currentService.service_type_id,
        service_id: state.order.currentService.service_id,
        insurance_value: Math.round(total() * 23000),
        cod_amount:
          props.paymentMethod === PaymentMethod.Momo
            ? 0
            : Math.round(total() * 23000),
        pick_station_id: 1444,
        items: state.cart.itemToCheckOut.map((item) => {
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
              id: response.data.value,
              orderCode: createDelivery.data.data.order_code,
            }
          );
          if (resultUpdateOrderCode.data.isSuccess) {
            props.onSuccess(
              createDelivery.data.data.order_code,
              resultUpdateOrderCode.data.value
            );
            dispatch({
              type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
                .CREATE_DELIVERY_FOR_ORDER_SUCCESS,
            });
          } else {
            /**
             * Delete order when create GHN fail
             */
            await api.delete("/orders", {
              params: {
                id: response.data.value,
              },
            });
            props.onFailure("Create order fail!");
            dispatch({
              type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
                .CREATE_DELIVERY_FOR_ORDER_FAIL,
              message: resultUpdateOrderCode.data.message,
            });
          }
        }
      } catch (error: any) {
        /**
         * Delete order when create GHN fail
         */
        await api.delete("/orders", {
          params: {
            id: response.data.value,
          },
        });
        props.onFailure(error.response?.data?.message);
        dispatch({
          type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
            .CREATE_DELIVERY_FOR_ORDER_FAIL,
          message: error?.message,
        });
      }
    } else {
      props.onFailure(response.data.error);
      dispatch({
        type: NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_FAIL,
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
            type: NAME_ACTIONS.CANCCEL_ORDER.REMOVE_ORDER_FROM_ARRAY,
            orderCode: props.orderCode,
          });
        } else {
          props.onFailure(response.data?.message);
        }
      } else {
        props.onFailure(response.data?.message);
      }
    } catch (error: any) {
      props.onFailure(error);
    }
  };
