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
import Spinner from "react-bootstrap/Spinner";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import DialpadIcon from "@material-ui/icons/Dialpad";
import HomeTwoToneIcon from "@material-ui/icons/HomeTwoTone";
import FingerprintTwoToneIcon from "@material-ui/icons/FingerprintTwoTone";
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

export default function MemberCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
		if (expanded) {
			console.log(props.Member.Memberid);
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

	if (props.Member == null) {
		return (
			<Spinner animation="grow" role="status">
				<span className="sr-only">Loading...</span>
			</Spinner>
		);
	} else
		return (
			<Card className={classes.root}>
				<CardHeader
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					avatar={
						<Avatar
							aria-label={props.Member.Memberid.name}
							className={classes.avatar}></Avatar>
					}
					title={props.Member.Memberid.name}></CardHeader>

				<CardContent style={{ width: "150px", alignSelf: "center" }}>
					<MailOutlineIcon />
					<h4>{props.Member.Memberid.email}</h4>
					<DialpadIcon />
					<h4>{props.Member.Memberid.phoneNumber}</h4>
					<HomeTwoToneIcon />
					<h4>{props.Member.Memberid.dayOff}</h4>
					<FingerprintTwoToneIcon />
					<h4>{props.Member.Memberid.id}</h4>
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
