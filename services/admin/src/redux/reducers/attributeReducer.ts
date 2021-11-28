import { Attribute } from "model/attribute";
import { ACTION_NAMES } from "redux/actions/attribute/actionType";

export type AttributeState = {
    requesting: boolean;
    message: string;
    data: Attribute[]
}

const initState: AttributeState = {
    requesting: false,
    message: "",
    data : []
}

const attributeReducer = (state: AttributeState = initState, payload: any): AttributeState => {
    switch(payload.type){
        case ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES:
            return {
                ...state,
                requesting: true
            };
        case ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: payload.data
            };
        case ACTION_NAMES.GET_ATTRIBUTES.GET_ATTRIBUTES_FAIL:
            return {
                ...state,
                requesting: false,
                message: payload.message
            };
        default:
            return state;
    }
}

export default attributeReducer;