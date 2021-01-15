import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class rejectedrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {rejectedreqs: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewRejectedReq')
        .then(res=>{
            
                this.setState({rejectedreqs:res.data })
                swal(res.data)
              })
              .catch((error) => {
                console.log(error)
              });
    }


    render() {
      if(!(this.state.rejectedreqs.length)){
        return <div>NO rejected Requests</div>
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
            this.state.rejectedreqs.filter((rejectedreqs)=>
            {return rejectedreqs.DayoffRequestID}).map((rejectedreqs)=>
            <div>{rejectedreqs.DayoffRequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.DayoffStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.dayoffDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.Dayoffcomment}</div>
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
            this.state.rejectedreqs.filter((rejectedreqs)=>
            {return rejectedreqs.repreqRequestID}).map((rejectedreqs)=>
            <div>{rejectedreqs.repreqRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.repreqStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.repreqDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.RequestedID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.repreqRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.repreqcomment}</div>
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
            this.state.rejectedreqs.filter((rejectedreqs)=>
            {return rejectedreqs.slotlinkRequestID}).map((rejectedreqs)=>
            <div>{rejectedreqs.slotlinkRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.slotlinkStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.CourseID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.linkRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.slotlinkcomment}</div>
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
            this.state.rejectedreqs.filter((rejectedreqs)=>
            {return rejectedreqs.leavesRequestID}).map((rejectedreqs)=>
            <div>{rejectedreqs.leavesRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.leavesStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.LeaveType}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.NoofDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.DateofLeave}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.ReplacementID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.AbsenceDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.CompensationDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.Reason}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.Document}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.DocumentDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.rejectedreqs.map((rejectedreqs)=>
            <div>{rejectedreqs.leavecomment}</div>
            )
            }
          </td>
          </tbody>
        </table>
      </div>


            );
  }
}