import { Pagination, paginationValue } from "helper/paginationValue";
import { Book } from "model/book";
import { ACTION_NAMES } from "redux/actions/product/actionTypes";

export type ProductState = {
    requesting: boolean;
    message: string;
    data: Book[];
    pagination: Pagination;
    currentObject: Book
};

const initState: ProductState = {
    requesting: false,
    message: "",
    data: [],
    pagination: {...paginationValue},
    currentObject: {} as any
};

const productReducer = (state : ProductState = initState , payload : any): ProductState => {
    switch(payload.type){
        case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION:
            return {
                ...state,
                requesting: true
            };
        case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_SUCCESS:
            return {
                ...state,
                data : payload.data,
                requesting: false,
                pagination:JSON.parse(payload.pagination)
            };
        case ACTION_NAMES.GET_PRODUCT_PAGINATION.GET_PRODUCT_PAGINATION_FAIL:
            return {
                ...state,
                requesting: false,
                message: payload.message
            };   
        default:
            return state;
    }
}
export default productReducer;