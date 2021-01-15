import React, { Component } from "react";
import { Link } from "react-router-dom";
import Replacementreq from "./sendreplacementreq.component";
import SlotLinkreq from "./sendslotlinkreq.component";
import DayOffreq from "./changedayoffreq.component";
import Leavereq from "./sendleavereq.component";
import axios from "axios";
import Menu from "./layout/Menu";
import CCPage from "./pages/CC/CCPage";
import { useHistory } from "react-router-dom";
import CourseInstructorPage from "./pages/CI_Components/CourseInstructor";
import AcademicMemberPage from "./AcademicMemberPage";

export default class Home extends Component {
	constructor(props) {
		super(props);

		// history = useHistory();
		this.state = { members: "" };
	}
	componentDidMount() {
		axios
			.get("/AM/GetType")
			.then((response) => {
				console.log("home" + localStorage.getItem("authtoken"));
				//console.log(this.props.history);
				console.log("hnaaaaaa" + response.data);
				this.setState({ members: response.data });
				//console.log(response.data);
				// if (response.data == "HeadOfDepartment") {
				// 	this.props.history.push("/Menu");
				// }
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		return (
			<div>
				{/* <Link to="/schedule" className="navbar-brand"><button type="button" class="btn btn-dark">View Schedule</button></Link> 
    <br/>
    <br/>
    <Link to="/viewallReq" className="navbar-brand"><button type="button" class="btn btn-dark"> View All Requests</button></Link> 
    <br/>
    <br/>
    <Link to="/replacementrequest" className="navbar-brand"><button type="button" class="btn btn-dark">View Replacement Request</button></Link> 
    <br/> */}
				<br />
				{/* <Link to="/sendreplacementreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Add Replacement Request</button></Link>  */}
				{/* <Replacementreq/> */}

				<br />
				{/* <Link to="/sendslotLinkreq" className="navbar-brand"><button type="button" class="btn btn-dark"> Slot Link Request</button></Link>  */}

				{/* <SlotLinkreq/> */}

				<br />
				{/* <DayOffreq/> */}
				{/* <Link to="/senddayoffreq" className="navbar-brand"><button type="button" class="btn btn-dark">Change Day Off Request</button></Link>  */}
				<br />

				{/* <Link to="/sendleavereq" className="navbar-brand"><button type="button" class="btn btn-dark"> Leave Request</button></Link>  */}

				{/* <Leavereq/> */}

				<br />
				{this.state.members == "academic member" ? (
					<AcademicMemberPage />
				) : null}
				{this.state.members == "CourseInstructor" ? (
					<div>
						<CourseInstructorPage />
						<AcademicMemberPage />
					</div>
				) : null}
				{this.state.members == "HeadOfDepartment" ? (
					<div>
						<Menu />
						<CourseInstructorPage />
						<AcademicMemberPage />
					</div>
				) : null}
				{this.state.members == "CourseCoordinator" ? (
					<div>
						<CCPage />
						<AcademicMemberPage />
					</div>
				) : null}
			</div>
		);
	}
}
