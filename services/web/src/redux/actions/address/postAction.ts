import api from "../../../boot/axios";
import { AddressFormSchema } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/address/actionTypes";

export const createAddress =
  (data: { value: AddressFormSchema; onSuccess: any; onFailure: any }) =>
  async (dispatch: any) => {
    dispatch({ type: NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS });
    const model = {
      firstName: data?.value.firstName,
      lastName: data?.value.lastName,
      phone: data?.value.phoneNumber,
      apartmentNumber: data?.value.appartmentNumber,
      streetAddress: data?.value.street,
      districtID: data?.value.district?.id,
      provinceID: data?.value.province?.id,
      wardName: data?.value.ward?.name,
      districtName: data?.value.district?.name,
      provinceName: data?.value.province?.name,
    };
    const response = await api.post("/addresses", model);
    if (response.data?.isSuccess) {
      data.onSuccess();
      dispatch({ type: NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS_SUCCESS });
    } else {
      data.onFailure();
    }
  };
