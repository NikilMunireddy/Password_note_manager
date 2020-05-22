import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, PanelGroup, Panel, Modal, InputGroup, Icon } from 'rsuite';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getNotes, deleteNote, updateNote } from '../../actions/notes'
import Spinner from '../layout/Spinner'
import Markdown from 'react-markdown'


const Notes = ({ getNotes, deleteNote, updateNote, auth: { isAuthenticated }, notes: { loading, notes } }) => {

    useEffect(() => {
        getNotes()
    }, [getNotes])

    const [isEdit, changeEdit] = useState(false);
    const [note_id, changeNoteID] = useState("");

    const [formData, setFormData] = useState({

    });
    const { title, note } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async e => {
        changeEdit(!isEdit)
        e.preventDefault();
        setFormData({ ...formData, [title]: '', [note]: '' })
    }
    const onClear = e => { setFormData({ title: '', note: '' }) }

    // collect edit note details 
    const editNote = (n_id, tit, data) => {
        var data_list = []
        data.map((d) => { data_list.push(d + " ....") })
        setFormData({ ...formData, [title]: tit })
        setFormData({ ...formData, [note]: data_list })
        changeNoteID(n_id)
        changeEdit(!isEdit);
    }

    const buttomStyles = {
        position: "fixed",
        bottom: "0px",
        width: "100%",
        height: "9%"
    }


    return (
        <Fragment>
            {
                loading ? (<Spinner />) : (
                    <Fragment>
                        <div>
                            <Modal show={isEdit} onHide={e => changeEdit(!isEdit)} size="xs">
                                <Modal.Header>
                                    <Modal.Title>Edit Note</Modal.Title>
                                </Modal.Header>
                                <form className="form">
                                    <div className="form-group">
                                        <InputGroup >
                                            <InputGroup.Addon><Icon icon="avatar" /></InputGroup.Addon>
                                            <input type="text" placeholder="Title" name='title' value={title} onChange={e => onChange(e)} />
                                        </InputGroup>
                                    </div>
                                    <div className="form-group">
                                        <InputGroup >
                                            <InputGroup.Addon> <i className="fa fa-edit" aria-hidden="true"></i></InputGroup.Addon>
                                            <textarea rows="10" cols="50" name="note" placeholder="Add Note Use '....' as line break" value={note} onChange={e => onChange(e)} />
                                        </InputGroup>
                                    </div>
                                </form>
                                <Modal.Footer>
                                    <Button onClick={e => {
                                        onSubmit(e);
                                        updateNote(note_id, title, note);
                                    }} appearance="primary">
                                        Update
                            </Button>
                                    <Button onClick={e => changeEdit(!isEdit)} appearance="subtle">
                                        Cancel
                            </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                        <PanelGroup accordion bordered>
                            {notes.map((note, index) => (
                                <Panel key={index} header={note.title}>
                                    {note.note.map((n, index) => (
                                        <div key={index} style={{ "color": "grey" }}> <Markdown source={n} /></div>
                                    ))}
                                    <div style={{ "position": "absolute", "right": "2%" }}>
                                        <Button color="" onClick={e => {
                                            if (window.confirm('Are You sure!!!')) {
                                                deleteNote(note._id)
                                                getNotes()
                                            }
                                        }}  >
                                            <i style={{ "color": "red" }} className="fa fa-trash" aria-hidden="true"></i>
                                        </Button>
                                        &nbsp;&nbsp;
                                <Button color="" onClick={e => editNote(note._id, note.title, note.note)}  >
                                            <i style={{ "color": "blue" }} className="fa fa-pen" aria-hidden="true"></i>
                                        </Button>
                                    </div>
                                    <br></br>
                                </Panel>
                            ))}
                        </PanelGroup>
                    </Fragment>
                )
            }

            <Link to='/addnote' style={buttomStyles}>
                <Button color="green" style={buttomStyles} >
                    <h4><i className="fa fa-edit" aria-hidden="true"></i> &nbsp;Create Note</h4>
                </Button>
            </Link>
        </Fragment>
    )
}

Notes.propTypes = {
    getNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    notes: state.notes,
    auth: state.auth
});

export default connect(mapStateToProps, { getNotes, deleteNote, updateNote })(Notes)
