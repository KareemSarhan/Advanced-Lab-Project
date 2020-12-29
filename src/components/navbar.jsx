import React, { Component } from "react";
import axios from 'axios';
import { getToken, removeUserSession, setUserSession } from '../Utils/Common';

const handleViewProfile = () => {
  axios.get('http://localhost:3000/MemberRouter/viewProfile').then(response => {
    setUserSession(response.data.token, response.data.user);
    console.log("ay 7agaaaaa")
  }).catch(error => {

  });
}
class NavBar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-dark bg-dark mb-3">
          <a className="navbar-brand" href="#">
          <input type="button" onClick={handleViewProfile} value="viewProfile" />

          </a>
          <a className="navbar-brand" href="#">
          <h1>Logout <span className="badge badge-secondary"></span></h1>
          
          </a>
        </nav>
      </React.Fragment>
    );
  }
}
 
export default NavBar;