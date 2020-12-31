import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateFacultyModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [number, setNumber] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleNumber = (e) => setNumber(e.target.value);
    const handleSubmit =()=>{
        const fac = {
            name: name,
            number: number
        };
        console.log(fac);
        axios.put('/Hr/updateFaculty/'+name, fac).then((res)=>{
            console.log("success");
            console.log('/Hr/updateFaculty/'+name)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          updateFaculty
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>updateFaculty</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Faculty name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicNumber">
                <Form.Label>Number</Form.Label>
                <Form.Control type="number" min = "0" placeholder="Enter Number of years" onChange = {handleNumber} />
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
  
  class UpdateFaculty extends Component{
  render(){
  return(
      <div>
          <UpdateFacultyModal />
      </div>
  );
  };
};
export default UpdateFaculty;
