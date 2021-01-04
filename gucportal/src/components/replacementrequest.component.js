import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
//import{DropdownButton,Dropdown} from 'react-bootstrap'

// const Replacement = props => (
//     <tr>
//       {/* <td>{"526682361"}</td>
//       <td>{"sad56446551dsf5"}</td> */}
//       <td>{props.replacementrequest.requestID}</td>
//       <td>{props.replacementrequest.requestedID}</td>
//       <td>{props.replacementrequest.requestedDay.substring(0,10)}</td>
//       <td>{props.replacementrequest.requestedSlot}</td>
//       <td>{props.replacementrequest.status}</td>
//       <td>{props.replacementrequest.comment}</td>
//     </tr>
//   )
  


export default class replacementrequest extends Component {

    constructor(props) {
        super(props);

        this.acceptReq = this.acceptReq.bind(this)

        this.state = {replacementrequests: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewReplacementReq')
        .then(res=>{
            
                this.setState({replacementrequests:res.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }

    acceptReq(requestID) {
      axios.post('/AM/AcceptReq'+requestID)
        .then(res => { console.log(res.data)})
        }

      render() {
        return (
            <div>
        <h3>My Replacement Requests </h3>
        {/* <h4>
           
        <DropdownButton id="dropdown-basic-button" title="Choose request status">
        <Dropdown.Item href="#/acceptedreq">Accepted</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rejected </Dropdown.Item>
         <Dropdown.Item href="#/action-3">Pending </Dropdown.Item>
        </DropdownButton>
  </h4> */}
  
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>RequestedID</th>
              <th>Requested Day</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Comment</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestedID}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestedDay.substring(0,10)}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.RequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.Status}</div>
            )
            }
          </td>
          <td>
          {
            this.state.replacementrequests.map((replacementrequests)=>
            <div>{replacementrequests.comment}</div>
            )
            }
          </td>
          <td>
          {
            
            <Link to={"/replacementrequest"} onClick={() => { this.state.acceptReq(this.replacementrequests.RequestedID) }}>Accept</Link> 
            }
          </td>
          </tbody>
        </table>
      </div>


            );
  }
}