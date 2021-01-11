import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function DayOffModal() {
    const [show, setShow] = useState(false);
    const [requestedDay, setRequestedDay] = useState("");
    const [comment, setComment] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRequestedDay = (e) => setRequestedDay(e.target.value);
    const handleComment = (e) => setComment(e.target.value);

    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
            requestedDay:requestedDay,
            comment: comment
        };
        console.log(mem);
      
        axios.post('/AM/sendChangeDayOffReq', mem).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            
        }).catch((err)=>{
            console.log("error");
        });
        handleClose();
    }
   
  
    return (
      <div>
          <button type="button" class="btn btn-dark"  onClick={handleShow}> AddDayOffRequest</button>
       
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddDayOffRequest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

            <Form.Group controlId="formBasicDay" required>
                <Form.Label>Requested Day</Form.Label>
                <Form.Control type="text" placeholder="Enter Day" onChange = {handleRequestedDay} />
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
  
  class DayoffRequest extends Component{
  render(){
  return(
      <div>
          <DayOffModal/>
      </div>
  );
  };
};
export default DayoffRequest;
