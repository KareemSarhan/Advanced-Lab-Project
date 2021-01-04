import './App.css';
import React ,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Header from './components/layout/Header';
//import SideBar from './components/layout/SideMenu';

import Login from './components/pages/LoginModal';
import AddLocation from './components/pages/HR_Components/AddLocationModal';
import DeleteLocation from './components/pages/HR_Components/DeleteLocationModal';
import UpdateLocation from './components/pages/HR_Components/UpdateLocationModal';
import AddFaculty from './components/pages/HR_Components/AddFacultyModal';
import UpdateFaculty from './components/pages/HR_Components/UpdateFacultyModal';
import DeleteFaculty from './components/pages/HR_Components/DeleteFacultyModal';
import AddDepartment from './components/pages/HR_Components/AddDepartmentModal';
import UpdateDepartment from './components/pages/HR_Components/UpdateDepartmentModal';
import DeleteDepartment from './components/pages/HR_Components/DeleteDepartmentModal';
import AddCourse from './components/pages/HR_Components/AddCourseModal';
import UpdateCourse from './components/pages/HR_Components/UpdateCourseModal';
import DeleteCourse from './components/pages/HR_Components/DeleteCourseModal';
import AddHrMember from './components/pages/HR_Components/AddHrMemberModal';
import AddAcademicMember from './components/pages/HR_Components/AddAcademicMemberModal';
import UpdateStaffMember from './components/pages/HR_Components/UpdateStaffMemberModal';
import DeleteStaffMember from './components/pages/HR_Components/DeleteStaffMemberModal';
import AssignHod from './components/pages/HR_Components/AssignHodModal';
import AddSignIn from './components/pages/HR_Components/AddSignInModal';
import AddSignOut from './components/pages/HR_Components/AddSignOutModal';
import UpdateSalary from './components/pages/HR_Components/UpdateSalaryModal';
import LocationAll from './components/pages/HR_Components/LocationAll';
import HRPage from './components/pages/HR_Components/HRPage';
import {BrowserRouter as Router,Route} from "react-router-dom" 
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
import viewDayOffReq from './components/pages/Hod_Components/viewDayOffReq';
//import ViewProfile  from './components/pages/viewProfile';
import ViewAllAttendance  from './components/pages/Attendance';




class App extends Component {
  render(){
  return (
    <div>
      <div className="app">
        {/* <Header /><br/><br/>   */}
        
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
      </Router>
        <br/>
        <br/>
       
        <AddLocation /><br/>
        <UpdateLocation /> <br/>
        <DeleteLocation /><br/>
        <AddFaculty /><br/>
        <UpdateFaculty /><br/>
        <DeleteFaculty /><br/>
        <AddDepartment /><br/>
        <UpdateDepartment /><br/>
        <DeleteDepartment /><br/>
        <AddCourse /><br/>
        <UpdateCourse /><br/>
        <DeleteCourse /><br/>
        <AddHrMember /><br/>
        <AddAcademicMember /><br/>
        <UpdateStaffMember /><br/>
        <DeleteStaffMember /><br/>
        <AssignHod /><br/>
        <AddSignIn /><br/>
        <AddSignOut /><br/>
        <UpdateSalary /><br/>
        
        <Router>
       
      <div className="container">
      <Route path="/" component={Login} />
      <Navbar />
<br/>
      <Route path="/" component={Login} /> 
      <Route path="/Hr" component={HRPage} />
      <Route path="/notification" component={Notification} />
      <Route path="/schedule" component={Schedule} />
      <Route path="/homepage" component={Home} />
      <Route path="/replacementrequest" component={ReplacementRequest} />
     
    </div>
    </Router>
      </div>
    </div>
      
    
  );
}
}

export default App;