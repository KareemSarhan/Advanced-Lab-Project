import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewMyCourses from "./ViewMyCourses.jsx";
import ViewMyDepartmentStaff from "./ViewMyDepartmentStaff.jsx";
class CourseInstructorPage extends Component {
	render() {
		return (
			<div>
				<Button
					variant="outlined"
					color="primary"
					href="/CourseInstructor/ViewMyCourses">
					View My Courses
				</Button>

				<Button
					variant="outlined"
					color="primary"
					href="/CourseInstructor/ViewMyDepartmentStaff">
					View My Department Staff
				</Button>
				<Router>
					<Route
						path="/CourseInstructor/ViewMyCourses"
						component={ViewMyCourses}
					/>
					<Route
						path="/CourseInstructor/ViewMyDepartmentStaff"
						component={ViewMyDepartmentStaff}
					/>
				</Router>
			</div>
		);
	}
}
export default CourseInstructorPage;
