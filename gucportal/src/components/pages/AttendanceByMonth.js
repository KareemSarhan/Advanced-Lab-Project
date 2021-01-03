import React, { Component, useState } from 'react'
import axios from "axios";
import { Button,Collapse,Nav,Navbar,NavDropdown, NavbarBrand, NavLink, Container, Form,FormControl, Card ,DropdownButton,Dropdown} from 'react-bootstrap'



function ViewAllAttendanceByMonth() {
    const [show, setShow] = useState(true);
    const [Month, setMonth]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMonth = (e) => setMonth(e.target.value);
    const handleJan =(e)=>{
        e.preventDefault();

        console.log("yalaa")
        const mem = {
            Month: Month
        };
       console.log(mem);
       setMonth(e.target.value)
        axios.post('/Member/viewAttendanceByMonth', mem)
        .then(
          res =>
          {
            console.log(res)
            console.log(res.headers.authtoken)
            localStorage.setItem("authtoken",res.headers.authtoken)
            setMonth(e.target.value)

        },
        err =>
        {
          console.log("Feeeeeeee errorrrrrrrr"+err)
        })
    }
  
    return (
      <div>
       
       <DropdownButton id="dropdown-basic-button" title="Choose a month">
       <Dropdown.Item  Month="january" type="SignIn" onSelect={handleJan}>
                january
            </Dropdown.Item>
        <Dropdown.Item href="#/action-2">February </Dropdown.Item>
         <Dropdown.Item href="#/action-3">March </Dropdown.Item>
         <Dropdown.Item href="#/action-3">April </Dropdown.Item>
         <Dropdown.Item href="#/action-3">May </Dropdown.Item>
         <Dropdown.Item href="#/action-3">June </Dropdown.Item>
         <Dropdown.Item href="#/action-3">July </Dropdown.Item>
         <Dropdown.Item href="#/action-3">Augest </Dropdown.Item>
         <Dropdown.Item href="#/action-3">September </Dropdown.Item>
         <Dropdown.Item href="#/action-3">October </Dropdown.Item>
         <Dropdown.Item href="#/action-3">November </Dropdown.Item>
         <Dropdown.Item href="#/action-3">December </Dropdown.Item>
        </DropdownButton>
            
      </div>
    );
  }
  
  class ViewAttendanceByMonth extends Component{
  render(){
  return(
      <div>
          <ViewAllAttendanceByMonth />
      </div>
  );
  };
};
export default ViewAllAttendanceByMonth;