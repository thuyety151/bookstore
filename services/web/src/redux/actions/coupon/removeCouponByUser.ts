import { NAME_ACTIONS } from "../../constants/coupon/actionTypes"

export type RemoveCouponProps = {
    onSuccess: () => void;
}

export const removeCouponByUser = 
(props: RemoveCouponProps) => async (dispatch: any) => {
    try {
        dispatch({
            type:
              NAME_ACTIONS.USER_REMOVE_APPLY_COUPON.USER_REMOVE_APPLY_COUPON_SUCCESS,
          });
        props.onSuccess();
    } catch (error : any){

    }
}