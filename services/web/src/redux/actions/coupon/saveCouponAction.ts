import api from "../../../boot/axios";
import { NAME_ACTIONS } from "../../constants/coupon/actionTypes"

export type SaveCouponProps = {
    couponId: string;
    onSuccess: () => void;
    onFailure: (error : any) => void;
}

export const saveCoupon = 
(props: SaveCouponProps) => async (dispatch: any) => {
    try {
        dispatch({
            type:   NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER
        });
        const response = await api.post("/coupons/save-user-coupon", {
            "couponId" :  props.couponId
        });

        if(response.data.isSuccess){
            await dispatch({
                type: NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER_SUCCESS,
                data: response.data.isSuccess
            });
            props.onSuccess();
        } else if (!response.data.isSuccess){
            props.onFailure(response.data.error);
            dispatch({
                type: NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER_FAILED,
                data: response.data.error,
            });
        }
    } catch (error: any){
        props.onFailure(error.message);
        dispatch({
            type: NAME_ACTIONS.SAVE_COUPON_USER.SAVE_COUPON_USER_FAILED,
            data: error.message,
        });
    }
}