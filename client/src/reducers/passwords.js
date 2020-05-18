import { GET_PWD, PWD_ERROR, ADD_PWD, DELETE_PWD, DELETE_ERROR } from '../actions/types'

const initailState = {
    loading: true,
    passwords: [],
    error: {}
}

export default function(state= initailState, action){
const { type, payload } =action;

    switch(type){
        case GET_PWD:
        case ADD_PWD:
            return {
                ...state,
                passwords: payload,
                loading: false
            }
        case DELETE_PWD:
            return state
        case PWD_ERROR:
        case DELETE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }
}