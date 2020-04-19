import axios from 'axios'
import { GET_NOTE, NOTE_ERROR, ADD_NOTE, ADD_NOTE_ERROR, DELETE_NOTE, DELETE_NOTE_ERROR } from './types'

// GET all Notes

export const getNotes = () => async dispatch =>{

    try {
        const res = await axios.get('/api/notes/');
        dispatch({
            type: GET_NOTE,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: NOTE_ERROR,
            payload: null
        })
    }
}

export const addNote = ({ title, note }) => async dispatch =>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body= JSON.stringify({ title, note })
    console.log(note)
    try {
        const res = await axios.post('/api/notes/', body, config);
        dispatch({
            type: ADD_NOTE,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;  // errors array
        if(errors){
           console.log(errors)
        }
        dispatch({
            type: ADD_NOTE_ERROR,
            payload: errors
        })
    }
}


export const deleteNote = noteId => async dispatch =>{

    try {
        const res = await axios.get(`/api/notes/remove/${noteId}`);
        dispatch({
            type: DELETE_NOTE,
        })
    } catch (err) {
        dispatch({
            type: DELETE_NOTE_ERROR,
            payload: null
        })
    }
}
