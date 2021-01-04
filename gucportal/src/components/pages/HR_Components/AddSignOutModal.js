import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddSignOutModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [year, setYear] = useState(0);
    const [month, setMonth] = useState(0);
    const [day, setDay] = useState(0);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleYear= (e) => setYear(e.target.value);
    const handleMonth= (e) => setMonth(e.target.value);
    const handleDay= (e) => setDay(e.target.value);
    const handleHour= (e) => setHour(e.target.value);
    const handleMinute= (e) => setMinute(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const loc = {
            id: id,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute
        };
        console.log(loc);
        axios.put('/Hr/AddSignOut/'+ id, loc).then((res)=>{
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
          AddSignOut
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddSignOut</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicID" required>
                <Form.Label>Member ID</Form.Label>
                <Form.Control type="text" placeholder="Enter member ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicYear" required>
                <Form.Label>Year</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter year" onChange = {handleYear} />
            </Form.Group>

            <Form.Group controlId="formBasicMonth" required>
                <Form.Label>Month</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter month" onChange = {handleMonth} />
            </Form.Group>

            <Form.Group controlId="formBasicDay" required>
                <Form.Label>Day</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter day" onChange = {handleDay} />
            </Form.Group>

            <Form.Group controlId="formBasicHour" required>
                <Form.Label>Hour</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter hour" onChange = {handleHour} />
            </Form.Group>

            <Form.Group controlId="formBasicMinute" required>
                <Form.Label>Minute</Form.Label>
                <Form.Control type="number" min="0" placeholder="Enter minute" onChange = {handleMinute} />
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
  
  class AddSignOut extends Component{
  render(){
  return(
      <div>
          <AddSignOutModal />
      </div>
  );
  };
};
export default AddSignOut;
