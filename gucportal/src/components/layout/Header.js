import React, { Component } from 'react'
import { Button,Collapse,Nav,Navbar,NavDropdown, NavbarBrand, NavLink, Container, Form,FormControl, Card } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel';
import viewProfile from '../pages/viewProfile'

import axios from 'axios'
const handleViewProfile = (e) => {
    e.preventDefault();
    axios.get('/Member/viewProfile').then(response => {
    //   setUserSession(response.data.token, response.data.user);
      console.log("ay 7agaaaaa")
      
    }).catch(error => {
  
    });
  }
class Header extends Component{
    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render(){
        return (
            <div>
                <Navbar bg="dark" variant= "dark" expand="lg" className= "mb-5" fixed="top">
                    <Container>
                    <Navbar.Brand href="#">GUC</Navbar.Brand>
                    <Navbar.Toggle  onClick= {this.toggle} aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse isOpen = {this.state.isOpen} id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                        <Nav.Link href="/viewProfile">Profile</Nav.Link>
                        <Nav.Link href="#link">Notifications</Nav.Link>
                        <Nav.Link href="#link">Sign-In</Nav.Link>
                        <Nav.Link href="#link">Sign-Out</Nav.Link>
                        <Nav.Link href="#link">LogOut</Nav.Link>
                        <NavDropdown title="Attendance" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">View Missing Hours</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">View Missing Days</NavDropdown.Item>
                            <NavDropdown.Item href="/viewAllAttendance">View Attendance</NavDropdown.Item>


                            <NavDropdown.Divider />
                        </NavDropdown>
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/4.1">Update Profile</NavDropdown.Item>
                            <NavDropdown.Item href="#action/4.2">Reset Password</NavDropdown.Item>


                            <NavDropdown.Divider />
                        </NavDropdown>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            
            </div>
          );
    }
 
}

export default Header;
