import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';





const Schedulee = props => (
  <tr>
    {/* <td>{"lecture"}</td>
    <td>{"2nd"}</td> */}
    <td>{props.academicmembers.schedule.Type}</td>
    <td>{props.academicmembers.schedule.Timing}</td>
    <td>{props.academicmembers.schedule.location}</td>
    <td>{props.academicmembers.schedule.Date.substring(0,10)}</td>
    <td>{props.academicmembers.schedule.Slot}</td>
    <td>{props.academicmembers.schedule.compensationslot}</td>

  </tr>
)


export default class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {Schedulee: []};     
    }

componentDidMount(){
    axios.get('/AM/viewSchedule/')
    .then(response=>{
        
            this.setState({Schedulee:response.data })      
    })
    .catch(error=>{
        console.log(error);
    } )
}

schedule() {
  return <Schedulee/>;
}
  render() {
    return (
        <div>
          
        <h3>My Schedule</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Type</th>
              <th>Timing</th>
              <th>location</th>
              <th>Date</th>
              <th>Slot</th>
              <th>CompensationSlot</th>
              <th>CompensationDate</th>
            </tr>
          </thead>
          <tbody>
            { this.schedule() }
          </tbody>
        </table>
      </div>

    );
  }
}