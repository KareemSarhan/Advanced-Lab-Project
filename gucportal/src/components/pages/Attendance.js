import React, { Component } from 'react'
import axios from "axios";
import UpdateProfile from "./UpdateProfile"
import ResetPassword from "./ResetPass"
import ViewAllAttendanceByMonth from './AttendanceByMonth'



const Members = props => (
  <tr>
    
    <td>{props.member.Date}</td>
    <td>{props.member.SignIn}</td>
    <td>{props.member.SignOut}</td>
    



    {/* <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)



 class ViewAllAttendance extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {Members: []};
  }
  componentDidMount() {
    axios.get('Member/viewAllAttendance',{headers:{"authtoken":localStorage.getItem("authtoken")}})
      .then(response => {
        this.setState({ Members: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }


    render() {
        return (
            <div> 
                <h3>My Attendance log</h3>
                <ViewAllAttendanceByMonth/> <br></br>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Date</th>
              <th>SignIn</th>
              <th>SignOut</th>

            </tr>
          </thead>
        </table>
     
            </div>
        )
    }
}

export default ViewAllAttendance;