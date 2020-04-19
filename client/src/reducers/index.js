import { combineReducers } from 'redux'
import auth from './auth' 
import passwords from './passwords'
import notes from './notes'

export default combineReducers({
   auth,
   passwords,
   notes
})