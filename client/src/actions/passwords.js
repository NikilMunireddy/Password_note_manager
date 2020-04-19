import axios from 'axios'
import {GET_PWD, PWD_ERROR, ADD_PWD, DELETE_PWD, DELETE_ERROR } from './types'

// GET all passwords 

export const getPasswords = () => async dispatch =>{

    try {
        const res = await axios.get('/api/passwords/');
        dispatch({
            type: GET_PWD,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: PWD_ERROR,
            payload: null
        })
    }
}


export const addPassword= ({ title, accountId, password}) => async dispatch =>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body= JSON.stringify({ title, accountId, password})
    try {
        const res = await axios.post('/api/passwords/', body, config);
        dispatch({
            type: ADD_PWD,
            payload: res.data
        });

    } catch (err) {
        const errors = err.response.data.errors;  // errors array
        if(errors){
           console.log(errors)
        }
        dispatch({
            type: PWD_ERROR,
            payload: errors
        })
    }
}

// DELETE password

export const deletePassword = passwordID => async dispatch =>{

    try {
        const res = await axios.get(`/api/passwords/remove/${passwordID}`);
        dispatch({
            type: DELETE_PWD,
        })
    } catch (err) {
        dispatch({
            type: DELETE_ERROR,
            payload: null
        })
    }
}