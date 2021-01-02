import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import axios from 'axios'

function ResetPassword() {
    const [show, setShow] = useState(false);
    const [NewPassword, setName]= useState("");
  
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleNewPassword = (e) => setName(e.target.value);
   
    const handleSubmit =()=>{
        const Password  = {
            NewPassword : NewPassword
        };
        console.log(Password);
        axios.post('/Member/resetPassword', Password).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" class="floated" onClick={handleShow} class= "mt-10">
        Reset Password
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Reset your password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName" required>
                <Form.Label>New Password</Form.Label>
                <Form.Control type="text" placeholder="Enter your new password " onChange = {handleNewPassword}/>
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
          <ResetPassword/>
      </div>
  );
  };
};
export default ResetPass;
