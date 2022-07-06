import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { Address } from "../../../model/address";
import { NAME_ACTIONS } from "../../constants/address/actionTypes";

export const getProvince = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE });

  const response = await apiGHN.get("/master-data/province");
  if (response.status === 200) {
    dispatch({
      type: NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE_FAIL,
      message: response.data.message,
    });
  }
};
export const getDistrict = (provinceId: number) => async (dispatch: any) => {
  dispatch({
    type: NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID.GET_DISTRICT_BY_PROVINCE_ID,
  });
  if (!provinceId) {
    dispatch({
      type: NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
      data: [],
    });
    return;
  }
  const response = await apiGHN.get(
    `/master-data/district?province_id=${provinceId}`
  );
  if (response.status === 200) {
    dispatch({
      type: NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_FAIL,
      message: response.data.message,
    });
  }
};
export const getWard = (districtId: number) => async (dispatch: any) => {
  dispatch({
    type: NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID,
  });
  if (!districtId) {
    dispatch({
      type: NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID
        .GET_WARD_BY_DISTRICT_ID_SUCCESS,
      data: [],
    });
    return;
  }
  const response = await apiGHN.get(
    `/master-data/ward?district_id=${districtId}`
  );
  if (response.status === 200) {
    dispatch({
      type: NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID
        .GET_WARD_BY_DISTRICT_ID_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_FAIL,
      message: response.data.message,
    });
  }
};

type getDefaultAddressProps = {
  onSuccess: (defaultAddresss : Address) => void
};
export const getDefaultAddress = (props : getDefaultAddressProps) => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.GET_DEFAULT.GET_DEFAULT });
    const response = await api.get("/addresses/get-default");
    if (response.data) {
      dispatch({
        type: NAME_ACTIONS.GET_DEFAULT.GET_DEFAULT_SUCCESS,
        data: response.data?.value,
      });
      props.onSuccess(response.data?.value);
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.GET_DEFAULT.GET_DEFAULT_FAIL,
      message: error.message,
    });
  }
};

export const getAllAddresses = () => async (dispatch: any) => {
  try {
    dispatch({ type: NAME_ACTIONS.GET_ALL_ADDRESS.GET_ALL });
    const response = await api.get("/addresses");
    if (response.data) {
      dispatch({
        type: NAME_ACTIONS.GET_ALL_ADDRESS.GET_ALL_SUCCESS,
        data: response.data?.value,
      });
    }
  } catch (error: any) {
    dispatch({
      type: NAME_ACTIONS.GET_ALL_ADDRESS.GET_ALL_FAIL,
      message: error.message,
    });
  }
};
