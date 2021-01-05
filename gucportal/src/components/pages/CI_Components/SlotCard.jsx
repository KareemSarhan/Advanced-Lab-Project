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
import TutImg from "../../../Images/Tut.jpg";
import LecImg from "../../../Images/Lec.jpg";
import LabImg from "../../../Images/Lab.jpg";
import { StepLabel } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
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

export default function SlotCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	var avatar;
	if (props.Slot.type + "" == "Tutorial") {
		avatar = <Avatar src={TutImg} />;
	} else if (props.Slot.type + "" == "Lecture") {
		avatar = <Avatar src={LecImg} />;
	} else if (props.Slot.type + "" == "Lab") {
		avatar = <Avatar src={LabImg} />;
	}
	return (
		<Card className={classes.root}>
			<CardHeader
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				avatar={avatar}
				title={props.Slot.type}
				subheader={props.Slot.timing}
			/>
			<CardContent style={{ width: "150px", alignSelf: "center" }}>
				{props.timing}
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
				<CardContent></CardContent>
			</Collapse>
		</Card>
	);
}
