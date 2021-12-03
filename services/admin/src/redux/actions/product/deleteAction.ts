import api from "boot/axios";
import { ACTION_NAMES } from "./actionTypes";

export type DeleteProductProps = {
  id: string;
  onSuccess: () => void;
  onFailure: (err: any) => void;
};

export const deleteBook =
  (props: DeleteProductProps) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT });
    const response = await api.delete(`/books?Id=${props.id}`);
    if (response.data.isSuccess) {
      dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_SUCCESS });
      props.onSuccess();
    } else {
      dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_FAIL });
      props.onFailure(response.data.error);
    }
  };
