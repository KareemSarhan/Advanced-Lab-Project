import React, { Component } from 'react'
import axios from "axios";
import UpdateProfile from "./UpdateProfile"
import ResetPassword from "./ResetPass"



const Members = props => (
  <tr>
    <td>{props.member.name}</td>
    <td>{props.member.email}</td>
    <td>{props.member.faculty}</td>
    <td>{props.member.department}</td>
    <td>{props.member.dayOff}</td>
    <td>{props.member.Office}</td>
    <td>{props.member.course}</td>
    <td>{props.member.salarySoFar}</td>
    <td>{props.member.salary}</td>
    <td>{props.member.phoneNumber}</td>
    <td>{props.member.SecondaryEmail}</td>
    <td>{props.member.OfficeHours}</td>




    
  </tr>
)



 class ViewProfile extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {Members: []};
  }
  componentDidMount() {
    axios.get('/Member/viewProfile',{headers:{"authtoken":localStorage.getItem("authtoken")}})
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
                <h3>My profile</h3>
                <div>
                <UpdateProfile/><br/><ResetPassword/>
                </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Faculty</th>
              <th>Department</th>
              <th>DayOff</th>
              <th>Office</th>
              <th>Course</th>
              <th>SalarySoFar</th>
              <th>Salary</th>
              <th>phone Number</th>
              <th>Secondary Email</th>
              <th>Office Hours</th>

            </tr>
          </thead>
        </table>
     
            </div>
        )
    }
}

export default ViewProfile;