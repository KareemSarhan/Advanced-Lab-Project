import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddLocationModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [type, setType] = useState("");
    const [capacity, setCapacity] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleType = (e) => setType(e.target.value);
    const handleCapacity = (e) => setCapacity(e.target.value);
    const handleSubmit =()=>{
        const loc = {
            name: name,
            type: type,
            capacity: capacity
        };
        console.log(loc);
        axios.post('/Hr/addLocation', loc).then((res)=>{
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
          AddLocation
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddLocation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text" placeholder="Enter location name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicType" required>
                <Form.Label>Location Type</Form.Label>
                <Form.Control type="text" placeholder="Enter location type" onChange = {handleType} />
            </Form.Group>

            <Form.Group controlId="formBasicCapacity" required>
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
  
  class AddLocation extends Component{
  render(){
  return(
      <div>
          <AddLocationModal />
      </div>
  );
  };
};
export default AddLocation;