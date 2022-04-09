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
  Promise.all(
    props.bookParams.files?.map(async (file: any) => {
      if (file.type) {
        //is file
        let formData = new FormData();
        formData.append("File", file);
        const res = await api.post("/medias", formData, {
          headers: { "Content-type": "multipart/form-data" },
        });
        return res.data.value;
      }
      return file;
    })
  )
    .then(async (results) => {
      const response = await api.post("/books", {
        ...props.bookParams,
        media: results,
      });
      if (response.data?.isSuccess) {
        dispatch({
          type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_SUCCESS,
          data: response.data.value,
        });
        props.onSuccess();
      } else {
        dispatch({
          type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_FAIL,
          message: response.data.error,
        });
        props.onFailure(response.data.error);
      }
    })
    .catch((err) => {
      // TODO: improvement: create function wrap error and show popup message
      dispatch({
        type: ACTION_NAMES.EDIT_PRODUCT.EDIT_PRODUCT_FAIL,
        message: err.message,
      });
      props.onFailure(err.message);
    });
};
