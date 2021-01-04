import React, { Component } from 'react'
import axios from 'axios'

export class viewCompensationLeaves extends Component {
    constructor(props) {
        super(props);
    
        //this.getMembers = this.getMembers.bind(this)  
    
        this.state = {leaves: []};
      }
      componentDidMount() {
        axios.get('/Hod/viewCompensationLeaveReq')
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
            <h3>Compensation Leave Requests</h3>
                <table id="leaves"  className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>Name</th>
              <th>ID</th>
              <th>Date of Absence</th>
              <th>Status</th> 
              <th>Date of Compensation</th> 
              <th>Reason</th>
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
            <div>{leave.dateOfabsence}</div>
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
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.dateOfcompensation}</div>
            )
            }
          </td>
          <td>
          {
            this.state.leaves.map((leave)=>
            <div>{leave.reason}</div>
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

export default viewCompensationLeaves
