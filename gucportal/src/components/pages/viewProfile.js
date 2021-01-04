
import React, { Component } from 'react'
import axios from "axios";
import { Button ,Card} from 'react-bootstrap';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBSelect,MDBInputGroup } from 'mdbreact';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './requests.css'
import UpdateProfile from './UpdateProfile'
import ResetPassword from './ResetPass'

var x ;



export class ViewProfile extends Component {
  constructor(props) {
    super(props);


    this.state = {members: []};
  }
  componentDidMount() {
    axios.get('/Member/viewProfile')
      .then(res => {
       this.setState( {members: res.data})
       console.log(this.state.members.name)
     
      })
      .catch((error) => {
        console.log(error);
      })
  }

  
    render() {
      return (

        <Card 
        style={{
            width:"55%",
            height:"100%",
            paddingLeft:"0.5px",
            backgroundColor:'rgba(0,0,0,0.005)',
            marginLeft:"50px",
            top:"10px",
            paddingTop:"0.3px"
            }}
        >
          <Card.Body style={{backgroundColor:"dark"}}>
            <div>
    <MuiThemeProvider style={{marginLeft:"50px"}}>
 <div>
  <u>    <h4 style={{fontWeight:"bold",color:"black",marginLeft:"10px"}}>
                   My Profile : 
                    </h4></u>



<div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Name : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.name}</h5></div>
            )
    }</div>

</div>
 
 <div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Email : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.email}</h5></div>
            )
    }</div>






</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Faculty : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.faculty}</h5></div>
            )
    }</div>






</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Department : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.department}</h5></div>
            )
    }</div>






</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Day Off : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.dayOff}</h5></div>
            )
    }</div>






</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Office : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.office}</h5></div>
            )
    }</div>




</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Salary so far : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.salarySoFar}</h5></div>
            )
    }</div>

</div>
<div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Salary : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.salary}</h5></div>
            )
    }</div>

</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Phone Number: </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.phoneNumber}</h5></div>
            )
    }</div>

</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Secondary Email: </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.SecondaryEmail}</h5></div>
            )
    }</div>

</div><div class="flex-container">
        <div><h5 style={{fontWeight:"500"}}>Office hours : </h5></div>
    <div>{
            this.state.members.map((members)=>
              <div><h5 style ={{fontWeight:"400"},{fontFamily:"initial"}}>{members.Officehours}</h5></div>
            )
    }</div>

</div>
                  

                    

                   

                  

                    
      </div>
    </MuiThemeProvider>
            </div>
      </Card.Body>
      </Card>
  
);
}
}
const style = {
margin: 15
};


export default ViewProfile;