import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class Notification extends Component {
    constructor(props) {
        super(props);

        this.state = {notifications: []};     
    }

componentDidMount(){
    axios.get('http://localhost:3000/AM/notification/')
    .then(response=>{
        
            this.setState({notifications:response.data })      
    })
    .catch(error=>{
        console.log(error);
    } )
}
  render() {
    return (
        <div class="alert alert-primary" role="alert">
        Your <a href="#" class="alert-link">Request Type </a>is this.state.notifications.status 
      </div>    

    );
  }
}