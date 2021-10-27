import apiGHN from "../../../boot/apiGHN";
import { NAME_ACTIONS } from "../../constants/address/actionTypes";

export const getProvince = () => async (dispatch: any) => {
  dispatch({ type: NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE });

  const response = await apiGHN.get("/province");
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
  const response = await apiGHN.get(`/district?province_id=${provinceId}`);
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
  const response = await apiGHN.get(`/ward?district_id=${districtId}`);
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
