import React, { useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { InputGroup, Icon, Button } from 'rsuite';
import { login } from '../../actions/auth'
import { connect } from 'react-redux'


const Login = ({ login, isAuthenticated }) => {

    const styles={
        width:"60%",
        marginBottom:20,
        marginLeft: 30
      }
      const [formData, setFormData] = useState({
        email:'',
        password:''
    });
        const  { email, password } = formData;

      const onChange = e =>  {setFormData({ ...formData, [e.target.name]: e.target.value})}
      
      const onSubmit = async e =>{
          e.preventDefault();
          login({ email, password })
      }

       if(isAuthenticated){
      return <Redirect to='/passwords' />
    }
      

    return (
        <div>
            <section className="container" style={styles}>
      <h1 className="large text-primary">
        Sign In
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form">
        <div className="form-group">
            <InputGroup >
                <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
                <input type="email" placeholder="Email Address" name='email' value={email} onChange={e=> onChange(e)} />
            </InputGroup>
        </div>
        <div className="form-group">
        <InputGroup >
                <InputGroup.Addon> <i className="fa fa-lock" aria-hidden="true"></i></InputGroup.Addon>
                <input type="password" placeholder="Password"  name='password' value={password} onChange={e=> onChange(e)} />
        </InputGroup>
        </div>
        <Button color="green" onClick=  {e => onSubmit(e)} >
            <i className="fa fa-key" aria-hidden="true"></i> &nbsp;Login
        </Button>
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
        </div>
    )
}

Login.propTypes={
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }
  // gives all values in this state 
  const mapStatetoprops = state =>({
    isAuthenticated: state.auth.isAuthenticated
  })
  
  export default connect(mapStatetoprops, { login })(Login);