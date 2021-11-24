import { Address } from "model/address";
import { ACTION_NAMES } from "redux/actions/address/actionTypes";

const initState = {
  requesting: false,
  success: false,
  message: null,
  data: {
    province: [],
    district: [],
    ward: [],
  },
  addresses: [] as Address[],
  currentAddress: {} as Address,
};

const addressReducer = (state = initState, payload: any) => {
  switch (payload.type) {
    case ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          province: payload.data,
        },
      };
    case ACTION_NAMES.GET_ALL_PROVINCE.GET_ALL_PROVINCE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID.GET_DISTRICT_BY_PROVINCE_ID:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
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
    case ACTION_NAMES.GET_DISTRICT_BY_PROVINCE_ID
      .GET_DISTRICT_BY_PROVINCE_ID_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        data: {
          ...state.data,
          ward: payload.data,
        },
      };
    case ACTION_NAMES.GET_WARD_BY_DISTRICT_ID.GET_WARD_BY_DISTRICT_ID_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.CREATE_ADDRESS.CREATE_ADDRESS:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.CREATE_ADDRESS.CREATE_ADDRESS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case ACTION_NAMES.CREATE_ADDRESS.CREATE_ADDRESS_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_DEFAULT.GET_DEFAULT:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.GET_DEFAULT.GET_DEFAULT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        currentAddress: payload.data,
      };
    case ACTION_NAMES.GET_DEFAULT.GET_DEFAULT_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.GET_ALL.GET_ALL:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.GET_ALL.GET_ALL_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        addresses: payload.data,
      };
    case ACTION_NAMES.GET_ALL.GET_ALL_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
      };
    case ACTION_NAMES.SET_CURRENT_ADDRESS.SET_CURRENT_ADDRESS:
      return {
        ...state,
        currentAddress: payload.data,
      };
    case ACTION_NAMES.SET_DEFAULT.SET_DEFAULT:
      return {
        ...state,
        requesting: true,
        success: false,
      };
    case ACTION_NAMES.SET_DEFAULT.SET_DEFAULT_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
      };
    case ACTION_NAMES.SET_DEFAULT.SET_DEFAULT_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
      };
    default:
      return state;
  }
};
export default addressReducer;
