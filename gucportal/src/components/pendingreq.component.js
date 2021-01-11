import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class pendingrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {pendingreqs: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewPendingReq')
        .then(res=>{
            
                this.setState({pendingreqs:res.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }


    render() {
      if(!(this.state.pendingreqs.length)){
        return <div>NO Pending Requests</div>
      }
        return (
            <div>
        <h3>My Accepted Accepted Requests </h3>
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
            this.state.pendingreqs.filter((pendingreqs)=>
            {return pendingreqs.DayoffRequestID}).map((pendingreqs)=>
            <div>{pendingreqs.DayoffRequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.DayoffStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.dayoffDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.Dayoffcomment}</div>
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
            this.state.pendingreqs.filter((pendingreqs)=>
            {return pendingreqs.repreqRequestID}).map((pendingreqs)=>
            <div>{pendingreqs.repreqRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.repreqStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.repreqDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.RequestedID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.repreqRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.repreqcomment}</div>
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
            this.state.pendingreqs.filter((pendingreqs)=>
            {return pendingreqs.slotlinkRequestID}).map((pendingreqs)=>
            <div>{pendingreqs.slotlinkRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.slotlinkStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.CourseID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.linkRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.slotlinkcomment}</div>
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
            this.state.pendingreqs.filter((pendingreqs)=>
            {return pendingreqs.leavesRequestID}).map((pendingreqs)=>
            <div>{pendingreqs.leavesRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.leavesStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.LeaveType}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.NoofDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.DateofLeave}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.ReplacementID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.AbsenceDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.CompensationDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.Reason}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.Document}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.DocumentDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.pendingreqs.map((pendingreqs)=>
            <div>{pendingreqs.leavecomment}</div>
            )
            }
          </td>
          </tbody>
        </table>
      </div>


            );
  }
}