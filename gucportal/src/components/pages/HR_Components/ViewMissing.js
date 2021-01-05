import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import axios from 'axios';
import{DropdownButton,Dropdown} from 'react-bootstrap'

 class ViewMissing extends Component {

    constructor(props) {
        super(props);

        this.state = {missings: []};     
    }
    
    componentDidMount(){
        axios.get('/Hr/viewMissing')
        .then(res=>{
          console.log("here");
                this.setState({missings:res.data })      
        })
        .catch(error=>{
            console.log(error);
        } )
    }

    
      render() {
        return (
            <div>
        <h3>Missings </h3>
       
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>MemberID</th>
              <th>Missing Days</th>
              <th>Remaining Days</th>
              <th>Extra Hours</th>
              <th>Missing Hours</th>
              <th>Remaining Hours</th>
            </tr>
          </thead>
          <tbody>
            <td>
            {
            this.state.missings.map((missing)=>
            <div>{missing.memberID}</div>
            )
            }
            </td>
            <td>
          {
            this.state.missings.map((missing)=>
            <div>{missing.missingDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.missings.map((missing)=>
            <div>{missing.remainingDays}</div>
            )
            }
          </td>
          <td>
          {
            this.state.missings.map((missing)=>
            <div>{missing.ExtraHours}</div>
            )
            }
          </td>
          <td>
          {
            this.state.missings.map((missing)=>
            <div>{missing.missingHours}</div>
            )
            }
          </td>
          <td>
          {
            this.state.missings.map((missing)=>
            <div>{missing.remainingHours}</div>
            )
            }
          </td>
          </tbody>
        </table>
      </div>


            );
  }
}

export default ViewMissing;