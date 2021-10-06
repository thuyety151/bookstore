import  {userConstants} from '../constants/user/userTypes'

let user = localStorage.getItem('user');
if(user){
    user = JSON.parse(localStorage.getItem('user')!);
}
const initialState = user ? {isLogin: true, user} : {};

export default function authentication(state = initialState, action: any){
    switch(action.type){
        case userConstants.LOGIN_REQUEST:
            return {
                isLogin: true,
                user: action.data
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                isLogin: true,
                user: action.data
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}

