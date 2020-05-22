import axios from 'axios'
import { setAlert } from './alert'
import { GET_NOTE, NOTE_ERROR, ADD_NOTE, ADD_NOTE_ERROR, DELETE_NOTE, DELETE_NOTE_ERROR, UPDATE_NOTE, UPDATE_NOTE_ERROR } from './types'

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


// create new note
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
        dispatch(setAlert('Note added', 'success'))
    } catch (err) {
        const errors = err.response.data.errors;  // errors array
        if(errors){
           console.log(errors)
        }
        dispatch({
            type: ADD_NOTE_ERROR,
            payload: errors
        })
        dispatch(setAlert('Could not reach our server, Check your internet connection', 'warning'))
    }
}

// delete a note 
export const deleteNote = noteId => async dispatch =>{

    try {
        await axios.get(`/api/notes/remove/${noteId}`);
        dispatch({
            type: DELETE_NOTE,
        })
       dispatch(setAlert("Note deleted", 'error'))
    } catch (err) {
        dispatch({
            type: DELETE_NOTE_ERROR,
            payload: null
        })
    }
}

// update note (PUT )

export const updateNote = ( note_id, title, note  ) => async dispatch => {
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body= JSON.stringify({ note_id, title, note })
    console.log(body)
    try {
        const res = await axios.put('/api/notes/', body, config);
        dispatch({
            type: UPDATE_NOTE,
            payload: res.data
        });
        dispatch(setAlert('Note Updated', 'info'))
    } catch (err) {
        const errors = err.response.data.errors;  // errors array
        if(errors){
           console.log(errors)
        }
        dispatch({
            type: UPDATE_NOTE_ERROR,
            payload: errors
        })
        dispatch(setAlert('Could not reach our server, Check your internet connection', 'warning'))
    }
}