import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function LoginModal() {
    const [show, setShow] = useState(true);
    const [SlotMember, setSlotMember]= useState("");
    const [SlotTiming, setSlotTiming] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSlotMember = (e) => setSlotMember(e.target.value);
    const handleSlotTiming = (e) => setSlotTiming(e.target.value);
    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            SlotMember: SlotMember,
            SlotTiming: SlotTiming
        };
     //   console.log(mem);
        axios.put('/CC/deleteSlot', mem)
        .then((res) => {
            swal(res.data.msg);
        })
        .catch((err) => swal(err.response.data.errmsg || err.response.data));
    handleClose();
};
  
    return (
      <div>
        
        <Modal show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>Delete a slot .</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail" required>
                <Form.Label>Slot Member</Form.Label>
                <Form.Control type="SlotMember" placeholder="Enter id of the member giving the slot" onChange = {handleSlotMember}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" required>
                <Form.Label>Slot timing</Form.Label>
                <Form.Control type="SlotTiming" placeholder="Enter the slot timing" onChange = {handleSlotTiming} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Delete
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
