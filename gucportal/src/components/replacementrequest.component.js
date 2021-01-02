import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';


const Replacement = props => (
    <tr>
      <td>{props.replacementrequest.RequestID}</td>
      <td>{props.replacementrequest.RequestedID}</td>
      <td>{props.replacementrequest.RequestedDay.substring(0,10)}</td>
      <td>{props.replacementrequest.RequestedSlot}</td>
      <td>{props.replacementrequest.Status}</td>
      <td>{props.replacementrequest.comment}</td>

    </tr>
  )
  


export default class replacementrequest extends Component {

    constructor(props) {
        super(props);

        this.state = {repreq: []};     
    }

    componentDidMount(){
        axios.get('http://localhost:3000/AM/viewReplacementReq/')
        .then(response=>{
            
                this.setState({repreq:response.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }
    

    replacementreq() {
        return this.state.repreq.map(currentrep => {
          return <Replacement reprequest={currentrep} />;
        })
      }

    render() {
        return (
            <div>
          
        <h3>My Replacement Requests </h3>
        <h4>
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
   Choose Status
  </button>
  <div class="dropdown">
  
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <li><a class="dropdown-item" href="#">Accepted</a></li>
    <li><a class="dropdown-item" href="#">Pending</a></li>
    <li><a class="dropdown-item" href="#">Rejected</a></li>
  </ul>
  <br/>
</div>
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