import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import{DropdownButton,Dropdown} from 'react-bootstrap'
import { Button,Modal,Form} from 'react-bootstrap'

import axios from 'axios'

var id = "";

 class ViewMemberAttendance extends Component {

    constructor(props) {
        super(props);

        this.state = {attendances: []};     
    }
    
    componentDidMount(){
        console.log(this.props.location.state.id);
        axios.get('/Hr/viewAttendance/' +this.props.location.state.id)
        .then(res=>{
          console.log("here");
          console.log(props);
         this.setState({attendances:res.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }

    
      render() {
        return (
            <div>
        <h3>Attendance Records </h3>
       
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
  }
}

export default ViewMemberAttendance;