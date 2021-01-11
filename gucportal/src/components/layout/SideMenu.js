import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class SideBar extends Component {

	render() {
	
		return (
            <div>
                <br/>
                <br/>
                <br/>

			<SideNav
                onSelect={(selected) => {}}
                style={{backgroundColor:"black", height: '100%', position: 'fixed',direction:'rtl' ,width:"4%",top:"50px"}}
            >
                <SideNav.Toggle />
                <SideNav.Nav>
                    <NavItem eventKey="personalInfo" title="Add Acedmic Member">
                        <NavIcon>
                            <a href="/personalinfo">
                            <i className="fa fa-info-circle" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                            </a>
                        </NavIcon>
                        <NavText>
                            <a style={{ paddingRight:"25px" ,fontSize:"15px" }}href="/UpdateSlot">Update slot</a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="changeEmail" title="Change your email">
                        <NavIcon>
                            <a href="/changeemail">
                            <i className="fa fa-at" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                            </a>
                        </NavIcon>
                        <NavText>
                            <a style={{ paddingRight:"50px" ,fontSize:"15px" }}href="/viewSlotLinkingReq">View Slot Linking Requests</a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="chnagePassword" title="Change Password">
                        <NavIcon>
                            <a href="/changepassword">
                            <i className="fa fa-key" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                            </a>
                        </NavIcon>
                        <NavText>
                            <a style={{ paddingRight:"25px" ,fontSize:"15px" }}href="/changepassword">Change your password</a>
                        </NavText>
                    </NavItem>
                  
                    
                     <NavItem eventKey="viewCv" title="View/download your CV">
                        <NavIcon>
                            <a href="/cv">
                            <i className="fa fa-file-pdf" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                            </a>
                        </NavIcon>
                        <NavText>
                            <a style={{ paddingRight:"18px" ,fontSize:"15px" }}href="/cv">View/download your CV</a>
                        </NavText>
                    </NavItem>

                    <NavItem eventKey="editCv" title="Edit your CV">
                        <NavIcon>
                            <a href="/editcv">
                            <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                            </a>
                        </NavIcon>
                        <NavText>
                            <a style={{ paddingRight:"95px" ,fontSize:"15px" }}href="/editcv">Edit your CV</a>
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>

            </div>
		);
	}
}
export default SideBar;