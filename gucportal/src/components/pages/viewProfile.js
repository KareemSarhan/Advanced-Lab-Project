import React, { Component } from 'react'
import axios from "axios";

const Members = props => (
  <tr>
    <td>{props.member.name}</td>
    <td>{props.member.id}</td>
    <td>{props.member.email}</td>
    <td>{props.member.course}</td>
    <td>{props.member.type}</td>
    <td>{props.member.faculty}</td>
    <td>{props.member.department}</td>
    <td>{props.member.officeLocation}</td>
    <td>{props.member.officeHourse}</td>
    <td>{props.member.dayOff}</td>
    {/* <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)



export class viewProfile extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {Members: []};
  }
  componentDidMount() {
    axios.get('http://localhost:5000/Member/viewProfile')
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
                <h3>Members</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
              <th>Courses</th>
              <th>Type</th>
              <th>Faculty</th>
              <th>Department</th>
              <th>Office</th>
              <th>Office Hours</th>
              <th>Day Off</th>
            </tr>
          </thead>
        </table>
            </div>
        )
    }
}

export default viewProfile;