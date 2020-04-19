import { AUTH_ERROR, USER_LOADED, LOGIN_SUCCESS ,LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL} from '../actions/types'


const initailState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}


export default function(state= initailState, action){
    const {type, payload } = action;
    switch(type){
        case USER_LOADED:
        case REGISTER_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case LOGIN_SUCCESS:
                localStorage.setItem('token', payload.token)
                return {
                    ...state,
                    ...payload,
                    isAuthenticated: true,
                    loading: false
                }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case REGISTER_FAIL:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
        }
}