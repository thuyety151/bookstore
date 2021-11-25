import api from "boot/axios";
import { Pagination } from "helper/paginationValue";
import { ACTION_NAMES } from "./actionTypes";

export type getPaginationType = {
 pagination: Pagination;
 onSuccess : () => void;
 onFailure: (error: any) => void;
}

export const getProductPagination = (props: getPaginationType) => async (dispatch: any) => {
    dispatch({type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION});

    var response = await api.get("/books/books-for-sale", {
        params: {
            pageSize: props.pagination.pageSize,
            pageIndex: props.pagination.pageIndex
        }
    });

    if(response.data.isSuccess){
        dispatch({
            type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_SUCCESS,
            data: response.data.value
        });
        props.onSuccess();
    }
    else{
        dispatch({
            type: ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_FAIL,
            message: response.data.error
        });
        props.onFailure(response.data.error);
    }
}