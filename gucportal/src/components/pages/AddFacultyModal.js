import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AddFacultyModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
    const [numberOfYears, setNumberOfYears] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleNumberOfYears = (e) => setNumberOfYears(e.target.value);
    const handleSubmit =()=>{
        const loc = {
            name: name,
            numberOfYears: numberOfYears
        };
        console.log(loc);
        axios.post('/Hr/addFaculty', loc).then((res)=>{
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
          AddFaculty
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddFaculty</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Faculty name" onChange = {handleName}/>
            </Form.Group>

            <Form.Group controlId="formBasicNumberOfYears" required>
                <Form.Label>Number Of Years</Form.Label>
                <Form.Control type="number" min = "0" placeholder="Enter number of years" onChange = {handleNumberOfYears} />
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
  
  class AddFaculty extends Component{
  render(){
  return(
      <div>
          <AddFacultyModal />
      </div>
  );
  };
};
export default AddFaculty;
