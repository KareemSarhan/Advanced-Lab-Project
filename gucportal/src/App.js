import "./App.css";
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/layout/Header";
import Login from "./components/pages/LoginModal";
import HRPage from "./components/pages/HR_Components/HRPage";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CourseInstructorPage from "./components/pages/CI_Components/CourseInstructor.jsx";
//import Navbar from "./components/navbar.component";
import Notification from "./components/notification.component";
import Schedule from "./components/schedule.component";
import Home from "./components/homepage.component";
import ReplacementRequest from "./components/replacementrequest.component";
import viewMembers from "./components/pages/Hod_Components/viewMembers";
import viewLeaveRequests from "./components/pages/Hod_Components/viewLeaveRequests";
import viewSickLeaves from "./components/pages/Hod_Components/viewSickLeaves";
import viewAccidentalLeaves from "./components/pages/Hod_Components/viewAccidentalLeaves";
import viewAnnualLeaves from "./components/pages/Hod_Components/viewAnnualLeaves";
import viewCompensationLeaves from "./components/pages/Hod_Components/viewCompensationLeaves";
import viewMaternityLeaves from "./components/pages/Hod_Components/viewMaternityLeaves";
import viewCoverage from "./components/pages/Hod_Components/viewCoverage";
import viewDaysOffAll from "./components/pages/Hod_Components/viewDaysOffAll";
import viewDayOffReq from "./components/pages/Hod_Components/viewDayOffReq";
import ViewProfile from "./components/pages/Member/viewProfile";
import ViewAllAttendance from "./components/pages/Member/Attendance2";
import ViewHours from "./components/pages/Member/MissingHours";
import ViewDays from "./components/pages/Member/MissingDays";
import ViewAllAttendanceByMonth from "./components/pages/Member/AttendanceByMonth";
import UpdateSlot from "./components/pages/CC/UpdateSlot";
import ViewSlotLinkingReq from "./components/pages/CC/ViewSlotLinkinReq";
import DeleteSlot from "./components/pages/CC/DeleteSlot";
import RejectSlotLReq from "./components/pages/CC/RejectSlotLinkingReq";
import Menu from "./components/layout/Menu";
import viewCourseMembers from "./components/pages/Hod_Components/ViewCourseMembersModal";
import acceptDayOffReq from "./components/pages/Hod_Components/acceptDayOffReq";
import AssignInstructor from "./components/pages/Hod_Components/AssignInstructorModal";
import DeleteInstructor from "./components/pages/Hod_Components/DeleteInstructorModal";
import updateInstructor from "./components/pages/Hod_Components/UpdateInstructorModal";
import acceptSickLeave from "./components/pages/Hod_Components/acceptLeave";
import rejectLeave from "./components/pages/Hod_Components/RejectLeave";
import rejectDayOffReq from "./components/pages/Hod_Components/RejectDayOffReq";
import viewMember from "./components/pages/Hod_Components/viewMember";
import ViewCourseSlotsModal from "./components/pages/Hod_Components/ViewCourseSlotsModal";
import viewSlots from "./components/pages/Hod_Components/viewSlotAssignments";
import ViewMemberDayOffModal from "./components/pages/Hod_Components/ViewMemberDayOffModal";
import viewMemberDayOff from "./components/pages/Hod_Components/viewMemberDayOff";
import ViewMissing from "./components/pages/HR_Components/ViewMissing";
import ViewMemberAttendance from "./components/pages/HR_Components/ViewMemberAttendance";
import ViewMemAttButtonModal from "./components/pages/HR_Components/ViewMemAttButton";
import viewAllreq from "./components/viewallReq.component";
import acceptreqs from "./components/acceptedreq.component";
import pendngreqs from "./components/pendingreq.component";
import rejectedreqs from "./components/rejectedreq.component";
import Replacementreq from "./components/sendreplacementreq.component";
import SlotLinkreq from "./components/sendslotlinkreq.component";
import Dayoffreq from "./components/changedayoffreq.component";
import Leavereqq from "./components/sendleavereq.component";
import Cancelreq from "./components/Cancelrequest.component";
import Acceptreq from "./components/acceptrequest.component";
import CCPage from "./components/pages/CC/CCPage"

