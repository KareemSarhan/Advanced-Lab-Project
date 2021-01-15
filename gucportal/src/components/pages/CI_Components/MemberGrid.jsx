import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import CourseCard from "./CourseCard";
import MemberCard from "./MemberCard";
import SlotCard from "./SlotCard";
import { Button, Modal, Form } from "react-bootstrap";

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

export default function MemberGrid(props) {
	const classes = useStyles();
	//console.log(props);
	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				{props.Members.map((Member) => (
					<Grid item xs key={"MGi" + Member._id}>
						<MemberCard key={"M" + Member._id} Member={Member} />
					</Grid>
				))}
			</Grid>
		</div>
	);
}
