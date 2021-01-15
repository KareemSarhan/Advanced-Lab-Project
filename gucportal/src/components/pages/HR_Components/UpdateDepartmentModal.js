import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateDepartmentModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [code, setCode] = useState("");
    const [hod, setHod] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleCode = (e) => setCode(e.target.value);
    const handleHod= (e) => setHod(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const dep = {
            name: name,
            code: code,
            headOfDepartment: hod
        };
        console.log(dep);
        axios.put('/Hr/updateDepartment/'+name, dep).then((res)=>{
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
          UpdateDepartment
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>UpdateDepartment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter department name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicHodName">
                <Form.Label>Head Of Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter new head of department name" onChange = {handleHod}/>
            </Form.Group>

            <Form.Group controlId="formBasicCode">
                <Form.Label>Code</Form.Label>
                <Form.Control type="text" placeholder="Enter new code" onChange = {handleCode}/>
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
  
  class UpdateDepartment extends Component{
  render(){
  return(
      <div>
          <UpdateDepartmentModal />
      </div>
  );
  };
};
export default UpdateDepartment;
