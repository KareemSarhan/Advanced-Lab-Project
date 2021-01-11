import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
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
        })
        .catch(error=>{
            console.log(error);
        } )
    }

    
      render() {
        return (
            <div>
        <h3>My Requests </h3>
        <h4>
           
        <DropdownButton id="dropdown-basic-button" title="Choose request status">
        <Dropdown.Item href="#/acceptedreq">Accepted</Dropdown.Item>
        <Dropdown.Item href="#/rejectedreq">Rejected </Dropdown.Item>
         <Dropdown.Item href="#/pendingreq">Pending </Dropdown.Item>
        </DropdownButton>
  </h4>
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>RequestID</th>
              <th>RequestedID</th>
              <th>Requested Day</th>
              <th>Slot</th>
              <th>Status</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.requests.map((requests)=>
            <div>{requests.RequestID}</div>
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
            <div>{requests.RequestedDay.substring(0,10)}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.RequestedSlot}</div>
            )
            }
          </td>
          <td>
          {
            this.state.requests.map((requests)=>
            <div>{requests.Status}</div>
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
          </tbody>
        </table>
      </div>


            );
  }
}