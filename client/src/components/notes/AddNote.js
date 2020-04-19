import React, { Fragment, useState } from 'react'
import {  Button, InputGroup,Icon } from 'rsuite';
import Spinner from '../layout/Spinner'
import { addNote } from '../../actions/notes'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'


const AddNote = ({addNote, auth :{ isAuthenticated},  notes : {loading}}) => {

    const [formData, setFormData] = useState({
        title:'',
        note:''
    });
    const  { title, note } = formData;

    const onChange = e =>  {setFormData({ ...formData, [e.target.name]: e.target.value})}

    const onSubmit = async e =>{
        e.preventDefault();
        addNote({ title, note })
    }
    const onClear = e =>{setFormData({title: '',note: ''})}
    
    return (
        <Fragment>
          { loading && isAuthenticated ? (<Spinner/>) : (
               <form className="form">
               <div className="form-group">
                   <InputGroup >
                       <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
                       <input type="text" placeholder="Title" name='title' value={title} onChange={e=> onChange(e)} />
                   </InputGroup>
               </div>
               <div className="form-group">
               <InputGroup >
                       <InputGroup.Addon> <i className="fa fa-edit" aria-hidden="true"></i></InputGroup.Addon>
                       <textarea  rows="10" cols="50" name="note" placeholder="Add Note Use '....' as line break" value={note} onChange={e=> onChange(e)} />
               </InputGroup>
               </div>
               &nbsp;&nbsp;&nbsp;&nbsp;
               <Button color="green" onClick={e => onSubmit(e)} >
                   <i className="fa fa-plus" aria-hidden="true"></i> &nbsp;Create
               </Button>
               &nbsp;&nbsp;&nbsp;&nbsp;
               <Button color="blue" onClick={e => onClear(e)}>
                   <i className="fa fa-minus" aria-hidden="true"></i> &nbsp;Clear
               </Button>
             </form>
          )}
       </Fragment>
    )
}

AddNote.propTypes = {
    addNote: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    notes: state.notes,
    auth: state.auth
  });
export default connect(mapStateToProps, {addNote})(AddNote)

