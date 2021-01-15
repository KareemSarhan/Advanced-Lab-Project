import React, { Component, useState } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

function LeaveModal() {
    const [show, setShow] = useState(false);
    const [Leavetype, setLeavetype] = useState("");
    const [numberOfdays, setnumberOfdays] = useState("");
    const [dateOfLeave, setdateOfLeave] = useState("");
    const [replacementID, setreplacementID] = useState("");
    const [dateOfabsence, setdateOfabsence] = useState("");
    const [dateOfcompensation, setdateOfcompensation] = useState("");
    const [document, setdocument] = useState("");
    const [dateOfdocument, setdateOfdocument] = useState("");
    const [reason, setreason] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleLeavetype = (e) => setLeavetype(e.target.value);
    const handlenumberOfdays = (e) => setnumberOfdays(e.target.value);
    const handledateOfLeave = (e) => setdateOfLeave(e.target.value);
    const handlereplacementID = (e) => setreplacementID(e.target.value);
    const handledateOfabsence = (e) => setdateOfabsence(e.target.value);
    const handledateOfcompensation= (e) => setdateOfcompensation(e.target.value);
    const handledocument = (e) => setdocument(e.target.value);
    const handledateOfdocument = (e) => setdateOfdocument(e.target.value);
    const handlereason = (e) => setreason(e.target.value);


    const handleSubmit =(e)=>{
      e.preventDefault();
        const mem = {
                            Leavetype: Leavetype,
                            numberOfdays: numberOfdays,
                            dateOfLeave: dateOfLeave,
                            replacementID: replacementID,
                            dateOfabsence: dateOfabsence,
                            dateOfcompensation: dateOfcompensation,
                            document: document,
                            dateOfdocument: dateOfdocument,
                            reason: reason
        };
        console.log(mem);
      
        axios.post('/AM/sendLeaveReq', mem).then((res)=>{
            console.log("success");
            //console.log(res.data.msg)
            swal(res.data.msg)
        })
        .catch((err) => {swal(err.response.data.errmsg || err.response.data.err)});
      handleClose(); 
       
    }
   
  
    return (
      <div>
          <button type="button" class="btn btn-dark"  onClick={handleShow}> AddLeaveRequest</button>
       
  
        <Modal show={show}
        onHide={handleClose}
        keyboard={false}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
          <Modal.Header>
            <Modal.Title>AddLeaveRequest</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>

            <Form.Group controlId="formBasicleavetype" required>
                <Form.Label>Leave Type</Form.Label><br/>
                  <Form.Control as="select" onChange={(e)=> setLeavetype(e.currentTarget.value)}>
                    <option value="Accidental">Accidental</option>
                    <option value= "Annual">Annual</option>
                    <option value="Compensation">Compensation</option>
                    <option value="Maternity">Maternity</option>
                    <option value="Sick">Sick</option>  
                  </Form.Control>
                </Form.Group>

         

            <Form.Group controlId="formBasicnoOfdays" required>
                <Form.Label>Number of days</Form.Label>
                <Form.Control type="number" min="0" placeholder="no of days" onChange = {handlenumberOfdays} />
            </Form.Group>

            <Form.Group controlId="formBasicdateOfleave" required>
                <Form.Label>Date of Leave</Form.Label>
                <Form.Control type="Date"  placeholder="Date pf leave" onChange = {handledateOfLeave} />
            </Form.Group>

            <Form.Group controlId="formBasicreplacementID" required>
                <Form.Label>Replacement ID</Form.Label>
                <Form.Control type="text"  placeholder="Replacement ID" onChange = {handlereplacementID} />
            </Form.Group>

            <Form.Group controlId="formBasicdateofabsence" required>
                <Form.Label>Date of absence</Form.Label>
                <Form.Control type="Date"  placeholder="Date of absence" onChange = {handledateOfabsence} />
            </Form.Group>

            <Form.Group controlId="formBasicdateofcompensation" required>
                <Form.Label>Date Of Compensation</Form.Label>
                <Form.Control type="Date"  placeholder="date Of compensation" onChange = {handledateOfcompensation} />
            </Form.Group>

            <Form.Group controlId="formBasicdocument" required>
                <Form.Label>Document</Form.Label>
                <Form.Control type="text"  placeholder="Document" onChange = {handledocument} />
            </Form.Group>

            <Form.Group controlId="formBasicreplacementID" required>
                <Form.Label>Document Date</Form.Label>
                <Form.Control type="Date"  placeholder="Document Date" onChange = {handledateOfdocument} />
            </Form.Group>

            <Form.Group controlId="formBasicreason" required>
                <Form.Label>Reason</Form.Label>
                <Form.Control type="text"  placeholder="Reason" onChange = {handlereason} />
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
  
  class LeaveRequest extends Component{
  render(){
  return(
      <div>
          <LeaveModal/>
      </div>
  );
  };
};
export default LeaveRequest;
