import Item from "../../model/item";
import { NAME_ACTIONS } from "../constants/order/actionTypes";
import { ServiceType } from "./deliveryReducer";

export type OrderState = {
  requesting: Boolean;
  success: boolean;
  message: string;
  data: Item[];
  fee: number | null; // use null to check can check out or not
  note: string | null;
  currentService: ServiceType;
};
const initState: OrderState = {
  requesting: false,
  success: false,
  message: "",
  data: [],
  fee: 0,
  note: null,
  currentService: {} as any,
};

const orderReducer = (
  state: OrderState = initState,
  payload: any
): OrderState => {
  switch (payload.type) {
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case NAME_ACTIONS.CREATE_ORDER.CREATE_ORDER_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER.CREATE_DELIVERY_FOR_ORDER:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER
      .CREATE_DELIVERY_FOR_ORDER_SUCCESS:
      return {
        ...state,
        requesting: false,
      };
    case NAME_ACTIONS.CREATE_DELIVERY_FOR_ORDER.CREATE_DELIVERY_FOR_ORDER_FAIL:
      return {
        ...state,
        requesting: false,
        message: payload.message,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        fee: payload.data,
        currentService: payload.service,
      };
    case NAME_ACTIONS.GET_FEE.GET_FEE_FAIL:
      return {
        ...state,
        requesting: false,
        success: false,
        message: payload.message,
        fee: null,
      };
    default:
      return state;
  }
};
export default orderReducer;
