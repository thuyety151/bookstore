import apiGHN from "../../../boot/apiGHN";
import { shopAddress } from "../../../mocks/shopInfo";
import { Address } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/delivery/actionTypes";
import store from "../../store";

export type GetServiceProps = {
  onSuccess: (firstService: any) => void;
};

export const getServices =
  (props: GetServiceProps) => async (dispatch: any) => {
    dispatch({ type: NAME_ACTIONS.GET_SERVICE.GET_SERVICE });

    const currentAddress = store.getState().address.currentAddress as Address;

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
        data: serviceResponse.data.data.filter((x: any) => x.short_name),
      });
      props.onSuccess(
        serviceResponse.data.data.filter((x: any) => x.short_name)[0]
      );
    } else {
      dispatch({
        type: NAME_ACTIONS.GET_SERVICE.GET_SERVICE_FAIL,
        data: serviceResponse.data.message,
      });
    }
  };
