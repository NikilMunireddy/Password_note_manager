import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Button, PanelGroup, Panel } from 'rsuite';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../../actions/notes'
import Spinner from '../layout/Spinner'

const Notes = ({ getNotes, deleteNote, auth: { isAuthenticated }, notes: { loading, notes } }) => {

    useEffect(() => {
        getNotes()
    }, [getNotes])

    const buttomStyles = {
        position: "fixed",
        bottom: "10px",
        width: "100%"
    }


    return (
        <Fragment>
            {
                loading ? (<Spinner />) : (
                    <Fragment>
                        <PanelGroup accordion bordered>
                            {notes.map((note, index) => (
                                <Panel key={index} header={note.title}>
                                    { note.note.map((n, index)=>(
                                            <div key={index}  style={{"color": "grey"}}><i class="fa fa-angle-right"></i>&nbsp;&nbsp;&nbsp; {n}</div>
                                         ))}
                                        <Button color="" style={{ "position": "fixed", "right": "10%" }} onClick={e => {
                                            if (window.confirm('Are You sure!!!')) {
                                                deleteNote(note._id)
                                                getNotes()
                                            }
                                        }}  >
                                            <p style={{ "color": "red" }} aria-hidden="true"> Delete </p>
                                        </Button>
                                        <br></br>
                                </Panel>
                            ))}
                        </PanelGroup>
                    </Fragment>
                )
            }

            <Link to='/addnote' style={buttomStyles}>
                <Button color="green" style={buttomStyles} >
                    <i className="fa fa-edit" aria-hidden="true"></i> &nbsp;Create Note
                </Button>
            </Link>
        </Fragment>
    )
}

Notes.propTypes = {
    getNotes: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    notes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    notes: state.notes,
    auth: state.auth
});

export default connect(mapStateToProps, { getNotes, deleteNote })(Notes)
