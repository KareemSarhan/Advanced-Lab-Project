import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DeleteCourseModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [department, setDepartment]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleDepartment = (e) => setDepartment(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const cour = {
            name: name,
            department: department
        };
        console.log(cour);
        axios.delete('/Hr/deleteCourse/' + name + '/'+department).then((res)=>{
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
          DeleteCourse
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>DeleteCourse</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Enter course name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicDepName" required>
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter department name" onChange = {handleDepartment}/>
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
  
  class DeleteCourse extends Component{
  render(){
  return(
      <div>
          <DeleteCourseModal />
      </div>
  );
  };
};
export default DeleteCourse;
