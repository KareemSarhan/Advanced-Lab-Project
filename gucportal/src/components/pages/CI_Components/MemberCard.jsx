import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import VisibilitySensor from "react-visibility-sensor";
import SlotGrid from "./SlotGrid";

var useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
	},

	expand: {
		transform: "rotate(0deg)",
		marginLeft: "auto",
		transition: theme.transitions.create("transform", {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: "rotate(180deg)",
	},
}));

export default function CourseCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
		if (expanded) {
			useStyles = makeStyles((theme) => ({
				root: {
					maxWidth: 300,
				},
				expand: {
					transform: "rotate(0deg)",
					marginLeft: "auto",
					transition: theme.transitions.create("transform", {
						duration: theme.transitions.duration.shortest,
					}),
				},
				expandOpen: {
					transform: "rotate(180deg)",
				},
			}));
		} else {
			useStyles = makeStyles((theme) => ({
				root: {},
				expand: {
					transform: "rotate(0deg)",
					marginLeft: "auto",
					transition: theme.transitions.create("transform", {
						duration: theme.transitions.duration.shortest,
					}),
				},
				expandOpen: {
					transform: "rotate(180deg)",
				},
			}));
		}
	};

	return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={props.Course.name}
				subheader={props.Course.code}
			/>
			<CardContent style={{ width: "150px", alignSelf: "center" }}>
				<VisibilitySensor>
					{({ isVisible }) => {
						const percentage = isVisible ? props.Course.coverage * 100 : 0;
						return (
							<CircularProgressbarWithChildren value={percentage}>
								<div
									style={{
										justifyContent: "center",
										alignItems: "center",
										textalign: "center",
										fontSize: 16,
									}}>
									<strong>{props.Course.numberOfSlotsAssigned}</strong>
									<br />
									Out Of
									<br />
									<strong>{props.Course.numberOfSlotsNeeded}</strong>
								</div>
							</CircularProgressbarWithChildren>
						);
					}}
				</VisibilitySensor>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded,
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more">
					<ExpandMoreIcon />
				</IconButton>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<SlotGrid Slots={props.Course.slots} />
				</CardContent>
			</Collapse>
		</Card>
	);
}
