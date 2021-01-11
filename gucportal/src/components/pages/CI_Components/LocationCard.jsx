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
const props = { Location: {} };
export default function LocationCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	if (props.Location)
		return (
			<Card>
				<CardHeader
					title={props.Location.type}
					subheader={props.Location.name}
				/>
				<CardContent
					style={{ width: "150px", alignSelf: "center" }}></CardContent>
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
						<VisibilitySensor>
							{({ isVisible }) => {
								const percentage = isVisible
									? (props.Location.capacity / props.Location.capacitySoFar) *
									  100
									: 0;
								return (
									<CircularProgressbarWithChildren value={percentage}>
										<div
											style={{
												justifyContent: "center",
												alignItems: "center",
												textalign: "center",
												fontSize: 10,
											}}>
											<strong>{props.Location.capacitySoFar}</strong>
											<br />
											Of
											<br />
											<strong>{props.Location.capacity}</strong>
										</div>
									</CircularProgressbarWithChildren>
								);
							}}
						</VisibilitySensor>
					</CardContent>
				</Collapse>
			</Card>
		);
	else return <Card />;
}
