import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DeleteFacultyModal() {
    const [show, setShow] = useState(false);
    const [name, setName]= useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleName = (e) => setName(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const fac = {
            name: name
        };
        console.log(fac);
        axios.delete('/Hr/deleteFaculty/' + name, fac).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            swal(res.data.msg)
          })
          .catch((err) => {swal(err.response.data.errmsg || err.response.data.err)});
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow} class= "mt-10">
          DeleteFaculty
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>DeleteFaculty</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>Faculty Name</Form.Label>
                <Form.Control type="text" placeholder="Enter faculty name" onChange = {handleName}/>
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
  
  class DeleteFaculty extends Component{
  render(){
  return(
      <div>
          <DeleteFacultyModal />
      </div>
  );
  };
};
export default DeleteFaculty;
