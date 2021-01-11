import React, { Component, useState } from 'react'
import { Button,Modal,Form, InputGroup, FormControl, DropdownButton, ToggleButton,ButtonGroup} from 'react-bootstrap'

import axios from 'axios'

function Menu2Modal() {
    const [show, setShow] = useState(false);
    //const [name, setName]= useState("");
    //const [type, setType] = useState("");
    //const [capacity, setCapacity] = useState(0);

    const [type, setType] = useState("Office");
    console.log(type)

    // const radios = [
    //   { name: "Office", value: 'Office' },
    //   { name: "Lab", value: "Lab" },
    //   { name: "Lecture Hall", value: "Lecture Hall" },
    //   { name: "Room", value: "Room" },
    // ];
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //const handleName = (e) => setName(e.target.value);
    //const handleType = (e) => setType(e.target.value);
    //setTypeR("hkj");
   // const handleCapacity = (e) => setCapacity(e.target.value);
    // const handleSubmit =(e)=>{
    //   e.preventDefault();
    //     const loc = {
    //         name: name,
    //         type: type,
    //         capacity: capacity
    //     };
    //     console.log(loc);
    //     axios.post('/Hr/addLocation', loc).then((res)=>{
    //         console.log("success");
    //         //console.log(res.data.msg)
            
    //     }).catch((err)=>{
    //         console.log("error");
    //     });
    //     handleClose();
    // }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          Menu2
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Menu2</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
              
                <Form.Group controlId="formBasicType" required>
                <Form.Label>Location Type</Form.Label><br/>
                  <Form.Control as="select" onChange={(e)=> setType(e.currentTarget.value)}>
                    <option value="Office">Office</option>
                    <option value= "Room">Room</option>
                    <option value="Lecture Hall">Lecture Hall</option>
                    <option value="Lab">Lab</option>
                  </Form.Control>
                </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  class Menu2 extends Component{
  render(){
  return(
      <div>
          <Menu2Modal />
      </div>
  );
  };
};
export default Menu2;
