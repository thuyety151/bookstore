import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/shopLocation/actionTypes";
import store from "../../store";

export const getShopLocation = () => async (dispatch: any) => {
  dispatch({
    type: NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION,
  });
  const state = store.getState().shopLocation;
  if (!state.data) {
    try {
      const response = await api.get(`/settings/address`);
      if (response.data.isSuccess) {
        dispatch({
          type: NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION_SUCCESS,
          data: response.data.value,
        });
      } else {
        throw new Error(response.data.error);
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
  dispatch({
    type: NAME_ACTIONS.GET_SHOP_LOCATION.GET_SHOP_LOCATION_FINALLY,
  });
};
