import React, { Component } from 'react'
import axios from "axios";
import ViewAllAttendanceByMonth from './AttendanceByMonth'


var x ;
export class ViewAllAttendance extends Component {
  constructor(props) {
    super(props);


    this.state = {members: []};
  }
  componentDidMount() {
    axios.get('Member/viewAllAttendance',{headers:{"authtoken":localStorage.getItem("authtoken")}})
      .then(res => {
       this.setState( {members: res.data})
       console.log(this.state.members.name)
     
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
    render() {
        return (
            <div>
                <h3 style={{
           marginLeft:"200px",
           }}>My Attendance</h3>
               <div style={{
           
           marginLeft:"200px",
          
           }}> <ViewAllAttendanceByMonth/> <br></br></div>
        <table className="table" style={{
           
            marginLeft:"200px",
           
            }}
>
          <thead className="thead-light">
            <tr>
              <th>SignIn</th>
              <th>SignOut</th>
              <th>Duration</th>

            </tr>
          </thead>
          <tbody>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.signIn}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.signOut}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.duration}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.courses}</div>
            )
            }
          </td>
         
          </tbody>
        </table>
            </div>
        )
    }
}

export default ViewAllAttendance;