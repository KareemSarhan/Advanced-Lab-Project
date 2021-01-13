import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import SideBar from './SideMenu'
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import viewDayOffReq from '../pages/Hod_Components/viewDayOffReq'

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
export class Menu extends Component {
//     render() {
//         return (
//             <div>
//                 <nav class="navbar bg-light">

//                     <ul class="navbar-nav">
//                     <li class="nav-item">
//                         <a class="nav-link" href="/viewMembers">View Members </a>
//                     </li>
//                     <li class="nav-item">
//                         <Link to ="/viewLeaveReq" class="nav-link" >View Leave Requests</Link>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/AssignInstructor">Assign instructor </a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/viewDayOffReq">View Day Off Requests </a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/viewDaysOffAll">View Staff Day Off </a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/ViewCourseMember">View Course Members </a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/ViewCoverage">View Courses Coverage </a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/viewSlotAssignment/">View Course Slot Assignment</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/deleteInstructor">Delete Instructor</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/updateInstructor">Update Instructor</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="/viewDayOff/">Member Day Off</a>
//                     </li>
                   
//                     </ul>

// </nav>
//             </div>
//         )
//     }
render() {
	
    return (
        <div>
            <br/>
            <br/>
            <br/>
            <Router>
            <Route path="/viewDayOffReq" component={viewDayOffReq} />
            </Router>

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
                    <a style={{  paddingRight:"127px" ,fontSize:"15px" }}href="/schedule">View Schedule</a>
                        
                    </NavText>
                </NavItem>


                <NavItem eventKey="personalInfo" title="Add Acedmic Member">
                    <NavIcon>
                        <a href="/personalinfo">
                        <i className="fa fa-info-circle" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                    <a style={{  paddingRight:"127px" ,fontSize:"15px" }}href="/viewMembers">View Members</a>
                        
                    </NavText>
                </NavItem>

                <NavItem eventKey="changeEmail" title="Change your email">
                    <NavIcon>
                        <a href="/changeemail">
                        <i className="fa fa-at" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                    <a style={{  paddingRight:"115px" ,fontSize:"15px" }}href="/viewDayOffReq">Day Off requests</a>
                    </NavText>
                </NavItem>

                <NavItem eventKey="chnagePassword" title="Change Password">
                    <NavIcon>
                        <a href="/changepassword">
                        <i className="fa fa-key" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{  paddingRight:"90px" ,fontSize:"15px"}}href="/viewLeaveReq">View Leave requests</a>
                    </NavText>
                </NavItem>
              
                
                 <NavItem eventKey="viewCv" title="View/download your CV">
                    <NavIcon>
                        <a href="/cv">
                        <i className="fa fa-file-pdf" style={{ fontSize: '1.75em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"113px" ,fontSize:"15px" }}href="/AssignInstructor">Assign Instructor</a>
                    </NavText>
                </NavItem>

                <NavItem eventKey="editCv" title="Edit your CV">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"104px" ,fontSize:"15px" }}href="/viewDaysOffAll">View Staff Day Off</a>
                    </NavText>
                </NavItem>

                <NavItem eventKey="view course members" title="view course members">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"75px" ,fontSize:"15px" }}href="/ViewCourseMember">View Course Members</a>
                    </NavText>
                </NavItem>

                <NavItem eventKey="View coverage" title="View coverage">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"68px" ,fontSize:"15px" }}href="/ViewCoverage">View Courses Coverage</a>
                    </NavText>
                </NavItem>

                <NavItem eventKey="View Course Slots" title="View Course Slots">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"20px" ,fontSize:"15px" }}href="/viewSlotAssignment">View Cousre Slots Assignment</a>
                    </NavText>
                    </NavItem>

                    <NavItem eventKey="Delete Intsructor" title="Delete Intsructor">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"110px" ,fontSize:"15px" }}href="/deleteInstructor">Delete Instructor</a>
                    </NavText>
                    </NavItem>

                    <NavItem eventKey="Update Instructor" title="Update Instructor">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"105px" ,fontSize:"15px" }}href="/updateInstructor">Update Instructor</a>
                    </NavText>
                    </NavItem>

                    <NavItem eventKey="view Day Off" title="view Day Off">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"95px" ,fontSize:"15px" }}href="/viewDayOff">View Member Day Off</a>
                    </NavText>
                    </NavItem>

                    {/* <NavItem eventKey="editCv" title="Edit your CV">
                    <NavIcon>
                        <a href="/editcv">
                        <i className="fa fa-edit" style={{ fontSize: '1.7em',color:"#3C54F5"}} > </i>
                        </a>
                    </NavIcon>
                    <NavText>
                        <a style={{ paddingRight:"95px" ,fontSize:"15px" }}href="/deleteInstructor">Delete Instructor</a>
                    </NavText>
                </NavItem> */}
            </SideNav.Nav>
        </SideNav>

        </div>
    );
}


}

export default Menu
