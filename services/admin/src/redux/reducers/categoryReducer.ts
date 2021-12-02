import { Category } from "model/category";
import { ACTION_NAMES } from "redux/actions/category/actionType";

export type CategoryState = {
    requesting: boolean;
    message: string;
    data: Category[]
}

const initState: CategoryState = {
    requesting: false,
    message: "",
    data : []
}

const categoryReducer = (state: CategoryState = initState, payload: any): CategoryState => {
    switch(payload.type){
        case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES:
            return {
                ...state,
                requesting: true
            };
        case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: payload.data
            };
        case ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_FAIL:
            return {
                ...state,
                requesting: false,
                message: payload.message
            };
        default:
            return state;
    }
}

export default categoryReducer;