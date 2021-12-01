import api from "boot/axios";
import { BookDetail } from "model/book";
import { ACTION_NAMES } from "./actionTypes";

export type EditProductType = {
  bookParams: BookDetail;
  onSuccess: () => void;
  onFailure: (error: any) => void;
};

export const addBook = (props: EditProductType) => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT });

  const response = await api.post("/books", props.bookParams);
  console.log("reponse");
  if(response.data?.isSuccess){
      dispatch({
          type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_SUCCESS,
          data: response.data.value
      });
      props.onSuccess();
  }
  else {
    dispatch({
        type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_FAIL,
        message: response.data.error
    });
    props.onFailure(response.data.error);
  }
};
