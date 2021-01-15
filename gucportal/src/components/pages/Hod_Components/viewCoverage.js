import React, { Component } from 'react'
import axios from 'axios'

export class viewCoverage extends Component {
    constructor(props) {
        super(props);
    
        //this.getMembers = this.getMembers.bind(this)  
    
        this.state = {courses: []};
      }
      componentDidMount() {
        axios.get('/Hod/viewCoverage')
          .then(res => {
           this.setState( {courses: res.data})
           swal(res.data.msg)
          })
          .catch((error) => {
            console.log(error);
          })
      }

    render() {
        return (
            <div>
            <h3>Courses Coverage</h3>
                <table id="coverage"  className="table">
          <thead className="thead-light">
            <tr>
              <th>Course</th>
              <th>Coverage</th>
            </tr>
          </thead>
          <tbody>
          
          <tr>
          <td>
          {
            this.state.courses.map((courses)=>
            <div>{courses.code}</div>
            )
            }
          </td>
          <td>
          {
            this.state.courses.map((courses)=>
            <div>{courses.coverage}</div>
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

export default viewCoverage
