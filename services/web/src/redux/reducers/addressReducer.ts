import { NAME_ACTIONS } from "../constants/address/actionTypes";

const initState = {
  requesting: true,
  success: false,
  message: null,
  data: {
    province: [],
    district: [],
    ward: [],
  },
};

const addressReducer = (state = initState, payload: any) => {
  console.log("payload", payload);
  switch (payload.type) {
    case NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          province: payload.data,
        },
      };
    case NAME_ACTIONS.GET_ALL_PROVINCE.GET_ALL_PROVINCE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID.GET_DISTRICT_BY_PROVINCE_ID:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
      .GET_DISTRICT_BY_PROVINCE_ID_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          district: payload.data,
        },
      };
    case NAME_ACTIONS.GET_DISTRICT_BY_PROVINCE_ID
      .GET_DISTRICT_BY_PROVINCE_ID_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          ward: payload.data,
        },
      };
    case NAME_ACTIONS.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    default:
      return state;
  }
};
export default addressReducer;
