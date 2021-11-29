import apiGHN from "../../../boot/apiGHN";
import api from "../../../boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export const getProvince = () => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE });

  const response = await apiGHN.get("/master-data/province");
  if (response.status === 200) {
    dispatch({
      type: ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE_FAIL,
      message: response.data.message,
    });
  }
};
export const getDistrict = (provinceId: number) => async (dispatch: any) => {
  dispatch({
    type: ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID.GET_DISTRICT_BY_PROVINCE_ID,
  });
  if (!provinceId) {
    dispatch({
      type: ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
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
      type: ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_FAIL,
      message: response.data.message,
    });
  }
};
export const getWard = (districtId: number) => async (dispatch: any) => {
  dispatch({
    type: ACTION_NAMES.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID,
  });
  if (!districtId) {
    dispatch({
      type: ACTION_NAMES.GET_WARD_BY_DISTRICT_ID
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
      type: ACTION_NAMES.GET_WARD_BY_DISTRICT_ID
        .GET_WARD_BY_DISTRICT_ID_SUCCESS,
      data: response.data.data,
    });
  } else {
    dispatch({
      type: ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
        .GET_DISTRICT_BY_PROVINCE_ID_FAIL,
      message: response.data.message,
    });
  }
};

export const getDefaultAddress = (onSuccess: any) => async (dispatch: any) => {
  try {
    dispatch({ type: ACTION_NAMES.GET_DEFAULT.GET_DEFAULT });
    const response = await api.get("/addresses/get-default");
    if (response.data) {
      dispatch({
        type: ACTION_NAMES.GET_DEFAULT.GET_DEFAULT_SUCCESS,
        data: response.data?.value,
      });
      onSuccess();
    }
  } catch (error: any) {
    dispatch({
      type: ACTION_NAMES.GET_DEFAULT.GET_DEFAULT_FAIL,
      message: error.message,
    });
  }
};

export const getAllAddresses = () => async (dispatch: any) => {
  try {
    dispatch({ type: ACTION_NAMES.GET_ALL.GET_ALL });
    const response = await api.get("/addresses");
    if (response.data) {
      dispatch({
        type: ACTION_NAMES.GET_ALL.GET_ALL_SUCCESS,
        data: response.data?.value,
      });
    }
  } catch (error: any) {
    dispatch({
      type: ACTION_NAMES.GET_ALL.GET_ALL_FAIL,
      message: error.message,
    });
  }
};
