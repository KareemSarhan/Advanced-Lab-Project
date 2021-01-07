import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function AssignHodModal() {
    const [show, setShow] = useState(false);
    const [id, setID]= useState("");
    const [department, setDepartment] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleID = (e) => setID(e.target.value);
    const handleDepartment= (e) => setDepartment(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const loc = {
            id: id,
            department: department
        };
        console.log(loc);
        axios.put('/Hr/AssignHod/'+ department, loc).then((res)=>{
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
          Assign Hod
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Assign Hod</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicID" required>
                <Form.Label>Member ID</Form.Label>
                <Form.Control type="text" placeholder="Enter member ID" onChange = {handleID}/>
            </Form.Group>

            <Form.Group controlId="formBasicDep" required>
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" placeholder="Enter department name" onChange = {handleDepartment} />
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
  
  class AssignHod extends Component{
  render(){
  return(
      <div>
          <AssignHodModal />
      </div>
  );
  };
};
export default AssignHod;
