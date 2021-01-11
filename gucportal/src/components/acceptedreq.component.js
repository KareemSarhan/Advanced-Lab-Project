import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';

export default class acceptedrequest extends Component {

    constructor(props) {
        super(props);

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


    render() {
        return (
            <div>
        <h3>My Accepted Requests </h3>
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
          </tbody>
        </table>
      </div>


            );
  }
}