import apiGHN from "../../../boot/apiGHN";
import { formatVNDtoUSD } from "../../../helper/format";
import { shopAddress } from "../../../mocks/shopInfo";
import { Address } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/order/actionTypes";
import { ServiceType } from "../../reducers/deliveryReducer";
import store from "../../store";

type getFeeProps = {
  serviceType?: ServiceType;
  onSuccess: (fee: number) => void;
  onFailure: (error: any) => void;
};

export const getFee = (props: getFeeProps) => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_FEE.GET_FEE });
  const serviceType =
    props.serviceType ||
    store.getState().delivery.services.find((x) => !!x.service_id);

  const currentAddress = store.getState().address.currentAddress as Address;
  const data = {
    from_district_id: shopAddress.district_id,
    service_id: serviceType?.service_id,
    service_type_id: serviceType?.service_type_id,
    to_district_id: currentAddress.districtId,
    to_ward_code: currentAddress.wardCode,
    height: 50,
    length: 20,
    weight: 200,
    width: 20,
    coupon: null,
  };
  const response = await apiGHN.post("/v2/shipping-order/fee", data);

  if (response.data.code === 200) {
    props.onSuccess(response.data.data.service_fee);
    dispatch({
      type: NAME_ACTIONS.GET_FEE.GET_FEE_SUCCESS,
      data: formatVNDtoUSD(response.data.data.service_fee),
      service: serviceType,
    });
  } else {
    props.onFailure(response.data.message);
    dispatch({
      type: NAME_ACTIONS.GET_FEE.GET_FEE_FAIL,
      message: response.data.message,
    });
  }
};
