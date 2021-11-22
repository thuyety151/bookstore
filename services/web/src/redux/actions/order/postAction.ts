import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { formatAddress } from "../../../helper/format";
import { NAME_ACTIONS } from "../../constants/order/actionTypes";
import store from "../../store";

export type CreateOrderProps = {
  note: string;
  onSuccess: any;
  onFailure: any;
};
export const createOrder =
  (props: CreateOrderProps) => async (dispatch: any) => {
    const state = store.getState();
    const address = store.getState().address.currentAddress;

    const data = {
      itemIds: state.cart.itemToCheckOut.flatMap((x) => x.id),
      addressId: state.address.currentAddress.id,
      note: props.note,
    };
    const response = await api.post("/orders", data);

    if (response.data.value) {
      dispatch({ type: NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_SUCCESS });

      const order = {
        payment_type_id: 2,
        note: props.note,
        return_phone: address.phone,
        return_address: formatAddress(address),
        return_district_id: 1566,
        return_ward_code: "510104",
        to_name: address.firstName + " " + address.lastName,
        to_phone: address.phone,
        to_address: formatAddress(address),
        to_district_id: 1566,
        to_ward_code: "510102",
        required_note: "KHONGCHOXEMHANG",
        deliver_station_id: null,
        weight: 200,
        order_value: 200000,
        service_type_id: 2,
        service_id: 0,
        insurance_value: 100000,
        cod_amount: 200000,
        pick_station_id: 1444,
        items: state.cart.itemToCheckOut.map((item) => {
          return {
            name: item.productName,
            code: "hi",
            quantity: item.quantity,
            price: item.price,
            category: {
              level1: "book",
            },
          };
        }),
      };

      const createDelivery = await apiGHN.post(
        "/v2/shipping-order/create",
        order
      );

      if (createDelivery.status === 200) {
        // TODO: Integrate API UPDATE ORDER CODE
        const resultUpdateOrderCode = await api.post(
          "/orders/update-order-code",
          {
            id: response.data.value.id,
            orderCode: createDelivery.data.order_code,
          }
        );
        if (resultUpdateOrderCode.data.code === 400) {
          props.onFailure(resultUpdateOrderCode.data.message);
          dispatch({
            type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
              .CREATE_DELIVERY_FOR_ORDER_FAIL,
            message: resultUpdateOrderCode.data.message,
          });
        }

        props.onSuccess();
        dispatch({
          type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
            .CREATE_DELIVERY_FOR_ORDER_SUCCESS,
        });
      } else {
        console.log("cretae faile");
        props.onFailure(createDelivery.data.error);
        dispatch({
          type: NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
            .CREATE_DELIVERY_FOR_ORDER_FAIL,
          message: createDelivery.data.message,
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
