import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';


export default class viewSchedule extends Component {
    constructor(props) {
        super(props);

        this.state = {schedule: []};     
    }

componentDidMount(){
    axios.get('/AM/viewSchedule')
    .then(response=>{
        
            this.setState({schedule:response.data })      
    })
    .catch(error=>{
        console.log(error);
    } )
}

// schedule() {
//   return <Schedulee/>;
// }
  render() {
    return (
        <div>
          
        <h3>My Schedule</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Type</th>
              <th>Course</th>
              <th>Location</th>
              <th>Location Type</th>
              <th>Timing</th>
              <th>Compensation Slot</th>
              <th>Compensation Date</th>
            </tr>
          </thead>
          <tbody>
          <td>
          {
            this.state.schedule.map((schedule)=>
            <div>{schedule.type}</div>
            )
            }   
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.courseName}</div>
            )
            }
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.locationName}</div>
            )
            }
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.locationType}</div>
            )
            }
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.timing}</div>
            )
            }
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.CompensationSlot}</div>
            )
            }
            </td>
            <td>
            {
            this.state.schedule.map((schedule)=>
            <div>{schedule.CompensationSlotDate}</div>
            )
            }
            </td>
          </tbody>
        </table>
      </div>

    );
  }
}