import React , { Fragment }from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Navbar,Nav, Icon } from 'rsuite';
import { logout } from '../../actions/auth'

export const NavBar =  ({ auth: { isAuthenticated, loading, user}, logout}) => {


  const authLinks =(
    <Fragment>
      <Nav >
        <Nav.Item  icon={<Icon icon="home" />}>Home</Nav.Item>
        <Link to="/passwords">
          <Fragment><Nav.Item ><i className="fa fa-lock" aria-hidden="true"></i> &nbsp;<Fragment className="hide-sm">Passwords</Fragment></Nav.Item></Fragment>
        </Link>
        <Link to="/notes">
          <Fragment><Nav.Item ><i className="fa fa-edit" aria-hidden="true"></i> &nbsp;<Fragment className="hide-sm">Notes</Fragment></Nav.Item></Fragment>
        </Link>
        <a onClick={logout} href="/">
          <Fragment><Nav.Item > <i className="fas fa-sign-out-alt" ></i> &nbsp;<Fragment className="hide-sm">Logout</Fragment></Nav.Item></Fragment>
        </a>
        
    </Nav>
    <Nav pullRight> 
  <Nav.Item > <i className="fa fa-lock" aria-hidden="true"></i> &nbsp; Vault Project </Nav.Item>
  </Nav>
    </Fragment>
  );

  const guestLinks =(
    <Fragment >
      <Nav >
        <Link to="/">
            <Nav.Item  icon={<Icon icon="home" />}><Fragment className="hide-sm">Home</Fragment></Nav.Item>
        </Link>
        <Link to="/login">
            <Nav.Item > <i className="fa fa-key" aria-hidden="true"></i> &nbsp;<Fragment className="hide-sm">Login</Fragment></Nav.Item>
        </Link>
    </Nav>
    <Nav pullRight>
      <Nav.Item > <i className="fa fa-lock" aria-hidden="true"></i> &nbsp; Vault Project</Nav.Item>
    </Nav>
    </Fragment>
  )

  const navBarStyles={
    position: "fixed",
  }
    return (
      <Navbar>
        <Navbar.Body>
          {!loading && (<Fragment>  { isAuthenticated ? authLinks : guestLinks} </Fragment>)}
        </Navbar.Body>
        
      </Navbar>
    );
  };


  NavBar.prototype={
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  }

  const mapStateToProps = state => ({
    auth : state.auth
  })

  export default connect(mapStateToProps, {logout})(NavBar)
  