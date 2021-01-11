import './App.css';
import React ,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/layout/Header';
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
        <AddLocation /><br/>
        <LocationAll /><br/>
        
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
      <Navbar />
<br/>

      <Route path="/" exact component={Login} /> 
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