import React, { Component, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
class ViewMyCourses extends Component {
	componentDidMount() {
		axios
			.get("/CourseInstructor/ViewMyCourses")
			.then((response) => {
				this.setState(response.data);
				//console.log(this.state.Courses);
			})
			.catch((error) => {
				//console.log(error);
			});
	}
	componentDidUpdate() {
		axios
			.get("/CourseInstructor/ViewMyCourses")
			.then((response) => {
				console.log(this.state.Courses);
				console.log(response.data.Courses);

				this.setState(response.data);
			})
			.catch((error) => {
				//console.log(error);
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
					<CourseGrid Courses={this.state.Courses} />
				</div>
			);
	}
}
export default ViewMyCourses;
