import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';





const Schedulee = props => (
  <tr>
    <td>{props.exercise.Type}</td>
    <td>{props.exercise.Timing}</td>
    <td>{props.exercise.location}</td>
    <td>{props.exercise.Date.substring(0,10)}</td>
    <td>{props.exercise.Slot}</td>
    <td>{props.exercise.compensationslot}</td>

  </tr>
)


export default class Schedule extends Component {
    constructor(props) {
        super(props);

        this.state = {schedule: []};     
    }

componentDidMount(){
    axios.get('http://localhost:3000/AM/viewSchedule/')
    .then(response=>{
        
            this.setState({schedule:response.data })      
    })
    .catch(error=>{
        console.log(error);
    } )
}

schedule() {
  return this.state.schedule.map(currentSchedule => {
    return <Schedulee schedule={currentSchedule} />;
  })
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