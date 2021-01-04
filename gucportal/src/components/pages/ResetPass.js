import React, { Component, useState } from 'react'
import { Button,Collapse,Nav,Navbar,NavDropdown, NavbarBrand, NavLink, Container, Form,FormControl, Card ,Modal} from 'react-bootstrap'
import swal from 'sweetalert';


import axios from 'axios'

function ResetPassword() {
  const [show, setShow] = useState(false);
  const [NewPassword, setNewPassword]= useState("");
    


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewPassword = (e) => setNewPassword(e.target.value);
   
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
          NewPassword :NewPassword,
          
        };
      //  console.log(mem);
        axios.post('/Member/resetPassword', mem)
        .then(res => {
          swal(res.data.msg)
    })
    .catch((err) => swal(err.response.data.errmsg || err.response.data));
    handleClose();
}

  
    return (
      <div>
        <NavDropdown.Item  variant="primary" onClick={handleShow}>
          Reset Password
        </NavDropdown.Item>
  
        <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Reset your password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="NewPassword" placeholder="Enter a new password" onChange = {handleNewPassword}/>
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
  
  class ResetPass extends Component{
  render(){
  return(
      <div>
          <ResetPassword />
      </div>
  );
  };
};
export default ResetPass;

