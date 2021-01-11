import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideMenu";
import Menu2 from "./components/layout/Menu2";

import Login from "./components/pages/LoginModal";

import HRPage from "./components/pages/HR_Components/HRPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CourseInstructorPage from "./components/pages/CI_Components/CourseInstructor";
import Navbar from "./components/navbar.component";
import Notification from "./components/notification.component";
import Schedule from "./components/schedule.component";
import Home from "./components/homepage.component";
import ReplacementRequest from "./components/replacementrequest.component";
import Menu from './components/layout/Menu';
import viewMembers from './components/pages/Hod_Components/viewMembers';
import viewLeaveRequests from './components/pages/Hod_Components/viewLeaveRequests'
import viewSickLeaves from './components/pages/Hod_Components/viewSickLeaves'
import viewAccidentalLeaves from './components/pages/Hod_Components/viewAccidentalLeaves'
import {Link} from 'react-router-dom'
import viewAnnualLeaves from './components/pages/Hod_Components/viewAnnualLeaves';
import viewCompensationLeaves from './components/pages/Hod_Components/viewCompensationLeaves';
import viewMaternityLeaves from './components/pages/Hod_Components/viewMaternityLeaves'
import viewCoverage from './components/pages/Hod_Components/viewCoverage'
import viewDaysOffAll from './components/pages/Hod_Components/viewDaysOffAll';
import viewDayOffReq from './components/pages/Hod_Components/viewDayOffReq'
import viewCourseMembers from './components/pages/Hod_Components/ViewCourseMembersModal'
import acceptDayOffReq from './components/pages/Hod_Components/acceptDayOffReq';
import AssignInstructor from './components/pages/Hod_Components/AssignInstructorModal'
import DeleteInstructor from './components/pages/Hod_Components/DeleteInstructorModal'
import updateInstructor from './components/pages/Hod_Components/UpdateInstructorModal'
import acceptSickLeave from './components/pages/Hod_Components/acceptLeave';
import rejectLeave from './components/pages/Hod_Components/RejectLeave'
import rejectDayOffReq from './components/pages/Hod_Components/RejectDayOffReq'
import viewMember from './components/pages/Hod_Components/viewMember'
import ViewCourseSlotsModal from './components/pages/Hod_Components/ViewCourseSlotsModal'
import viewSlots from './components/pages/Hod_Components/viewSlotAssignments'
import ViewMemberDayOffModal from './components/pages/Hod_Components/ViewMemberDayOffModal';
import viewMemberDayOff from './components/pages/Hod_Components/viewMemberDayOff';
import ViewProfile from "./components/pages/viewProfile";
import ViewAllAttendance from "./components/pages/Attendance";
import ViewMissing from './components/pages/HR_Components/ViewMissing';
import ViewMemberAttendance from './components/pages/HR_Components/ViewMemberAttendance';
import ViewMemAttButtonModal from './components/pages/HR_Components/ViewMemAttButton';

class App extends Component {
  render(){
  return (
    <div>
      <div className="app">
        <Header /><br/><br/>  
        
       <Router>
       <Link to="/Menu" className="navbar-brand">Menu</Link>
        <Route path="/Menu" exact component={Menu}/>
      <Route path="/viewMembers"  exact component={viewMembers}/>
      <Route path="/viewLeaveReq"  component={viewLeaveRequests}/>
      <Route path="/SickLeaves"  component={viewSickLeaves}/>
      <Route path="/AccidentalLeaves"  component={viewAccidentalLeaves}/>
      <Route path="/AnnualLeaves"  component={viewAnnualLeaves}/>
      <Route path="/CompensationLeaves"  component={viewCompensationLeaves}/>
      <Route path="/MaternityLeaves"  component={viewMaternityLeaves}/>
      <Route path="/viewCoverage"  component={viewCoverage}/>
      <Route path="/viewDaysOffAll"  component={viewDaysOffAll}/>
      <Route path="/viewDayOffReq"  component={viewDayOffReq}/>
      <Route path="/viewCourseMember"  component={viewCourseMembers}/>
      <Route path="/acceptDayOffReq/"  component={acceptDayOffReq}/>
      <Route path="/acceptLeaveReq/"  component={acceptSickLeave}/>
      <Route path="/AssignInstructor/"  component={AssignInstructor}/>
      <Route path="/deleteInstructor/"  component={DeleteInstructor}/>
      <Route path="/updateInstructor/"  component={updateInstructor}/>
      {/* <Route path="/acceptSickLeave/:id?" component={acceptSickLeave}/>  */}
      <Route path="/rejectLeaveReq/" component={rejectLeave}/> 
      <Route path="/rejectDayOffReq/" component={rejectDayOffReq}/>
      <Route path="/viewCourseMembers/" component={viewMember}/> 
      <Route path="/viewSlotAssignments/" component={viewSlots}/> 
      <Route path="/viewSlotAssignment/" component={ViewCourseSlotsModal}/> 
      <Route path="/viewDayOff/" component={ViewMemberDayOffModal}/>
      <Route path="/viewDaysOff/" component={viewMemberDayOff}/>  
      	
      </Router>
        <br/>
        <br/>
       
        
        <Router>
       
      <div className="container">
      <Navbar />
<br/>
      <br />
							<Route path="/" component={Login} />
              <Route path="/viewProfile" exact component={ViewProfile} />
							<Route path="/viewAllAttendance" component={ViewAllAttendance} />
							<Route path="/Hr" component={HRPage} />
							<Route path="/ViewMissing" component={ViewMissing} />
							<Route path="/ViewMemberAttendance/" component={ViewMemberAttendance} />
							<Route path="/viewMemAttButton/" component={ViewMemAttButtonModal}/>
      <Route path="/notification" component={Notification} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/homepage" component={Home} />
      <Route path="/replacementrequest" component={ReplacementRequest} />
      <Route
								path="/CourseInstructor"
								component={CourseInstructorPage}
							/>
              <Route
								path="/replacementrequest"
								component={ReplacementRequest}
							/>
     
    </div>
    </Router>
      </div>
    </div>
      
    
  );
}}

export default App;
