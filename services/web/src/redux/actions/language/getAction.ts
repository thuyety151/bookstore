
import api from "../../../boot/axios";
import { ACTION_NAMES } from "./actionTypes"

export const getLanguages = () => async (dispatch: any) =>{
    dispatch({type: ACTION_NAMES.GET_LANGUAGES});

    var response = await api.get('/languages');

    if(response.data?.isSuccess){
        dispatch({
            type: ACTION_NAMES.GET_LANGUAGES.GET_LANGUAGES_SUCCESS,
            data: response.data.value
        });
    }
    else{
        dispatch({
            type: ACTION_NAMES.GET_LANGUAGES.GET_LANGUAGES_FAIL,
            message: response.data.error
        })
    }
}