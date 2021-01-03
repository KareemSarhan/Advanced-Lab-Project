import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import{Button,Modal,Form,DropdownButton,Dropdown} from 'react-bootstrap'


export class viewLeaveRequests extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {leaves: []};
  }
  componentDidMount() {
    axios.get('/Hod/viewLeaveReq')
      .then(res => {
       this.setState( {leaves: res.data})
     
      })
      .catch((error) => {
        console.log(error);
      })
  }

  

    render() {
        return (
            <div>
            <br/>
            <br/>
                <h3>Leave Requests</h3>
                <DropdownButton id="dropdown-basic-button" title="Type">
        <Dropdown.Item href="/AnnualLeaves">Annual</Dropdown.Item>
        <Dropdown.Item href="/AccidentalLeaves">Accidental </Dropdown.Item>
         <Dropdown.Item href="/MaternityLeaves">Maternity </Dropdown.Item>
         <Dropdown.Item href="/SickLeaves">Sick </Dropdown.Item>
         <Dropdown.Item href="/CompensationLeaves">Compensation </Dropdown.Item>
        </DropdownButton>
        <table id="leaves"  className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>Name</th>
              <th>ID</th>
              <th>Type</th>
              <th>Status</th>  
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          
          <tr>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.requestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.name}</div>
            )
            }
          </td>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.id}</div>
            )
            }
          </td>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.Leavetype}</div>
            )
            }
          </td>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.status}</div>
            )
            }
          </td>
          {/* <td>
          <Link to={"/acceptLeaveReq/"}>Accept</Link> | <Link to={"/rejectLeaveReq/"}>Reject</Link>
          </td> */}
          </tr>
          </tbody>
        </table>
            </div>
        )
    }
}

export default viewLeaveRequests