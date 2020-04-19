import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Redirect}  from 'react-router-dom'
import { getPasswords, addPassword, deletePassword } from '../../actions/passwords'
import Spinner from '../../components/layout/Spinner'
import { InputGroup, Icon, Button, Panel, PanelGroup } from 'rsuite';

const Password = ({ getPasswords, addPassword, deletePassword, auth :{ isAuthenticated}, passwords :{ loading, passwords, error} }) => {

    useEffect(()=>{
        getPasswords();
    }, [getPasswords])

    const [formData, setFormData] = useState({
        title:'',
        accountId:'',
        password:''
    });
        const  { title, accountId, password } = formData;
        const onChange = e =>  {setFormData({ ...formData, [e.target.name]: e.target.value})}

        const onSubmit = async e =>{
            e.preventDefault();
            addPassword({ title, accountId, password})
        }

        const onClear = async e => {setFormData({title: '', accountId:'', password:''})}
        const styles={
            position: "fixed",
            bottom: "10px",
            width: "100%"
          }

    if(! isAuthenticated){
        return <Redirect to='/login' />
    }

    return (
        <Fragment>
            { passwords === [] || loading ? (<Spinner />): (
                <Fragment> 
                    <Fragment> 
                    <PanelGroup accordion bordered>
                        {passwords.map((pwd, index)=> (
                    <Panel  key={index} header={pwd.title}>
                        <p style={{"color": "green"}}><Icon icon="avatar" /> &nbsp;{pwd.accountId}</p>
                            <br/>
                        <div style={{"color": "blue"}}><i className="fa fa-lock" aria-hidden="true"/> &nbsp;{pwd.password}
                        <Button color="" style={{"position": "fixed", "right": "10%"}} onClick={e=>{ deletePassword(pwd._id)
                        getPasswords()
                        }}  >
                            <i  style={{"color": "red", "position": "fixed", "right": "10%"}} className="fa fa-trash" aria-hidden="true"/> Delete
                        </Button>
                          </div>
                
                </Panel>
                ))}
                    </PanelGroup>
                    </Fragment>
                    <Panel header="Add a account password" bodyFill collapsible bordered style ={styles}>
                    <div style={{"background-color":"white"}}>
                    <form className="form" >
                        <div className="form-group">
                            <InputGroup >
                                <InputGroup.Addon> <i className="fa fa-pen" aria-hidden="true"></i></InputGroup.Addon>
                                <input type="text" placeholder="Title"  name='title' value={title} onChange={e=> onChange(e)} autocomplete="off" />
                            </InputGroup>
                        </div>
                        <div className="form-group"> 
                            <InputGroup >
                                <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
                                <input type="text" placeholder="Account ID" name='accountId' value={accountId} onChange={e=> onChange(e)} autocomplete="off" />
                            </InputGroup>
                        </div>
                        <div className="form-group">
                            <InputGroup >
                                    <InputGroup.Addon> <i className="fa fa-lock" aria-hidden="true"></i></InputGroup.Addon>
                                    <input type="text" placeholder="Password"  name='password' value={password} onChange={e=> onChange(e)} autocomplete="off" />
                            </InputGroup>
                        </div>&nbsp;&nbsp;&nbsp;
                        <Button color="green" onClick=  {e => onSubmit(e)} >
                            <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Add 
                        </Button>
                        &nbsp;&nbsp;&nbsp;
                        <Button color="blue" onClick=  {e => onClear(e)} >
                            <i className="fa fa-minus" aria-hidden="true"></i> &nbsp;Clear 
                        </Button>
                    </form>
                    </div>
                    </Panel>
                </Fragment>
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
