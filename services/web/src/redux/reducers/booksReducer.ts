import { Book } from "../../model";
import { booksContant } from "../constants/books/actionTypes";

export type BooksSate = {
    success: Boolean;
    data: Book[] | null;
    message: string | null;
}

const initialState : BooksSate  = {
    success: true,
    data: null,
    message: null
}

const booksReducer = (state: BooksSate = initialState, payload: any ) : BooksSate => {
    switch(payload.type){
        case booksContant.GET_MOST_VIEW_REQUEST:
            return {
                ...state,
            };
        case booksContant.GET_MOST_VIEW_SUCCESS:
            return {
                ...state,
                success: true,
                data: payload.data
            };
        case booksContant.GET_MOST_VIEW_FAIL:
            return {
                ...state,
                success: false,
                message: payload.message,
            }
        default:
            return state;
    }
}

export default booksReducer;