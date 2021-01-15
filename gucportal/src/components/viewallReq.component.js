import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import{DropdownButton,Dropdown} from 'react-bootstrap'

  


export default class Allrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {requests: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewAllReq')
        .then(res=>{
            
                this.setState({requests:res.data })      
                swal(res.data)
              })
              .catch((error) => {
                console.log(error)
              });
       
    }

    
      render() {  
        if(!(this.state.requests.length)){
          return <div>NO Requests</div>
        }
       
        return (
            <div>
        <h3>My Requests </h3>
        <h4>
           
        <DropdownButton id="dropdown-basic-button" title="Choose request status">
        <Dropdown.Item href="/acceptedreq">Accepted</Dropdown.Item>
        <Dropdown.Item href="/pendingreq">Pending </Dropdown.Item>
        <Dropdown.Item href="/rejectedreq">Rejected </Dropdown.Item>
        
        </DropdownButton>
  </h4>
 
       
    
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Request ID</th>
              <th>Status</th>
              <th>Requested Day</th>
              <th>Comment</th>
              <th>Cancel</th>

            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.requests.filter((requests)=>
            {return requests.DayoffRequestID}).map((requests)=>
            <div>{requests.DayoffRequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.DayoffStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.dayoffDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.Dayoffcomment}</div>
            )
            }
          </td>
          {
          <td>
             {       
             this.state.requests.filter((requests)=>
             {return requests.DayoffRequestID}).map((requests)=>
             <div>
             <Link to={"/Cancelrequest/"+requests.DayoffRequestID}>Cancel</Link>     
             </div>
             )
             }
          
             </td>
      }
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
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>

          <td>
          {
            this.state.requests.filter((requests)=>
            {return requests.repreqRequestID}).map((requests)=>
            <div>{requests.repreqRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.repreqStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.repreqDayRequested}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.RequestedID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.repreqRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.repreqcomment}</div>
            )
            }
          </td>
          {
          <td>
             {       
             this.state.requests.filter((requests)=>
             {return requests.repreqRequestID}).map((requests)=>
             <div>
             <Link to={"/Cancelrequest/"+requests.repreqRequestID}>Cancel</Link>     
             </div>
             )
             }
          
             </td>
      }
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
               <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
 
          <td>
          {
            this.state.requests.filter((requests)=>
            {return requests.slotlinkRequestID}).map((requests)=>
            <div>{requests.slotlinkRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.slotlinkStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.CourseID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.linkRequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.slotlinkcomment}</div>
            )
            }
          </td>
          {
          <td>
             {       
             this.state.requests.filter((requests)=>
             {return requests.slotlinkRequestID}).map((requests)=>
             <div>
             <Link to={"/Cancelrequest/"+requests.slotlinkRequestID}>Cancel</Link>     
             </div>
             )
             }
          
             </td>
      }
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
               <th>Cancel</th>  
            </tr>
          </thead>
          <tbody>

          <td>
          {
            this.state.requests.filter((requests)=>
            {return requests.leavesRequestID}).map((requests)=>
            <div>{requests.leavesRequestID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.leavesStatus}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.LeaveType}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.NoofDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.DateofLeave}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.ReplacementID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.AbsenceDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.CompensationDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.Reason}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.Document}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.DocumentDate}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.leavecomment}</div>
            )
            }
          </td>
          {
          <td>
             {       
             this.state.requests.filter((requests)=>
             {return requests.leavesRequestID}).map((requests)=>
             <div>
             <Link to={"/Cancelrequest/"+requests.leavesRequestID}>Cancel</Link>     
             </div>
             )
             }
          
             </td>
      }
          </tbody>
        </table>
      </div>

);
            
  }
}