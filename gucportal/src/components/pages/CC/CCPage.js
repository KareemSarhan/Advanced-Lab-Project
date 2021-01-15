import React, { Component, useState } from 'react'
import { Button,Modal,Form, Dropdown,Accordion,Card} from 'react-bootstrap'
import AddSlot from './AddSlotModal'
import DeleteSlot from './DeleteSlot'
import RejectSlotLinkingReq from './RejectSlotLinkingReq'
import UpdateSlot from './UpdateSlot'
import ViewSlotLinkingReq from './ViewSlotLinkinReq'
import AcademicMemberPage from '../../AcademicMemberPage'




  class CCPage extends Component{
  render(){
      return(
            <div> 
            <AcademicMemberPage/>  
        <Accordion>
        <Card>
            <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Course Coordinator Actions
            </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
            <Card.Body>
            <AddSlot/><br/>
            <DeleteSlot/><br/>
            <UpdateSlot/><br/>
            <ViewSlotLinkingReq/><br/>  
            </Card.Body>
            </Accordion.Collapse>
        </Card>
        
        </Accordion>
    </div>
      )
  };
};
export default CCPage;