import React , { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { InputGroup, Icon, Button } from 'rsuite';
import { connect } from 'react-redux';
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

const Register = ({register}) => {
    
    const styles={
        width:"60%",
        marginBottom:20,
        marginLeft: 30
      }

    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password1:''
    });
    const  { name, email, password, password1 } = formData;

    const onChange = e =>  {setFormData({ ...formData, [e.target.name]: e.target.value})}

    const onSubmit = async e =>{
        e.preventDefault();
        if(password === password1){
            register({ name, email, password })
        }
        else console.log(" password does not match")
    }

    return (
        <Fragment>
            <section className="container" style={styles}>
      <h1 className="large text-primary">
        Create account
      </h1>
      <p className="lead"><i className="fas fa-user"></i> Create new Account</p>
      <form className="form">
      <div className="form-group">
            <InputGroup >
                <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
                <input type="text" placeholder="Name" name='name' value={name} onChange={e=> onChange(e)} />
            </InputGroup>
        </div>
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
        <div className="form-group">
        <InputGroup >
                <InputGroup.Addon> <i className="fa fa-lock" aria-hidden="true"></i></InputGroup.Addon>
                <input type="password" placeholder="Confirm Password"  name='password1' value={password1} onChange={e=> onChange(e)} />
        </InputGroup>
        </div>
        <Button color="green" onClick=  {e => onSubmit(e)} >
            <i className="fa fa-key" aria-hidden="true"></i> &nbsp;Register
        </Button>
      </form>
      <p className="my-1">
        Do have an account? <Link to="/login">Sign in</Link>
      </p>
    </section>
        </Fragment>
    )
}

Register.propTypes = {
register : PropTypes.func.isRequired,
}

export default connect(null, {register})(Register)
