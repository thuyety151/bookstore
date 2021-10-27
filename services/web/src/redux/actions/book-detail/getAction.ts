import api from "../../../boot/axios";
import {bookDetailConstant} from "../../constants/book-detail/actionTypes"

export const getBook = (id: any) => async (dispatch: any ) => {
    try{
        dispatch({type: bookDetailConstant.GET_REQUEST});

        const response = await api.get(`/book?id=${id}`);

        console.log(response);

        dispatch({
            type: bookDetailConstant.GET_SUCCESS,
            data: response.data.value
        });

        console.log("ok");

    }
    catch(error: any){
        dispatch({
            type: bookDetailConstant.GET_FAILURE,
            data: error.messages
        })
    }
}