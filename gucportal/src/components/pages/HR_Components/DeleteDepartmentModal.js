import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DeleteDepartmentModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleSubmit =()=>{
        const dep = {
            name: name
        };
        console.log(dep);
        axios.delete('/Hr/deleteDepartment/' + name, dep).then((res)=>{
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
          DeleteDepartment
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>DeleteDepartment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Department Name</Form.Label>
                <Form.Control type="text" placeholder="Enter department name" onChange = {handleName}/>
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
  
  class DeleteDepartment extends Component{
  render(){
  return(
      <div>
          <DeleteDepartmentModal />
      </div>
  );
  };
};
export default DeleteDepartment;
