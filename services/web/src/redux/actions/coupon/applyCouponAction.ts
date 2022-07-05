import { NAME_ACTIONS } from "../../constants/coupon/actionTypes"

export type ApplyCouponProps = {
    couponId: string;
    onSuccess: () => void;
    onFailure: (error: any) => void;
}

export const setSelectedCoupon = 
(props: ApplyCouponProps) => async (dispatch: any) => {
    try {
        dispatch({
            type: NAME_ACTIONS.USER_APPLY_COUPON.USER_APPLY_COUPON
        });

        dispatch({
            type: NAME_ACTIONS.USER_APPLY_COUPON.USER_APPLY_COUPON_SUCCESS,
            data: props.couponId
        });
        props.onSuccess();
    } catch (error : any){

    }
}