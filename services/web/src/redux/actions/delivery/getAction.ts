import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { shopAddress } from "../../../mocks/shopInfo";
import { Address } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/delivery/actionTypes";
import { NAME_ACTIONS as ADDRESS_ACTIONS } from "../../constants/address/actionTypes";
import store from "../../store";
import { last, reverse } from "lodash";

export type GetServiceProps = {
  onSuccess: (firstService: any) => void;
};

export const getServices =
  (props: GetServiceProps) => async (dispatch: any) => {
    dispatch({ type: NAME_ACTIONS.GET_SERVICE.GET_SERVICE });

    let currentAddress = store.getState().address.currentAddress as Address;

    if (!currentAddress?.districtId) {
      const response = await api.get("/addresses/get-default");
      if (response?.data) {
        currentAddress = response.data?.value;
        dispatch({
          type: ADDRESS_ACTIONS.GET_DEFAULT.GET_DEFAULT_SUCCESS,
          data: response.data?.value,
        });
      }
    }

    const serviceResponse = await apiGHN.post(
      "/v2/shipping-order/available-services",
      {
        shop_id: shopAddress.shop_id,
        from_district: shopAddress.district_id,
        to_district: currentAddress.districtId,
      }
    );
    if (serviceResponse.data.data) {
      dispatch({
        type: NAME_ACTIONS.GET_SERVICE.GET_SERVICE_SUCCESS,
        data: reverse(
          serviceResponse.data.data.filter((x: any) => x.short_name)
        ),
      });
      props.onSuccess(
        last(serviceResponse.data.data.filter((x: any) => x.short_name))
      );
    } else {
      dispatch({
        type: NAME_ACTIONS.GET_SERVICE.GET_SERVICE_FAIL,
        data: serviceResponse.data.message,
      });
    }
  };
