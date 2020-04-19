import React , { Fragment, useEffect }from 'react'
import PropTypes from 'prop-types'
import {  Button, Row, Panel } from 'rsuite';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { getNotes, deleteNote } from '../../actions/notes'

const Notes = ({getNotes, deleteNote , auth :{ isAuthenticated}, notes : {loading, notes} }) => {

    useEffect(()=>{
        getNotes()
    }, [getNotes])

    const buttomStyles={
        position: "fixed",
        bottom: "10px",
        width: "100%"
      }


    return (
        <Fragment>
            {
                notes.map((note, index)=>(
                    <Row key={index}>
                        <Panel header={note.title}  bordered>
                            <div>
                                { note.note.map((n, index)=>(
                                     <div key={index}  style={{"color": "red"}}><i class="fa fa-angle-right"></i>&nbsp;&nbsp;&nbsp; {n}</div>
                                        ))}
                             </div>
                             <Button color="" style={{"position": "fixed", "right": "10%"}} onClick={e=>{ deleteNote(note._id)
                             getNotes()
                         }}  >
                            <i  style={{"color": "red", "position": "fixed", "right": "10%"}} className="fa fa-trash" aria-hidden="true"/> Delete
                        </Button>
                        <br/>
                        </Panel>
                    </Row>
                ))
            }

            <Link to='/addnote' style={buttomStyles}>
                <Button color="blue" style={buttomStyles} >
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
