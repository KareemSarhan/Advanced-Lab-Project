import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import ViewMemberAttendance from './ViewMemberAttendance';
import { withRouter } from 'react-router-dom';

function ViewMemAttButtonModal(props) {
    const [show, setShow] = useState(false);
    const [id, setID] = useState("");
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            id: id
        };
       // console.log(props)
        props.history.push('/ViewMemberAttendance/'+mem.id);
        handleClose();

    }
  
    return (
      <div>
       <Button variant="primary" onClick={handleShow}>
          View Member Attendance
        </Button> 
  
        <Modal show={show}
        onHide={handleClose}
        
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>View Member Attendance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicID" required>
                <Form.Label>Member ID</Form.Label>
                <Form.Control type="text" placeholder="Enter member ID" onChange = {handleID}/>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
     
    );
  }
  
 export default  withRouter(ViewMemAttButtonModal)