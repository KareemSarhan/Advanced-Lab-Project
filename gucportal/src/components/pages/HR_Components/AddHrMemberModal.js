import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddHrMemberModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [officeLocation, setOfficeLocation]= useState("");
    const [phoneNumber, setPhoneNumber]= useState(0);
    const [SecondayMail, setSecondayMail]= useState("");
    const [gender, setGender]= useState("");

  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleSalary = (e) => setSalary(e.target.value);
    const handleOfficeLocation = (e) => setOfficeLocation(e.target.value);
    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleSecondayMail = (e) => setSecondayMail(e.target.value);
    const handleSubmit =(e)=>{
        e.preventDefault();
        const mem = {
            name: name,
            email: email,
            salary: salary,
            officeLocation: officeLocation,
            type: "HR",
            phoneNumber: phoneNumber,
            SecondayMail: SecondayMail,
            gender: gender
        };
        console.log(mem);
        axios.post('/Hr/addStaffMember', mem).then((res)=>{
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
          AddHrMember
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddHrMember</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Member Name</Form.Label>
                <Form.Control type="text" placeholder="Enter member name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter member email" onChange = {handleEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicOffice" required>
                <Form.Label>Office Location</Form.Label>
                <Form.Control type="text" placeholder="Enter office location" onChange = {handleOfficeLocation}/>
            </Form.Group>

            <Form.Group controlId="formBasicSalary" required>
                <Form.Label>Salary</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter member salary" onChange = {handleSalary} />
            </Form.Group>

            <Form.Group controlId="formBasicGender" required>
                <Form.Label>Gender</Form.Label><br/>
                  <Form.Control as="select" onChange={(e)=> setGender(e.currentTarget.value)}>
                    <option value="Male">Male</option>
                    <option value= "Female">Female</option>
                  </Form.Control>
                </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber" >
                <Form.Label>Member Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Enter member phone number" onChange = {handlePhoneNumber}/>
            </Form.Group>

            <Form.Group controlId="formBasicSecMail" >
                <Form.Label>Member Secondary Mail</Form.Label>
                <Form.Control type="email" placeholder="Enter member secondary mail" onChange = {handleSecondayMail}/>
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
  
  class AddHrMember extends Component{
  render(){
  return(
      <div>
          <AddHrMemberModal />
      </div>
  );
  };
};
export default AddHrMember;
