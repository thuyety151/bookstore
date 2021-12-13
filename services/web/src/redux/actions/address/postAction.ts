import api from "../../../boot/axios";
import { AddressFormSchema } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/address/actionTypes";

export const createAddress =
  (data: { value: AddressFormSchema; onSuccess: any; onFailure: any }) =>
  async (dispatch: any) => {
    try {
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
        wardCode: data?.value.ward?.code,
        districtName: data?.value.district?.name,
        provinceName: data?.value.province?.name,
        isMain: data?.value.isDefault,
      };
      const response = await api.post("/addresses", model);
      if (response.data?.isSuccess) {
        data.onSuccess();
        dispatch({ type: NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS_SUCCESS });
      } else {
        data.onFailure(response.data.error);
      }
    } catch (error: any) {
      data.onFailure(error);
    }
  };

export const setDefaultAddress =
  (id: string, onSuccess: () => void) => async (dispatch: any) => {
    try {
      dispatch({ type: NAME_ACTIONS.SET_DEFAULT.SET_DEFAULT });

      const response = await api.post("/addresses/set-default?Id=" + id);
      if (response.data.isSuccess) {
        dispatch({ type: NAME_ACTIONS.SET_DEFAULT.SET_DEFAULT_SUCCESS });
        onSuccess();
      } else {
        dispatch({ type: NAME_ACTIONS.SET_DEFAULT.SET_DEFAULT_FAIL });
      }
    } catch (error: any) {}
  };

export type deleteProps = {
  id: string;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const deleteAddress = (props: deleteProps) => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.DELETE_ADDRESS.DELETE_ADDRESS });
    const response = await api.delete("/addresses?Id=" + props.id);
    if (response.data.isSuccess) {
      dispatch({ type: NAME_ACTIONS.DELETE_ADDRESS.DELETE_ADDRESS_SUCCESS });
      props.onSuccess();
    } else {
      dispatch({ type: NAME_ACTIONS.DELETE_ADDRESS.DELETE_ADDRESS_FAIL });
      props.onFailure(response.data.error);
    }
  } catch (error: any) {
    props.onFailure(error);
  }
};

export type UpdateAddressProps = {
  value: AddressFormSchema;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};
export const updateAddress =
  (data: UpdateAddressProps) => async (dispatch: any) => {
    try {
      dispatch({ type: NAME_ACTIONS.UPDATE_ADDRESS.UPDATE_ADDRESS });
      const model = {
        id: data?.value?.id,
        firstName: data?.value.firstName,
        lastName: data?.value.lastName,
        phone: data?.value.phoneNumber,
        apartmentNumber: data?.value.appartmentNumber,
        streetAddress: data?.value.street,
        districtID: data?.value.district?.id,
        provinceID: data?.value.province?.id,
        wardName: data?.value.ward?.name,
        wardCode: data?.value.ward?.code,
        districtName: data?.value.district?.name,
        provinceName: data?.value.province?.name,
        isMain: data?.value.isDefault,
      };
      const response = await api.post("/addresses", model);
      if (response.data?.isSuccess) {
        data.onSuccess();
        dispatch({ type: NAME_ACTIONS.UPDATE_ADDRESS.UPDATE_ADDRESS_SUCCESS });
      } else {
        data.onFailure(response.data.error);
      }
    } catch (error: any) {
      data.onFailure(error);
    }
  };
