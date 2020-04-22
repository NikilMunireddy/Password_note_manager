import React , { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth';
import NavBar from './components/layout/NavBar'
import Login from './components/auth/Login'
import Alert from './components/layout/Alert'
import Register from './components/auth/Register'
import Landing from './components/layout/Landing'
import Password from './components/Passwords/Password'
import Notes from './components/notes/Notes'
import AddNote from './components/notes/AddNote'
import PageNotfound from './components/layout/PageNotfound'
import PrivateRoute from './components/routing/PrivateRoute'
import AddPassword from './components/Passwords/AddPassword'
import 'rsuite/dist/styles/rsuite-default.css';
import './App.css'

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(()=>{
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
           <NavBar />
           <Alert />
            <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <PrivateRoute exact path='/passwords' component={Password} />
                <PrivateRoute exact path='/addpassword' component={AddPassword} />
                <PrivateRoute exact path='/notes' component={Notes} />
                <PrivateRoute exact path='/addnote' component={AddNote} />
                <Route component={PageNotfound} />
            </Switch>
        </Fragment>
      </Router>
    </Provider>
  )
}


export default App
