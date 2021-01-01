import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function LoginModal() {
    const [show, setShow] = useState(true);
    const [email, setEmail]= useState("");
    const [password, setPassword] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleSubmit =()=>{
        const mem = {
            email: email,
            password: password
        };
        console.log(mem);
        axios.post('/Member/login', mem).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
  
    return (
      <div>
        <Button variant="primary" onClick={handleShow}>
          Login modal
        </Button>
  
        <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange = {handleEmail}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" required>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange = {handlePassword} />
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
  
  class Login extends Component{
  render(){
  return(
      <div>
          <LoginModal />
      </div>
  );
  };
};
export default Login;
