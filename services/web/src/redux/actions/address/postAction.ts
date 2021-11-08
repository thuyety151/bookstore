import api from "../../../boot/axios";
import { AddressFormSchema } from "../../../pages/shoppingcart/ShoppingCartPage";
import { NAME_ACTIONS } from "../../constants/address/actionTypes";

export const createAddress =
  (data: AddressFormSchema) => async (dispatch: any) => {
    dispatch({ type: NAME_ACTIONS.CREATE_ADDRESS.CREATE_ADDRESS });
    const response = await api.post("/addresses", data);
    console.log("tru", response);
  };
