import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CourseCard from "./CourseCard";
import { shadows } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
}));

export default function CourseGrid(props) {
	const classes = useStyles();
	return (
		<div>
			<Grid container spacing={3}>
				{props.Courses.map((Course) => (
					<Grid item xl key={"CGI" + Course._id}>
						<CourseCard key={"CC" + Course._id} shadows={12} Course={Course} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
