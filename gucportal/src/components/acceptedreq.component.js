import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class acceptedrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {acceptedreqs: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewAcceptedReq')
        .then(res=>{
            
                this.setState({acceptedreqs:res.data })   
                swal(res.data)
              })
              .catch((error) => {
                console.log(error)
              });
    }


    render() {
      if(!(this.state.acceptedreqs.length)){
        return <div>NO Accepted Requests</div>
      }
        return (
            <div>
        <h3>My Accepted Requests </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Requested Day</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.acceptedreqs.filter((acceptedreqs)=>
            {return acceptedreqs.DayoffRequestID}).map((acceptedreqs)=>
            <div>{acceptedreqs.DayoffRequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.DayoffStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.dayoffDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.Dayoffcomment}</div>
            )
            }
          </td>
          </tbody>
        </table>
      
          <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Requested Day</th>
              <th>Requested ID</th>
              <th>Requested Slot</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>

          <td>
          {
            this.state.acceptedreqs.filter((acceptedreqs)=>
            {return acceptedreqs.repreqRequestID}).map((acceptedreqs)=>
            <div>{acceptedreqs.repreqRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.repreqStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.repreqDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.RequestedID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.repreqRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.repreqcomment}</div>
            )
            }
          </td>
          </tbody>
        </table>
        

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Course ID</th>
              <th>Requested Slot</th>
               <th>Comment</th> 
            </tr>
          </thead>
          <tbody>
 
          <td>
          {
            this.state.acceptedreqs.filter((acceptedreqs)=>
            {return acceptedreqs.slotlinkRequestID}).map((acceptedreqs)=>
            <div>{acceptedreqs.slotlinkRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.slotlinkStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.CourseID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.linkRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.slotlinkcomment}</div>
            )
            }
          </td>
 </tbody>
        </table>


        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Leave Type</th>
              <th>Days No</th>
              <th>Leave Date</th>
              <th>Replacement ID</th>
              <th>Absence Date</th>
              <th>Compensation Date</th>
              <th>Reason</th>
              <th>Document</th>
              <th>Document Date</th> 
               <th>HOD Comment</th>   
            </tr>
          </thead>
          <tbody>

          <td>
          {
            this.state.acceptedreqs.filter((acceptedreqs)=>
            {return acceptedreqs.leavesRequestID}).map((acceptedreqs)=>
            <div>{acceptedreqs.leavesRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.leavesStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.LeaveType}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.NoofDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.DateofLeave}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.ReplacementID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.AbsenceDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.CompensationDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.Reason}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.Document}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.DocumentDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.acceptedreqs.map((acceptedreqs)=>
            <div>{acceptedreqs.leavecomment}</div>
            )
            }
          </td>
          </tbody>
        </table>
      </div>


            );
  }
}