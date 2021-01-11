import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateCourseModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [numberOfSlotsNeeded, setNumberOfSlotsNeeded] = useState(0);
    const [creditHours, setCreditHours] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleNumberOfSlotsNeeded = (e) => setNumberOfSlotsNeeded(e.target.value);
    const handleCreditHours = (e) => setCreditHours(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const cour = {
            name: name,
            creditHours: creditHours,
            numberOfSlotsNeeded: numberOfSlotsNeeded
        };
        console.log(cour);
        axios.put('/Hr/updateCourse/'+name, cour).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            swal(res.data.msg)
          })
          .catch((err) => {swal(err.response.data.errmsg || err.response.data.err)});
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          UpdateCourse
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>UpdateCourse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Enter course name" onChange = {handleName}/>
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
  
  class UpdateCourse extends Component{
  render(){
  return(
      <div>
          <UpdateCourseModal />
      </div>
  );
  };
};
export default UpdateCourse;
