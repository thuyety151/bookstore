import { Language } from "model/language";
import { ACTION_NAMES } from "redux/actions/language/actionType";


export type LanguageState = {
    requesting: boolean;
    message: string;
    data: Language[]
}

const initState: LanguageState = {
    requesting: false,
    message: "",
    data : []
}

const languageReducer = (state: LanguageState = initState, payload: any): LanguageState => {
    switch(payload.type){
        case ACTION_NAMES.GET_LANGUAGES.GET_LANGUAGES:
            return {
                ...state,
                requesting: true
            };
        case ACTION_NAMES.GET_LANGUAGES.GET_LANGUAGES_SUCCESS:
            return {
                ...state,
                requesting: false,
                data: payload.data
            };
        case ACTION_NAMES.GET_LANGUAGES.GET_LANGUAGES_FAIL:
            return {
                ...state,
                requesting: false,
                message: payload.message
            };
        default:
            return state;
    }
}

export default languageReducer;