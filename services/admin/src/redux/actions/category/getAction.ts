import api from "boot/axios";
import { ACTION_NAMES } from "./actionType"

export const getCategories = () => async (dispatch: any) =>{
    dispatch({type: ACTION_NAMES.GET_CATEGORIES});

    var response = await api.get('/categories/all');

    if(response.data?.isSuccess){
        dispatch({
            type: ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_SUCCESS,
            data: response.data.value
        });
    }
    else{
        dispatch({
            type: ACTION_NAMES.GET_CATEGORIES.GET_CATEGORIES_FAIL,
            message: response.data.error
        })
    }
}