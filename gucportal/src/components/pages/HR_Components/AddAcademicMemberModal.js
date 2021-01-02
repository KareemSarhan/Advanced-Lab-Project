import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddAcademicMemberModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [type, setType] = useState("");
    const [email, setEmail] = useState("");
    const [salary, setSalary] = useState(0);
    const [officeLocation, setOfficeLocation]= useState("");
    const [phoneNumber, setPhoneNumber]= useState(0);
    const [SecondayMail, setSecondayMail]= useState("");
    const [gender, setGender]= useState("");
    const [faculty, setFaculty]= useState("");
    const [department, setDepartment]= useState("");
    const [dayOff, setDayOff]= useState("");
    const [academicType, setAcademicType]= useState("");

  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleType = (e) => setType(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleSalary = (e) => setSalary(e.target.value);
    const handleOfficeLocation = (e) => setOfficeLocation(e.target.value);
    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleSecondayMail = (e) => setSecondayMail(e.target.value);
    const handleGender = (e) => setGender(e.target.value);
    const handleFaculty = (e) => setFaculty(e.target.value);
    const handleDepartment = (e) => setDepartment(e.target.value);
    const handleDayOff = (e) => setDayOff(e.target.value);
    const handleAcademicType = (e) => setAcademicType(e.target.value);
    const handleSubmit =()=>{
        const mem = {
            name: name,
            email: email,
            salary: salary,
            officeLocation: officeLocation,
            type: type,
            phoneNumber: phoneNumber,
            SecondayMail: SecondayMail,
            gender: gender,
            faculty: faculty,
            department: department,
            dayOff: dayOff,
            academicType: academicType
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
          AddAcademicMember
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddHAcademicMember</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Member Name</Form.Label>
                <Form.Control type="text" placeholder="Enter member name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicType" required>
                <Form.Label>Member Type (HR / Academic)</Form.Label>
                <Form.Control type="text" placeholder="Enter member type" onChange = {handleType}/>
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

            <Form.Group controlId="formBasicFaculty" required>
                <Form.Label>Faculty</Form.Label>
                <Form.Control type="text" placeholder="Enter member Faculty" onChange = {handleFaculty} />
            </Form.Group>

            <Form.Group controlId="formBasicDepartment" required>
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" placeholder="Enter member Department" onChange = {handleDepartment} />
            </Form.Group>

            <Form.Group controlId="formBasicDayOff" required>
                <Form.Label>DayOff</Form.Label>
                <Form.Control type="text" placeholder="Enter member dayOff" onChange = {handleDayOff} />
            </Form.Group>

            <Form.Group controlId="formBasicAcademicType" required>
                <Form.Label>Academic Type (academic member/CourseInstructor)</Form.Label>
                <Form.Control type="text" placeholder="Enter member academic type" onChange = {handleAcademicType} />
            </Form.Group>

            <Form.Group controlId="formBasicGender" required>
                <Form.Label>Member Gender</Form.Label>
                <Form.Control type="text" placeholder="Enter member gender" onChange = {handleGender}/>
            </Form.Group>

            <Form.Group controlId="formBasicPhoneNumber" >
                <Form.Label>Member Phone Number</Form.Label>
                <Form.Control type="number" placeholder="Enter member phone number" onChange = {handlePhoneNumber}/>
            </Form.Group>

            <Form.Group controlId="formBasicSecMail" >
                <Form.Label>Member Secondary Mail</Form.Label>
                <Form.Control type="text" placeholder="Enter member secondary mail" onChange = {handleSecondayMail}/>
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
  
  class AddAcademicMember extends Component{
  render(){
  return(
      <div>
          <AddAcademicMemberModal />
      </div>
  );
  };
};
export default AddAcademicMember;
