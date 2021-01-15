import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
import MemberCard from "./MemberCard";
import MemberGrid from "./MemberGrid";
import ReactDOM from "react-dom";

class ViewMyDepartmentStaff extends Component {
	componentDidMount() {
		console.log(localStorage.getItem("authtoken"));
		axios
			.get("CourseInstructor/ViewInDepStaff")
			.then((response) => {
				this.setState(response.data.AcmDepartment);
				console.log(response.data.AcmDepartment);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		if (this.state == null) {
			return (
				<Spinner animation="grow" role="status">
					<span className="sr-only">Loading...</span>
				</Spinner>
			);
		} else
			return (
				<div>
					<h1>In Department Staff</h1>
					<MemberCard Member={this.state.headOfDep} />
					<h2>Course instructors</h2>
					<MemberGrid Members={this.state.instructors} />
					<h3>Teaching Assistants</h3>
					<MemberGrid Members={this.state.teachingAssistants} />
				</div>
			);
	}
}
export default ViewMyDepartmentStaff;
