import { combineReducers } from 'redux'
import auth from './auth' 
import passwords from './passwords'
import notes from './notes'
import alert from './alert'

export default combineReducers({
   auth,
   passwords,
   notes,
   alert
})