import React, {Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Redirect, Link }  from 'react-router-dom'
import { getPasswords, addPassword, deletePassword } from '../../actions/passwords'
import Spinner from '../../components/layout/Spinner'
import {  Icon, Button, Panel, PanelGroup } from 'rsuite';

const Password = ({ getPasswords, addPassword, deletePassword, auth :{ isAuthenticated}, passwords :{ loading, passwords, error} }) => {

    useEffect(()=>{
        getPasswords();
    }, [getPasswords])

    
        const buttomStyles={
            position: "fixed",
            bottom: "0px",
            width: "100%",
            height:"9%"
          }

    if(! isAuthenticated){
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            {(isAuthenticated &&  passwords === []) || ( isAuthenticated && loading) ? (<Spinner />): (
                <div> 
                    <div style={{width: "100%"}}> 
                    <PanelGroup accordion bordered >
                        {passwords.map((pwd, index)=> (
                    <Panel  key={index} header={pwd.title}>
                        <p style={{"color": "green"}}><Icon icon="avatar" /> &nbsp;{pwd.accountId}</p>
                            <br/>
                        <div style={{"color": "blue"}}><i className="fa fa-lock" aria-hidden="true"/> &nbsp;{pwd.password}
                        <Button color="" style={{"position": "absolute", "right": "10%" }} onClick={e=>{ if(window.confirm('Are You sure!!!')){
                            deletePassword(pwd._id)
                            getPasswords()
                        }
                        }}  >
                            <i style={{ "color": "red" }} className="fa fa-trash" aria-hidden="true"></i>
                        </Button>
                          </div>
                    </Panel>
                ))}
                    </PanelGroup>
                    </div>
                    
                    <Link to='/addpassword' style={buttomStyles}>
                        <Button color="blue" style={buttomStyles} >
                            <h4><i className="fa fa-lock" aria-hidden="true"></i> &nbsp;Add Password  </h4>
                        </Button>
                    </Link>
                </div>
            )}
        </Fragment>
    )
}

Password.propTypes = {
    getPasswords: PropTypes.func.isRequired,
    addPassword: PropTypes.func.isRequired,
    deletePassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    passwords: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    passwords: state.passwords,
    auth: state.auth
  });

export default connect(mapStateToProps, { getPasswords, addPassword, deletePassword })(Password)
