import React, { Component } from 'react'
import axios from "axios";
//import members from '../../../../../models/members';

var x ;
export class viewMembers extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {members: []};
  }
  componentDidMount() {
    axios.get('/Hod/viewMembersDep')
      .then(res => {
       this.setState( {members: res.data})
     
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
    render() {
        return (
            <div>
            <br/>
            <br/>
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
          <tbody>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.name}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.id}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.email}</div>
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
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.type}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.faculty}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.department}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.office}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.officeHourse}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.dayOff}</div>
            )
            }
          </td>
          </tbody>
        </table>
            </div>
        )
    }
}

export default viewMembers