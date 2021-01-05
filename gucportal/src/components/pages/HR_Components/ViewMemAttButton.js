import React, { Component, useState } from 'react';
//import { Link } from 'react-router-dom';
import{DropdownButton,Dropdown} from 'react-bootstrap'
import { Button,Modal,Form} from 'react-bootstrap'
import ViewMemberAttendance from './ViewMemberAttendance';
import { Redirect , Route, Link, Router} from "react-router-dom";

import axios from 'axios'

var memID = "";
function TakeMemberIDModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
   // const [redir, setRedirect] = useState("/ViewMemberAttendance");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID= (e) => setID(e.target.value);     
    const handleSubmit =(e)=>{
      e.preventDefault();
      memID = id;
      handleClose();
      console.log(id);
   return(
   <div>
       <Router>
           <Route
           path="/ViewMemberAttendance" component={ViewMemberAttendance}/>
       </Router>
       </div>)
      //return(<ViewMemberAttendance props = {id} />);
}
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
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
                <Form.Label>Member ID</Form.Label><br/>
                <Form.Control type="text" placeholder="Enter member id" onChange = {handleID} />
                </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
            <Link to={{
        pathname: "/ViewMemberAttendance",
        state: { id: id }
      }}/>
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
  
  class ViewMemAttButton extends Component{
    
    render() {
  return(
      <div>
          <TakeMemberIDModal />
      </div>
  );
  };
};

export default ViewMemAttButton;