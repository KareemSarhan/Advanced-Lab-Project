import React, { Component } from 'react'
import axios from 'axios'
export class viewDaysOffAll extends Component {
    constructor(props) {
        super(props);
    
        //this.getMembers = this.getMembers.bind(this)  
    
        this.state = {members: []};
      }
      componentDidMount() {
        axios.get('/Hod/viewDaysOffAll')
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
            <h3>Staff Days Off</h3>
                <table id="dayOff"  className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Day Off</th>
              
            </tr>
          </thead>
          <tbody>
          
          <tr>
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
            <div>{members.dayOff}</div>
            )
            }
          </td>
         
          </tr>
          </tbody>
        </table>
            </div>
        )
    }
}

export default viewDaysOffAll
