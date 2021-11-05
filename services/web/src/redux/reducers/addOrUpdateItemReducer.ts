import { NAME_ACTIONS } from "../constants/cart/actionTypes";

const initState = {
    success: false
}

const addOrUpdateItemReducer = (state = initState, payload : any) => {
    switch(payload.type){
        case NAME_ACTIONS.ADD_OR_UPDATE_ITEM.ADD_OR_UPDATE_ITEM_SUCCESS:
            return {
                ...state,
                success: payload.data
            };
        default:
            return state;
    }
}

export default addOrUpdateItemReducer;