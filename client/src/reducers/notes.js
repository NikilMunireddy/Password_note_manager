import { GET_NOTE, NOTE_ERROR, ADD_NOTE, ADD_NOTE_ERROR, DELETE_NOTE, DELETE_NOTE_ERROR, UPDATE_NOTE, UPDATE_NOTE_ERROR } from '../actions/types'

const initailState = {
    loading: true,
    notes: [],
    error: {}
}

export default function(state= initailState, action){
    const { type, payload } =action;

    switch(type) {
        case GET_NOTE:
        case UPDATE_NOTE:
        case ADD_NOTE:
            return {
                ...state,
                loading : false,
                notes: payload
            }
        case DELETE_NOTE:
            return state
        case NOTE_ERROR:
        case UPDATE_NOTE_ERROR:
        case DELETE_NOTE_ERROR:
        case ADD_NOTE_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }
        default:
            return state;
    }

}
