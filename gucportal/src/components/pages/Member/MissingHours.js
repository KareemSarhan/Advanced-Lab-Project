import React, { Component } from 'react'
import axios from "axios";


var x ;
export class ViewHours extends Component {
  constructor(props) {
    super(props);


    this.state = {members: []};
  }
  componentDidMount() {
    axios.get('Member/viewHours',{headers:{"authtoken":localStorage.getItem("authtoken")}})
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
                <h3 style={{
           marginLeft:"15px",
           }}>My Missing hours</h3>
        <table className="table" style={{
           
           marginLeft:"15px",
          
           }}>
          <thead className="thead-light">
            <tr>
              <th>Spent Hours</th>

              <th>Missing Hours</th>
              <th>Extra Hours</th>

              

            </tr>
          </thead>
          <tbody>
          <td>
          {
            
            this.state.members.map((members)=>
            <div>{members.SpentHours}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.MissingHours}</div>
            )
            }
          </td>
          <td>
          {
            this.state.members.map((members)=>
            <div>{members.ExtraHour}</div>
            )
            }
          </td>

          </tbody>
        </table>
            </div>
        )
    }
}

export default ViewHours;