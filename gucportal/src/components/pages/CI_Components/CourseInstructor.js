import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import axios from "axios";
class CourseInstructorPage extends Component {
	componentDidMount() {
		axios
			.get("CourseInstructor/ViewCoverage")
			.then((response) => {
				this.setState(response.data);
				console.log(this.state.Courses[0]);
			})
			.catch((error) => {
				console.log(error);
			});
	}
	render() {
		if (this.state == null) {
			return (
				<div>
					<h1>sanyaaaa..</h1>
				</div>
			);
		} else
			return (
				<div>
					<h1>{this.state.Courses[0].name}</h1>
					<h1>{this.state.Courses[0].code}</h1>
					<h1>{this.state.Courses[0].numberOfSlotsNeeded}</h1>
					<h1>{this.state.Courses[0].numberOfSlotsNeeded}</h1>
					<h1>{this.state.Courses[0].coverage}</h1>
				</div>
			);
	}
}
export default CourseInstructorPage;
