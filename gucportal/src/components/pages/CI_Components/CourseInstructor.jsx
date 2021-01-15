import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
import { makeStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ViewMyCourses from "./ViewMyCourses.jsx";
import ViewMyDepartmentStaff from "./ViewMyDepartmentStaff.jsx";
import AcademicMemberPage from "../../AcademicMemberPage";

class CourseInstructorPage extends Component {
	render() {
		return (
			<div>
				<AcademicMemberPage></AcademicMemberPage>
				<Button variant="outlined" color="primary" href="/CI/ViewMyCourses">
					View My Courses
				</Button>

				<Button
					variant="outlined"
					color="primary"
					href="/CI/ViewMyDepartmentStaff">
					View My Department Staff
				</Button>
				<br />
			</div>
		);
	}
}
export default CourseInstructorPage;
