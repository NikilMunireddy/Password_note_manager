import React from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { Button } from 'rsuite';


const Landing = ({ isAuthenticated }) => {

    if(isAuthenticated){
        return <Redirect to='/notes'/>
      }

    return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Vault Project</h1>
          <p className="lead">
            Store passwords
          </p>
          <div className="buttons">
            <Link to="/register" >
                <Button color="cyan" >
                    <i className="fa fa-pen" aria-hidden="true"></i> &nbsp;Sign Up
                </Button>
            </Link> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/login">
                <Button color="green" >
                    <i className="fa fa-key" aria-hidden="true"></i> &nbsp;Login
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
    )
}

Landing.propTypes = {
    isAuthenticated : PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated : state.auth.isAuthenticated
  })

export default connect(mapStateToProps)(Landing)
