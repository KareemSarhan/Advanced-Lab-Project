import React, { Component, useState } from 'react'
import axios from "axios";
import { Button,Modal,Form , DropdownButton,Dropdown} from 'react-bootstrap'


function ViewAllAttendanceByMonth() {
    const [show, setShow] = useState(true);
    const [Month, setMonth]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleMonth = (e) => setMonth(e.target.value);
    const handleSubmit =()=>{
        const Month = Month;
        console.log(Month);
        axios.get('/Member/viewAttendanceByMonth', Month).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
       
       <DropdownButton id="dropdown-basic-button" title="Choose a month">
        <Dropdown.Item href="#/action-1">January</Dropdown.Item>
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