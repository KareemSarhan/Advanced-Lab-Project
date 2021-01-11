import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import CourseCard from "./CourseCard.jsx";
import CourseGrid from "./CourseGrid.jsx";
import { makeStyles } from "@material-ui/core/styles";

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
			</div>
		);
	}
}
export default CourseInstructorPage;
