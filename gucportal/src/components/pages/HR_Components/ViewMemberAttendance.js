import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import ViewMemAttButtonModal from './ViewMemAttButton'

class ViewMemberAttendance extends Component{
    
    constructor(props) {
      super(props); 
  
      this.state = {attendances: []};
    }
    componentDidMount(){
   console.log(this.props.history.location.pathname.substring(22))
        axios.get('/Hr/viewAttendance/'+ this.props.history.location.pathname.substring(22))
          .then(res => {
           this.setState( {attendances: res.data})
           console.log("success");
           console.log(res.data);
         
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
                <h3>Member Attendance Records</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Memberid</th>
              <th>signIn</th>
              <th>signOut</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
          <td>
          {
            this.state.attendances.map((attendance)=>
            <div>{attendance.Memberid}</div>
            )
            }
          </td>
          <td>
          {
            this.state.attendances.map((attendance)=>
            <div>{attendance.signIn}</div>
            )
            }
          </td>
          <td>
          {
            this.state.attendances.map((attendance)=>
            <div>{attendance.signOut}</div>
            )
            }
          </td>
          <td>
          {
            this.state.attendances.map((attendance)=>
            <div>{attendance.duration}</div>
            )
            }
          </td>
          </tbody>
        </table>
            </div>
  );
  };
};
export default ViewMemberAttendance;