class App extends Component {
	render() {
		return (
			<div>
				<div className="app">
					<Header />
					<br />
					<br />

					<Router>
						{/* <Link to="/Menu" className="navbar-brand">
							Menu
						</Link> */}
						<Route path="/" exact component={Login} />
						<Route path="/hr" exact component={HRPage} />
						<Route path="/homepage" component={Home} />
						<Route path="/Menu" exact component={Menu} />
						<Route path="/CC" exact component={CCPage} />
						{/* <Route path="/viewProfile" exact component={ViewProfile} /> */}
						<Route path="/viewMissingHours" exact component={ViewHours} />
						<Route path="/viewMembers" exact component={viewMembers} />
						<Route path="/viewLeaveReq" component={viewLeaveRequests} />
						<Route path="/SickLeaves" component={viewSickLeaves} />
						<Route path="/AccidentalLeaves" component={viewAccidentalLeaves} />
						<Route path="/AnnualLeaves" component={viewAnnualLeaves} />
						<Route path="/CompensationLeaves" component={viewCompensationLeaves}/>
						<Route path="/MaternityLeaves" component={viewMaternityLeaves} />
						<Route path="/viewCoverage" component={viewCoverage} />
						<Route path="/viewDaysOffAll" component={viewDaysOffAll} />
						<Route path="/viewDayOffReq" component={viewDayOffReq} />
						<Route path="/viewCourseMember" component={viewCourseMembers} />
						<Route path="/acceptDayOffReq/" component={acceptDayOffReq} />
						<Route path="/acceptLeaveReq/" component={acceptSickLeave} />
						<Route path="/AssignInstructor/" component={AssignInstructor} />
						<Route path="/deleteInstructor/" component={DeleteInstructor} />
						<Route path="/updateInstructor/" component={updateInstructor} />
						{/* <Route path="/acceptSickLeave/:id?" component={acceptSickLeave}/>  */}
						<Route path="/rejectLeaveReq/" component={rejectLeave} />
						<Route path="/rejectDayOffReq/" component={rejectDayOffReq} />
						<Route path="/viewCourseMembers/" component={viewMember} />
						<Route path="/viewSlotAssignments/" component={viewSlots} />
						<Route
							path="/viewSlotAssignment/"
							component={ViewCourseSlotsModal}
						/>
						<Route path="/viewDayOff/" component={ViewMemberDayOffModal} />
						<Route path="/viewDaysOff/" component={viewMemberDayOff} />
						<Route path="/viewProfile" exact component={ViewProfile} />
							<Route path="/viewAllAttendance" component={ViewAllAttendance} />
							<Route path="/viewMissingDays" component={ViewDays} />
							<Route
								path="/viewAllAttendanceByMonth"
								component={ViewAllAttendanceByMonth}></Route>
							<br />
							<Route path="/ViewMissing" component={ViewMissing} />
							<Route
								path="/ViewMemberAttendance/"
								component={ViewMemberAttendance}
							/>
							<Route
								path="/viewMemAttButton/"
								component={ViewMemAttButtonModal}
							/>
							<Route path="/notification" component={Notification} />
							<Route path="/schedule" component={Schedule} />
							{/* <Route path="/homepage" component={Home} /> */}
							
							<Route path="/ci" component={CourseInstructorPage} />
							<Route
								path="/replacementrequest"
								component={ReplacementRequest}
							/>
							<Route path="/UpdateSlot" component={UpdateSlot} />
							<Route path="/viewallReq" component={viewAllreq} />
							<Route path="/acceptedreq" component={acceptreqs} />
							<Route path="/pendingreq" component={pendngreqs} />
							<Route path="/rejectedreq" component={rejectedreqs} />
							<Route path="/sendreplacementreq" component={Replacementreq} />
							<Route path="/sendslotlinkreq" component={SlotLinkreq} />
							<Route path="/changedayoffreq" component={Dayoffreq} />
							<Route path="/sendleavereq" component={Leavereqq} />
							<Route path="/acceptrequest" component={Acceptreq} />
							<Route path="/Cancelrequest" component={Cancelreq} />

							<Route
								path="/viewSlotLinkingReq/"
								component={ViewSlotLinkingReq}
							/>
							<Route path="/RejectSlotLReq/" component={RejectSlotLReq} />
							<Route path="/DeleteSlots" component={DeleteSlot} />
							<Route path="/logout" component={Login} />

							<Route path="/viewMissingDays" component={ViewDays} />
					</Router>
					<br />
					<br />

					<Router>
						<div className="container">
							{/* <Navbar /> */}
							<br />
							<br />
							
						</div>
					</Router>
				</div>
			</div>
		);
	}
}

export default App;
