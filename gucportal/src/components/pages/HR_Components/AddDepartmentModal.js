import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddDepartmentModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [facultyName, setFacultyName] = useState("");
    const [code, setCode] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleFacultyName = (e) => setFacultyName(e.target.value);
    const handleCode = (e) => setCode(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const dep = {
            name: name,
            faculty: facultyName,
            code: code
        };
        console.log(dep);
        axios.post('/Hr/addDepartment', dep).then((res)=>{
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
          AddDepartment
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddDepartment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Department name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicFacName" required>
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Faculty name" onChange = {handleFacultyName}/>
            </Form.Group>

            <Form.Group controlId="formBasicCode">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter department code" onChange = {handleCode} />
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
  
  class AddDepartment extends Component{
  render(){
  return(
      <div>
          <AddDepartmentModal />
      </div>
  );
  };
};
export default AddDepartment;
