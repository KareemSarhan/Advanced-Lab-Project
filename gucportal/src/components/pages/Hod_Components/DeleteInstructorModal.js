import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DeleteInstructorModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [code, setCourse] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleCourse = (e) => setCourse(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            id: id,
            code: code
        };
        console.log(mem)
        axios.delete('/Hod/DeleteInstructor/'+mem.id+"/"+mem.code)
        .then(
          res =>
          {
            console.log(mem);
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
          DeleteInstructor
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Delete Instructor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>ID</Form.Label>
                <Form.Control type="text" placeholder="Enter Instructor ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" required>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" placeholder="Enter Course Code" onChange = {handleCourse} />
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
  
  class DeleteInstructor extends Component{
  render(){
  return(
      <div>
          <DeleteInstructorModal />
      </div>
  );
  };
};
export default DeleteInstructor;
