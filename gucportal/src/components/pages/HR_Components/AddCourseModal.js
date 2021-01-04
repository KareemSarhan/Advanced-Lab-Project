import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddCourseModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [code, setCode] = useState("");
    const [numberOfSlotsNeeded, setNumberOfSlotsNeeded] = useState(0);
    const [creditHours, setCreditHours] = useState(0);
    const [department, setDepartment]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleNumberOfSlotsNeeded = (e) => setNumberOfSlotsNeeded(e.target.value);
    const handleCode = (e) => setCode(e.target.value);
    const handleCreditHours = (e) => setCreditHours(e.target.value);
    const handleDepartment = (e) => setDepartment(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const cour = {
            name: name,
            code: code,
            numberOfSlotsNeeded: numberOfSlotsNeeded,
            creditHours: creditHours ,
            department: department

        };
        console.log(cour);
        axios.post('/Hr/addCourse', cour).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          AddCourse
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddCourse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Course name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicDepName" required>
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Department name" onChange = {handleDepartment}/>
            </Form.Group>

            <Form.Group controlId="formBasicCode" required>
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter course code" onChange = {handleCode} />
            </Form.Group>

            <Form.Group controlId="formBasicNslots" required>
                <Form.Label>Number Of Slots Needed</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter number Of Slots Needed" onChange = {handleNumberOfSlotsNeeded} />
            </Form.Group>

            <Form.Group controlId="formBasicCreditHours" required>
                <Form.Label>creditHours</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter credit hours" onChange = {handleCreditHours} />
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
  
  class AddCourse extends Component{
  render(){
  return(
      <div>
          <AddCourseModal />
      </div>
  );
  };
};
export default AddCourse;
