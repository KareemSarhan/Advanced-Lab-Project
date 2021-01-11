import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CourseCard from "./CourseCard";
import SlotCard from "./SlotCard";
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

export default function SlotGrid(props) {
	const classes = useStyles();
	//console.log(props);
	return (
		<div className={classes.root}>
			<Grid container spacing={1}>
				{props.Slots.map((Slot) => (
					<Grid item xs key={"SGI" + Slot._id}>
						<SlotCard key={"SC" + Slot._id} Slot={Slot} Course={props.Course} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
