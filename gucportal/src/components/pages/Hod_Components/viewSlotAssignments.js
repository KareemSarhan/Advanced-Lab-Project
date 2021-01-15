import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import viewMembers from './viewMembers';
import { withRouter } from 'react-router-dom';

class viewSlotAssignments extends Component{
    
    constructor(props) {
      super(props);
  
      //this.getMembers = this.getMembers.bind(this)  
  
      this.state = {members: []};
    }
    componentDidMount(){
   console.log(this.props.history.location.pathname.substring(21))
        axios.get('/Hod/viewSlotAssignments/'+ this.props.history.location.pathname.substring(21))
          .then(res => {
           this.setState( {members: res.data})
           swal(res.data.msg)
          })
          .catch((error) => {
            console.log(error);
          })
    }
  render(){
  return(
    
    <div>
    {/* <div><ViewCourseMembersModal history= {this.props.history}/></div> */}
            <br/>
            <br/>
                <h3>Course Slots</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Timing</th>
              <th>Room</th>
              <th>Room Type</th>
              <th>Slot Type</th>
            </tr>
          </thead>
          <tbody>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.name}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.id}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.timing}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.room}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.roomType}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.slotType}</div>
            )
            }
          </td>
         
          </tbody>
        </table>
            </div>
  );
  };
};
export default viewSlotAssignments;
