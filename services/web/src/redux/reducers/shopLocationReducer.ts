import { NAME_ACTIONS } from "../constants/shopLocation/actionTypes";

export type ShopLocationState = {
  success: Boolean;
  data: {
    Longitude: number;
    Latitude: number;
    FullAddress: string;
  } | null;
  message: string | null;
  requesting: boolean;
};

const initialState: ShopLocationState = {
  success: true,
  data: null,
  message: null,
  requesting: false,
};

const shopLocationReducer = (
  state: ShopLocationState = initialState,
  payload: any
): ShopLocationState => {
  switch (payload.type) {
    case NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION:
      return {
        ...state,
        requesting: true,
      };
    case NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION_SUCCESS:
      return {
        ...state,
        data: JSON.parse(payload.data.metaData),
      };
    case NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION_FINALLY:
      return {
        ...state,
        requesting: false,
      };
    default:
      return state;
  }
};

export default shopLocationReducer;
