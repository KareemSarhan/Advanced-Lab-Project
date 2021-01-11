import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import SideBar from "./components/layout/SideMenu";

import Login from "./components/pages/LoginModal";
import AddLocation from "./components/pages/HR_Components/AddLocationModal";
import DeleteLocation from "./components/pages/HR_Components/DeleteLocationModal";
import UpdateLocation from "./components/pages/HR_Components/UpdateLocationModal";
import AddFaculty from "./components/pages/HR_Components/AddFacultyModal";
import UpdateFaculty from "./components/pages/HR_Components/UpdateFacultyModal";
import DeleteFaculty from "./components/pages/HR_Components/DeleteFacultyModal";
import AddDepartment from "./components/pages/HR_Components/AddDepartmentModal";
import UpdateDepartment from "./components/pages/HR_Components/UpdateDepartmentModal";
import DeleteDepartment from "./components/pages/HR_Components/DeleteDepartmentModal";
import AddCourse from "./components/pages/HR_Components/AddCourseModal";
import UpdateCourse from "./components/pages/HR_Components/UpdateCourseModal";
import DeleteCourse from "./components/pages/HR_Components/DeleteCourseModal";
import AddHrMember from "./components/pages/HR_Components/AddHrMemberModal";
import AddAcademicMember from "./components/pages/HR_Components/AddAcademicMemberModal";
import UpdateStaffMember from "./components/pages/HR_Components/UpdateStaffMemberModal";
import DeleteStaffMember from "./components/pages/HR_Components/DeleteStaffMemberModal";
import AssignHod from "./components/pages/HR_Components/AssignHodModal";
import AddSignIn from "./components/pages/HR_Components/AddSignInModal";
import AddSignOut from "./components/pages/HR_Components/AddSignOutModal";
import UpdateSalary from "./components/pages/HR_Components/UpdateSalaryModal";
import LocationAll from "./components/pages/HR_Components/LocationAll";
import HRPage from "./components/pages/HR_Components/HRPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import CourseInstructorPage from "./components/pages/CI_Components/CourseInstructor.jsx";
import Navbar from "./components/navbar.component";
import Notification from "./components/notification.component";
import Schedule from "./components/schedule.component";
import Home from "./components/homepage.component";
import ReplacementRequest from "./components/replacementrequest.component";
import Menu from "./components/layout/Menu";
import viewMembers from "./components/pages/Hod_Components/viewMembers";
import viewLeaveRequests from "./components/pages/Hod_Components/viewLeaveRequests";
import viewSickLeaves from "./components/pages/Hod_Components/viewSickLeaves";
import viewAccidentalLeaves from "./components/pages/Hod_Components/viewAccidentalLeaves";
import { Link } from "react-router-dom";
import viewAnnualLeaves from "./components/pages/Hod_Components/viewAnnualLeaves";
import viewCompensationLeaves from "./components/pages/Hod_Components/viewCompensationLeaves";
import viewMaternityLeaves from "./components/pages/Hod_Components/viewMaternityLeaves";
import viewCoverage from "./components/pages/Hod_Components/viewCoverage";
import viewDaysOffAll from "./components/pages/Hod_Components/viewDaysOffAll";
import viewDayOffReq from "./components/pages/Hod_Components/viewDayOffReq";
import ViewProfile from "./components/pages/Member/viewProfile";
import ViewAllAttendance from "./components/pages/Member/Attendance2";
import ViewHours from "./components/pages/Member/MissingHours";
<<<<<<< HEAD
import ViewDays from "./components/pages/Member/MissingDays2";
import ViewAllAttendanceByMonth from "./components/pages/Member/AttendanceByMonth";
import UpdateSlot from  "./components/pages/CC/UpdateSlot";
import ViewSlotLinkingReq from "./components/pages/CC/ViewSlotLinkinReq";
import DeleteSlot from "./components/pages/CC/DeleteSlot";
import RejectSlotLReq from "./components/pages/CC/RejectSlotLinkingReq";










=======
import ViewDays from "./components/pages/Member/MissingDays";
import ViewMyCourses from "./components/pages/CI_Components/ViewMyCourses.jsx";
import ViewMyDepartmentStaff from "./components/pages/CI_Components/ViewMyDepartmentStaff.jsx";
>>>>>>> 320456c17634f84d25a606b5bbb47e5d7d430689
class App extends Component {
	render() {
		return (
			<div>
				<div className="app">
					<Header />
					<SideBar />
					<Router>
						<div className="container">
							<br />
							<Route path="/" exact component={Login} />
							<Route path="/viewProfile" exact component={ViewProfile} />
							<Route path="/viewMissingHours" exact component={ViewHours} />
							<Route path="/viewAllAttendance" component={ViewAllAttendance} />
<<<<<<< HEAD
              <Route path="/viewMissingDays" component={ViewDays} />
              <Route path="/viewAllAttendanceByMonth" component={ViewAllAttendanceByMonth} />
              <Route path="/UpdateSlot" component={UpdateSlot} />
              <Route path="/viewSlotLinkingReq/" component={ViewSlotLinkingReq} />
              <Route path="/RejectSlotLReq/" component={RejectSlotLReq} />
              <Route path="/DeleteSlots" component={DeleteSlot} />
              <Route path="/logout" component={Login} />








=======
							<Route path="/viewMissingDays" component={ViewDays} />
>>>>>>> 320456c17634f84d25a606b5bbb47e5d7d430689

							<Route
								path="/CourseInstructor"
								component={CourseInstructorPage}
							/>
							<Route
								path="/CourseInstructor/ViewMyCourses"
								component={ViewMyCourses}
							/>
							<Route
								path="/CourseInstructor/ViewMyDepartmentStaff"
								component={ViewMyDepartmentStaff}
							/>

							{/* <Link href= "/Menu" class="nav-link" >Menu</Link> */}
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
