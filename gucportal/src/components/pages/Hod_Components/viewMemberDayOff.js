import React, { Component, useState, history, useHistory } from 'react'
import { Button,Modal,Form} from 'react-bootstrap'
import {Link, Router, Route, Redirect} from 'react-router-dom'
import axios from 'axios'
import viewMembers from './viewMembers';
import { withRouter } from 'react-router-dom';

class viewMemberDayOff extends Component{
    
    constructor(props) {
      super(props);
  
      //this.getMembers = this.getMembers.bind(this)  
  
      this.state = {members: []};
    }
    componentDidMount(){
   console.log(this.props.history.location.pathname.substring(13))
        axios.get('/Hod/viewDaysOff/'+ this.props.history.location.pathname.substring(13))
          .then(res => {
           this.setState( {members: res.data})
         
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
                <h3>Members</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Day Off</th>
            </tr>
          </thead>
          <tbody>
          <td>
          {
            this.state.members.name
            }
          </td>
          <td>
          {
            this.state.members.id
            }
          </td>
          <td>
          {
            this.state.members.dayOff
            }
          </td>
          </tbody>
        </table>
            </div>
  );
  };
};
export default viewMemberDayOff;
