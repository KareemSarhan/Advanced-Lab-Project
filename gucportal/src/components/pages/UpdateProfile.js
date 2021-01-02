import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import axios from 'axios'

function UpdatePro() {
    const [show, setShow] = useState(false);
    const [NewSecondaryEmail, setName]= useState("");
    const [NewPhonenumber, setFacultyName] = useState("");
    const [NewOfficehours, setCode] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewSecondaryEmail = (e) => setName(e.target.value);
    const handleNewPhonenumber = (e) => setFacultyName(e.target.value);
    const handleNewOfficehours = (e) => setCode(e.target.value);
    const handleSubmit =()=>{
        const updates  = {
            NewSecondaryEmail : NewSecondaryEmail,
            NewPhonenumber: NewPhonenumber,
            NewOfficehours: NewOfficehours
        };
        console.log(updates);
        axios.post('/Member/updateProfile', updates).then((res)=>{
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
          Update profile
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Update your profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>NewSecondaryEmail</Form.Label>
                <Form.Control type="text" placeholder="Enter New Secondary email " onChange = {handleNewSecondaryEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicFacName" required>
                <Form.Label>NewPhonenumber</Form.Label>
                <Form.Control type="text" placeholder="Enter New phone number " onChange = {handleNewPhonenumber}/>
            </Form.Group>

            <Form.Group controlId="formBasicCode">
                <Form.Label>NewOfficehours</Form.Label>
                <Form.Control type="text" placeholder="Enter New office hours " onChange = {handleNewOfficehours} />
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
  
  class UpdateProfile extends Component{
  render(){
  return(
      <div>
          <h1>HDFHF</h1>
          <UpdatePro/>
      </div>
  );
  };
};
export default UpdateProfile;