import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DeleteLocationModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleSubmit =()=>{
        const loc = {
            name: name
        };
        console.log(loc);
        axios.delete('/Hr/deleteLocation/' + name, loc).then((res)=>{
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
          DeleteLocation
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>DeleteLocation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Location Name</Form.Label>
                <Form.Control type="text" placeholder="Enter location name" onChange = {handleName}/>
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
  
  class DeleteLocation extends Component{
  render(){
  return(
      <div>
          <DeleteLocationModal />
      </div>
  );
  };
};
export default DeleteLocation;
