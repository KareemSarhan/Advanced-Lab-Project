import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import{DropdownButton,Dropdown} from 'react-bootstrap'

const Replacement = props => (
    <tr>
      {/* <td>{"526682361"}</td>
      <td>{"sad56446551dsf5"}</td> */}
      {/* <td>{props.replacementrequests.RequestID}</td>
      <td>{props.replacementrequests.RequestedID}</td>
      <td>{props.replacementrequests.RequestedDay.substring(0,10)}</td>
      <td>{props.replacementrequests.RequestedSlot}</td>
      <td>{props.replacementrequests.Status}</td>
      <td>{props.replacementrequests.comment}</td> */}
    </tr>
  )
  


export default class replacementrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {Replacement: []};     
    }

    componentDidMount(){
        axios.get('/AM/viewReplacementReq')
        .then(response=>{
            
                this.setState({Replacement:response.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }
    

    replacementreq() {
        return <Replacement/>;
      }

    render() {
        return (
            <div>
          
        <h3>My Replacement Requests </h3>
        <h4>
           
        <DropdownButton id="dropdown-basic-button" title="Choose request status">
        <Dropdown.Item href="#/action-1">Accepted</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Rejected </Dropdown.Item>
         <Dropdown.Item href="#/action-3">Pending </Dropdown.Item>
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
            { this.replacementreq() }
          </tbody>
        </table>
      </div>


            );
  }
}