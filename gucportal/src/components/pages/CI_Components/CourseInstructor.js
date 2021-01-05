import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
class CourseInstructorPage extends Component {
	componentDidMount() {
		axios
			.get("CourseInstructor/ViewCoverage")
			.then((response) => {
				this.setState(response.data);
				console.log(this.state.Courses);
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
					<CourseGrid Courses={this.state.Courses} />
				</div>
			);
	}
}
export default CourseInstructorPage;
