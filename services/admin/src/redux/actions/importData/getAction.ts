import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
  pagination: Pagination;
  onSuccess: () => void;
  onFailure: (error: any) => void;
  keywords: string;
};
export const getImportDataPagination =
  (props: getPaginationType) => async (dispatch: any) => {
    dispatch({ type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION });
    const response = await api.get("/books/import", {
      params: {
        ...props.pagination,
        keywords: props.keywords,
      },
    });

    if (response.data.isSuccess) {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_SUCCESS,
        data: response.data.value,
        pagination: response.headers.pagination,
      });
      props.onSuccess();
    } else {
      dispatch({
        type: ACTION_NAMES.GET_PAGINATION.GET_PAGINATION_FAIL,
        data: response.data.error,
      });
      props.onFailure(response.data.error);
    }
  };

export const getDataExport = () => async (dispatch: any) => {
  dispatch({ type: ACTION_NAMES.EXPORT.EXPORT });
  const response = await api.get("/export", {
    responseType: "arraybuffer",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Import-data-samples.zip"); //or any other extension
  document.body.appendChild(link);
  link.click();
};
