import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateLocationModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [capacity, setCapacity] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const loc = {
            name: name,
            capacity: capacity
        };
        console.log(loc);
        console.log('Hr/updateLocation/'+name)
        axios.put('/Hr/updateLocation/'+name, loc).then((res)=>{
            console.log("success");
            
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          UpdateLocation
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>UpdateLocation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text" placeholder="Enter location name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicCapacity">
                <Form.Label>Location Capacity</Form.Label>
                <Form.Control type="number" min = "0" placeholder="Enter location capacity" onChange = {handleCapacity} />
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
  
  class UpdateLocation extends Component{
  render(){
  return(
      <div>
          <UpdateLocationModal />
      </div>
  );
  };
};
export default UpdateLocation;
