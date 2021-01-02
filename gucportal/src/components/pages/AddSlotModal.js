import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddSlotModal() {
    const [show, setShow] = useState(false);
    const [type, setType]= useState("");
    const [location, setLocation] = useState("");
    const [timing, setTiming] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleType = (e) => setType(e.target.value);
    const handleLocation= (e) => setLocation(e.target.value);
    const handleTiming = (e) => setTiming(e.target.value);

    const handleSubmit =()=>{
        const loc = {
            type: type,
            location: location,
            timing: timing
        };
        console.log(loc);
        axios.put('/CC/AddSlot', loc).then((res)=>{
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
          AddSlot
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddSlot</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicType" required>
                <Form.Label>Slot Type</Form.Label>
                <Form.Control type="text" placeholder="Enter slot type" onChange = {handleType}/>
            </Form.Group>

            <Form.Group controlId="formBasicLocation" required>
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" placeholder="Enter slot location" onChange = {handleLocation} />
            </Form.Group>

            <Form.Group controlId="formBasicTiming" required>
                <Form.Label>Timing</Form.Label>
                <Form.Control type="text" placeholder="Enter timing" onChange = {handleTiming} />
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
  
  class AddSlot extends Component{
  render(){
  return(
      <div>
          <AddSlot />
      </div>
  );
  };
};
export default AddSlot;
