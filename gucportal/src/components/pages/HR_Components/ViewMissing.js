import React, { Component } from 'react'
import axios from "axios";

const Members = props => (
  <tr>
    <td>{props.member.Memberid}</td>
    <td>{props.member.missingDays}</td>
    <td>{props.member.remainingDays}</td>
    <td>{props.member.ExtraHours}</td>
    <td>{props.member.missingHours}</td>
    <td>{props.member.remainingHours}</td>
 
    {/* <td>
      <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
    </td> */}
  </tr>
)



 class ViewMissing extends Component {
  constructor(props) {
    super(props);

    //this.getMembers = this.getMembers.bind(this)  

    this.state = {Members: []};
  }
  componentDidMount() {
    axios.get('Hr/viewMissing')
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
           
                <h3>Missings</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Memberid</th>
              <th>missingDays</th>
              <th>remainingDays</th>
              <th>ExtraHours</th>
              <th>missingHours</th>
              <th>remainingHours</th>
            </tr>
          </thead>
        </table>
        </div>
        )
    }
}

export default ViewMissing;