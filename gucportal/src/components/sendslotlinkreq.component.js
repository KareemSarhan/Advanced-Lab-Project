import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function SlotLinkModal() {
    const [show, setShow] = useState(false);
    const [memberID, setMemberID]= useState("");
    const [courseID, setCourseID] = useState("");
    const [requestedSlot, setrequestedSlot] = useState("");
    const [comment, setComment] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCourseID = (e) => setCourseID(e.target.value);
    const handlerequestedSlot = (e) => setrequestedSlot(e.target.value);
    const handleComment = (e) => setComment(e.target.value);

    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            courseID: courseID,
            requestedSlot: requestedSlot,
            comment: comment
        };
        console.log(mem);
      
        axios.post('/AM/sendSlotLinkReq', mem).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            swal(res.data.msg)
          })
          .catch((err) => {swal(err.response.data.errmsg || err.response.data.err)});
        handleClose();
    }
  
    return (
      <div>
          <button type="button" class="btn btn-dark"  onClick={handleShow}> AddSlotLinkRequest</button>
        {/* <Button variant="primary" class="btn btn-dark" onClick={handleShow}>
          AddReplacementRequest
        </Button> */}
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddReplacementRequest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

            <Form.Group controlId="formBasicID" required>
                <Form.Label>Course ID</Form.Label>
                <Form.Control type="text" placeholder="Enter Course ID" onChange = {handleCourseID} />
            </Form.Group>

            <Form.Group controlId="formBasicSlot" required>
                <Form.Label>Requested Slot</Form.Label>
                <Form.Control type="text" placeholder="Enter Requested Slot" onChange = {handlerequestedSlot} />
            </Form.Group>

            <Form.Group controlId="formBasiccomment" required>
                <Form.Label>Comment (optional)</Form.Label>
                <Form.Control type="text" placeholder="Comment" onChange = {handleComment} />
            </Form.Group>




            <Button variant="primary" type="submit" onClick={handleSubmit}>
                ADD
            </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  
  class SlotLinkRequest extends Component{
  render(){
  return(
      <div>
          <SlotLinkModal/>
      </div>
  );
  };
};
export default SlotLinkRequest;
