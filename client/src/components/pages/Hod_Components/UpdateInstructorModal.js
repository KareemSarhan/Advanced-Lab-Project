import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateInstructorModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [codeOld, setOldCourse] = useState("");
    const [codeNew, setNewCourse] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleOldCourse = (e) => setOldCourse(e.target.value);
    const handleNewCourse = (e) => setNewCourse(e.target.value);
      const handleSubmit =(e)=>{
        e.preventDefault();
          const mem = {
              id: id,
              codeOld: codeOld,
              codeNew: codeNew
          };
       console.log(mem);
        axios.put('/Hod/UpdateInstructor', mem)
        .then(
          res =>
          {
            handleClose();
            swal(res.data.msg)

        },
        err =>
        {
          console.log("Feeeeeeee errorrrrrrrr"+err)
        })
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          UpdateInstructor
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Update Instructor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="Enter Instructor ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" required>
                <Form.Label>Old Course Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Old Course Code" onChange = {handleOldCourse} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" required>
                <Form.Label>New Course Code</Form.Label>
                <Form.Control type="text" placeholder="Enter New Course Code" onChange = {handleNewCourse} />
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
  
  class UpdateInstructor extends Component{
  render(){
  return(
      <div>
          <UpdateInstructorModal />
      </div>
  );
  };
};
export default UpdateInstructor;
