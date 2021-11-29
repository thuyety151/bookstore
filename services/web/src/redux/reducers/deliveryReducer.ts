import { NAME_ACTIONS } from "../constants/delivery/actionTypes";

export type ServiceType = {
  service_id: number;
  short_name: string;
  service_type_id: number;
};
export type DeliveryState = {
  requesting: boolean;
  services: ServiceType[];
  currentService: ServiceType;
};

const initState: DeliveryState = {
  requesting: false,
  services: [] as any,
  currentService: {} as any,
};

const deliveryReducer = (
  state: DeliveryState = initState,
  payload: any
): DeliveryState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_SERVICE.GET_SERVICE:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_SERVICE.GET_SERVICE_SUCCESS:
      return {
        ...state,
        services: payload.data,
      };
    case NAME_ACTIONS.GET_SERVICE.GET_SERVICE_FAIL:
      return {
        ...state,
        services: payload.message,
      };
    default:
      return state;
  }
};

export default deliveryReducer;
