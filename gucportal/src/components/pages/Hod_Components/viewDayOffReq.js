import React, { Component } from 'react'
import axios from 'axios'
export class viewDayOffReq extends Component {
    constructor(props) {
        super(props);
    
        //this.getMembers = this.getMembers.bind(this)  
    
        this.state = {requests: []};
      }
      componentDidMount() {
        axios.get('/Hod/viewDayOffReq')
          .then(res => {
           this.setState( {requests: res.data})
         
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        return (
            <div>
            <h3>Day Off Requests</h3>
                <table id="leaves"  className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>Name</th>
              <th>ID</th>
              <th>Requested Day</th>
              <th>Status</th>  
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          
          <tr>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.requestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.name}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.id}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.requestedDay}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.status}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.comment}</div>
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

export default viewDayOffReq
