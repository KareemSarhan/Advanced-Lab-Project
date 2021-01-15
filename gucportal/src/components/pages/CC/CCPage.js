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
            <AddSlot/><br/>
            <DeleteSlot/><br/>
            <UpdateSlot/><br/>
            <ViewSlotLinkingReq/><br/>  
            <AcademicMemberPage/>  
        </div>
      )
  };
};
export default CCPage;