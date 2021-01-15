import React, { Component } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
export class viewDayOffReq extends Component {
    constructor(props) {
        super(props);
    
        //this.getMembers = this.getMembers.bind(this)  
    
        this.state = {requests: []};
      }
      componentDidMount() {
        axios.get('/Hod/viewDayOffReq')
          .then(res => {
            console.log(res.msg);
           this.setState( {requests: res.data})
           swal(res.data.msg)
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
            <div>
            {requests.requestID}
            {/* <acceptDayOffReq valueFromviewDayOffReq= {requests.requestID}/> */}
            </div>

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
          <td>
          {       
          this.state.requests.map((requests)=>
          <div>
          <Link to={"/acceptDayOffReq/"+requests.requestID}>Accept</Link> | <Link to={"/rejectDayOffReq/"+requests.requestID}>Reject</Link>
          </div>
          )
          }
          </td>
          </tr>
          </tbody>
        </table>
            </div>
        )
    }
}

export default viewDayOffReq
