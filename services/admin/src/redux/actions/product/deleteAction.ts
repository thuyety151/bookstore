import api from "boot/axios";
import store from "redux/store";
import { ACTION_NAMES } from "./actionTypes";
import { getProductPagination } from "./getActions";

export type DeleteProductProps = {
  id: string;
  onSuccess: () => void;
  onFailure: (err: any) => void;
};

export const deleteBook = (props: DeleteProductProps) => async (
  dispatch: any
) => {
  const productState = store.getState().books;
  dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT });
  const response = await api.delete(`/books?Id=${props.id}`);
  if (response.data.isSuccess) {
    dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_SUCCESS });
    getProductPagination({
      pagination: productState.pagination,
      onSuccess: () => {
        console.log("deletinnggg");
      },
      onFailure: () => {},
    });
    console.log("deletinnggg 2");
    props.onSuccess();
  } else {
    dispatch({ type: ACTION_NAMES.DELETE_PRODUCT.DELETE_PRODUCT_FAIL });
    props.onFailure(response.data.error);
  }
};
