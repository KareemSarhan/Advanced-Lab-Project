import { React, useState } from "react";
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
import MemberGrid from "./MemberGrid";
import { Button, Modal, Form } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import MemberCard from "./MemberCard";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";

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
	const [anchorEl, setAnchorEl] = useState(null);
	const [Action, setAction] = useState(null);
	const [expanded, setExpanded] = useState(false);
	const [Showpop, setShowpop] = useState(false);
	const handleClosepop = () => setShowpop(false);

	var [PopStaff, setPopStaff] = useState(null);
	const handleShowpop = () => setShowpop(true);
	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};
	var options = [
		"Assign academic member to course",
		"remove academic member from course",
		"assign course coordinator",
	];
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleMenuItemClick = (input, event) => {
		setPopStaff(null);
		setAction(input);

		if (input == "Assign academic member to course") {
			let data = { CourseID: props.Course._id };
			console.log(data);
			axios
				.post("/CourseInstructor/DepNotInCourseStaff", data)
				.then((response) => {
					//console.log(response.data.DepNotInCourseStaff);
					setPopStaff(response.data.DepNotInCourseStaff);
				})

				.catch((error) => {
					console.log(error);
				});
		} else if (input == "remove academic member from course") {
			if (props.Course.courseCoordinator)
				setPopStaff(
					props.Course.teachingAssistants.concat(props.Course.courseCoordinator)
				);
			else setPopStaff(props.Course.teachingAssistants);
		} else if (input == "assign course coordinator") {
			let data = { CourseID: props.Course._id };

			axios
				.post("/CourseInstructor/DepNotInCourseStaff", data)
				.then((response) => {
					//console.log(response.data.DepNotInCourseStaff);
					setPopStaff(response.data.DepNotInCourseStaff);
				})

				.catch((error) => {
					console.log(error);
				});
		}
		//console.log(PopStaff);
		handleShowpop();
		handleClose();
	};
	const handleSelectMemberClick = (input, event) => {
		if (Action == "Assign academic member to course") {
			let mem = {
				CourseID: props.Course._id,
				AcID: input,
			};
			axios
				.put("/CourseInstructor/AddMemberToCourse", mem)
				.then((res) => {
					console.log(res);
					//setrefresh(!refresh);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (Action == "remove academic member from course") {
			let mem = {
				CourseID: props.Course._id,
				AcID: input,
			};
			axios
				.delete("/CourseInstructor/RemoveMemberFromCourse", { data: mem })
				.then((res) => {
					console.log(res);
					//setrefresh(!refresh);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (Action == "assign course coordinator") {
			let mem = {
				CourseID: props.Course._id,
				AcID: input,
			};
			axios
				.put("/CourseInstructor/AssignAsCoordinator", mem)
				.then((res) => {
					console.log(res);
					//setrefresh(!refresh);
				})
				.catch((err) => {
					console.log(err);
				});
		}
		setAction(null);
		handleClosepop();
	};
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
			<Dialog
				open={Showpop}
				onClose={handleClosepop}
				aria-labelledby="responsive-dialog-title">
				<DialogActions>
					<Grid container spacing={3}>
						{PopStaff == null ? (
							<Spinner animation="grow" role="status">
								<span className="sr-only">Loading...</span>
							</Spinner>
						) : (
							PopStaff.map((Member) => (
								<Grid item xs key={"MGi" + Member._id}>
									<Button
										onClick={(event) =>
											handleSelectMemberClick(Member._id, event)
										}>
										<MemberCard key={"M" + Member._id} Member={Member} />
									</Button>
								</Grid>
							))
						)}
					</Grid>
				</DialogActions>
			</Dialog>
			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}>
				{options.map((option) => (
					<MenuItem
						key={option}
						onClick={(event) => handleMenuItemClick(option, event)}>
						{option}
					</MenuItem>
				))}
			</Menu>
			<CardHeader
				action={
					<IconButton aria-label="settings" onClick={handleClickListItem}>
						<MoreVertIcon />
					</IconButton>
				}
				title={props.Course.name}
				subheader={props.Course.code}
			/>

			<CardContent
				style={{ width: "150px", alignSelf: "center", alignItems: "center" }}>
				<CircularProgressbarWithChildren value={props.Course.coverage * 100}>
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
					<h1>Slots</h1>
					<SlotGrid Slots={props.Course.slots} Course={props.Course} />
				</CardContent>
				<CardContent>
					<h2>Course instructors</h2>
					<MemberGrid
						Members={props.Course.instructors}
						Course={props.Course}
					/>
				</CardContent>
				<CardContent>
					<h3>Course Coordinator</h3>
					<MemberCard
						Member={props.Course.courseCoordinator}
						Course={props.Course}
					/>
				</CardContent>
				<CardContent>
					<h4>Teaching Assistants</h4>
					<MemberGrid
						Members={props.Course.teachingAssistants}
						Course={props.Course}
					/>
				</CardContent>
			</Collapse>
		</Card>
	);
}
