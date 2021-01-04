import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function UpdateStaffMemberModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [officeLocation, setOfficeLocation] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleOfficeLocation = (e) => setOfficeLocation(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const loc = {
            id: id,
            officeLocation: officeLocation
        };
        console.log(loc);
        axios.put('/Hr/updateStaffMember/'+ id, loc).then((res)=>{
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
          UpdateStaffMember
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>UpdateStaffMember</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicID" required>
                <Form.Label>Member ID</Form.Label>
                <Form.Control type="text" placeholder="Enter member ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicOffice">
                <Form.Label>New Office</Form.Label>
                <Form.Control type="text" placeholder="Enter new office" onChange = {handleOfficeLocation} />
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
  
  class UpdateStaffMember extends Component{
  render(){
  return(
      <div>
          <UpdateStaffMemberModal />
      </div>
  );
  };
};
export default UpdateStaffMember;
