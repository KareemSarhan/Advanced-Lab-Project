import React, { Component } from 'react'
import axios from "axios";


var x ;


export class ViewDays extends Component {
  constructor(props) {
    super(props);


  }
  componentDidMount() {
    axios.get('Member/viewMissingDays',{headers:{"authtoken":localStorage.getItem("authtoken")}})
      .then(res => {
        this.setState(res.data);
        console.log(this.state.TheAbsentDays)


      })
      .catch((error) => {
        console.log(error);
      })
  }

  
    render() {
      if (this.state == null) {
        return (
            <div>
                <h1>Loading..</h1>
            </div>
        );
    } else
        return (
            <div>
                <h3 style={{
           marginLeft:"50px",
           }}>My Missing Days</h3>
           <h4 style={{
           marginLeft:"50px"}}>{this.state.TheAbsentDays.length} days</h4>
        <table className="table" style={{
           
           marginLeft:"50px",
          
           }}>
          <thead className="thead-light">
            <tr>
              <th>Dates</th>


            </tr>
          </thead>
          <tbody>
          
          <td>
          <table className="table">
          <tr>
          <thead className="thead-light">
            <tr>
              <th>day                     </th>
              <th>time </th>
            </tr>
          </thead>
          </tr>
          <tbody>
                <td>
                {
            this.state.TheAbsentDays.map((day)=>
            <div>{day.i.substring(8,16)}</div>
            )
            }

                </td>
                
                <td>
                {
            this.state.TheAbsentDays.map((day)=>
            <div>{day.i.substring(0,8)}</div>
            )
            }

                </td>
          </tbody>
        </table>
         
          </td>
          

          </tbody>
        </table>
        
            </div>
        )
    }
}

export default ViewDays;