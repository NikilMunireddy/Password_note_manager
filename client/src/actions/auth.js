import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, REGISTER_SUCCESS, REGISTER_FAIL  } from './types'


// LOAD User check if user is logged in and token is valid 

export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


// Login user
export const login = ({ email, password }) => async dispatch =>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body= JSON.stringify({  email, password });
    try {
        const res = await axios.post('/api/auth', body, config);
        console.log(res)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;  // errors array

        if(errors){
           console.log(errors)
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

// Register account 

export const register = ({ name, email, password }) => async dispatch =>{
    const config ={
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    const body= JSON.stringify({ name, email, password });
    try {
        const res = await axios.post('/api/users', body, config);
        console.log(res)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;  // errors array

        if(errors){
           console.log(errors)
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

//logout  and clear profile
export const logout = () => dispatch =>{
    dispatch({type: LOGOUT});
}