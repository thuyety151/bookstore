import api from "boot/axios"
import store from "redux/store";
import { ACTION_NAMES } from "./actionTypes";
import { getOrderPagination } from "./getActions";

export type DeleteOrderProps={
    id:string;
    onSuccess:()=>void;
    onFailure:(err:any)=>void;
}

export const deleteOrder=(props:DeleteOrderProps)=> async (dispatch:any)=>{
    const orderState = store.getState().orders;
    dispatch({type:ACTION_NAMES.DELETE.DELETE});
    const response = await api.delete(`/orders?Id=${props.id}`);
    if(response.data.isSuccess){
        dispatch({type:ACTION_NAMES.DELETE.DELETE_SUCCESS});
        getOrderPagination({
            pagination:orderState.pagination,
            onSuccess:()=>{},
            onFailure:()=>{}
        });
        props.onSuccess();
    } else {
    dispatch({type:ACTION_NAMES.DELETE.DELETE_FAIL});
        props.onFailure(response.data.error);
    }
}