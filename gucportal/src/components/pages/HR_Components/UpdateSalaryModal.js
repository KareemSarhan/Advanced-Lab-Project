import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateSalaryModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [newSalary, setNewSalary] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleNewSalary = (e) => setNewSalary(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const cour = {
            id: id,
            newSalary: newSalary
        };
        console.log(cour);
        axios.put('/Hr/updateSalary/'+id, cour).then((res)=>{
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
          UpdateSalary
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>UpdateSalary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicID" required>
                <Form.Label>Member ID</Form.Label>
                <Form.Control type="text" placeholder="Enter member ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicNslots" >
                <Form.Label>New Salary</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter new Salary" onChange = {handleNewSalary} />
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
  
  class UpdateSalary extends Component{
  render(){
  return(
      <div>
          <UpdateSalaryModal />
      </div>
  );
  };
};
export default UpdateSalary;
