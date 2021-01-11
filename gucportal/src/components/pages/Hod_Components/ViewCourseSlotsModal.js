import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import viewMembers from './viewMembers';
import { withRouter } from 'react-router-dom';

function ViewCourseSlotsModal(props) {
    const [show, setShow] = useState(false);
    const [code, setCourse] = useState("");
 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCourse = (e) => setCourse(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            code: code
        };
      
        props.history.push('/viewSlotAssignments/'+mem.code);
      //  console.log(props.history)
        handleClose();
      // {  <Link to= {'/viewCourseMembers/'+mem.code}></Link>}
  //  { <viewMembers/>}
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          Course Slots
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Course Members</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>Course Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Course Code" onChange = {handleCourse}/>
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
  
 export default  withRouter(ViewCourseSlotsModal)