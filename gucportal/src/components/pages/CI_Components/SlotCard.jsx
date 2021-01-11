import { React, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "react-circular-progressbar/dist/styles.css";
import TutImg from "../../../Images/Tut.jpg";
import LecImg from "../../../Images/Lec.jpg";
import LabImg from "../../../Images/Lab.jpg";
import MemberCard from "./MemberCard";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import LocationCard from "./LocationCard";
import Box from "@material-ui/core/Box";
import Popover from "@material-ui/core/Popover";
import { Button, Modal, Form } from "react-bootstrap";
import TouchRipple from "@material-ui/core/ButtonBase/TouchRipple";
import MemberGrid from "./MemberGrid";
import { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "350px",
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
	const [expanded, setExpanded] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [refresh, setrefresh] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(1);
	const [Showpop, setShowpop] = useState(false);
	const handleClosepop = () => setShowpop(false);
	const handleShowpop = () => setShowpop(true);

	var options = [];
	if (props.Slot.memberID) {
		options = ["Assign academic member", "remove academic member"];
	} else {
		options = ["Assign academic member"];
	}
	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleSelectMemberClick = (input, event) => {
		handleClosepop();

		if (props.Slot.memberID) {
			const mem = {
				CourseID: props.Slot.course,
				AcID: props.Slot.memberID._id,
				SlotID: props.Slot._id,
			};
			axios
				.delete("/CourseInstructor/RemoveMemberFromSlot", { data: mem })
				.then((res) => {
					console.log(res);
					//setrefresh(!refresh);
				})
				.catch((err) => {
					console.log(err);
				});
			return;
		}
		const mem2 = {
			CourseID: props.Slot.course,
			AcID: input,
			SlotID: props.Slot._id,
		};
		axios
			.put("/CourseInstructor/AssignMemberToSlot", mem2)
			.then((res) => {
				console.log("bef" + refresh);
				setrefresh(!refresh);
				console.log("aft" + refresh);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const handleMenuItemClick = (input, event) => {
		console.log(input);
		//console.log(props.Slot);
		if (input == "remove academic member") {
			const mem = {
				CourseID: props.Slot.course,
				AcID: props.Slot.memberID._id,
				SlotID: props.Slot._id,
			};
			axios
				.delete("/CourseInstructor/RemoveMemberFromSlot", { data: mem })
				.then((res) => {
					console.log(res);
					console.log(refresh);
					setrefresh(!refresh);
					console.log(refresh);
				})
				.catch((err) => {
					console.log(err);
				});
		} else if (input == "Assign academic member") {
			handleShowpop();
			console.log(refresh);
			setrefresh(!refresh);
			console.log(refresh);
		}
		setAnchorEl(null);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleExpandClick = () => {
		setExpanded(!expanded);
		console.log(props.Slot);
	};
	var avatar;
	if (props.Slot.type + "" == "Tutorial") {
		avatar = <Avatar src={TutImg} />;
	} else if (props.Slot.type + "" == "Lecture") {
		avatar = <Avatar src={LecImg} />;
	} else if (props.Slot.type + "" == "Lab") {
		avatar = <Avatar src={LabImg} />;
	}
	{
		return (
			<Card className={classes.root}>
				<Dialog
					open={Showpop}
					onClose={handleClosepop}
					aria-labelledby="responsive-dialog-title">
					<DialogActions>
						<Grid container spacing={3}>
							{props.Course.instructors.map((Member) => (
								<Grid item xs key={"MGi" + Member._id}>
									<Button
										onClick={(event) =>
											handleSelectMemberClick(Member._id, event)
										}>
										<MemberCard key={"M" + Member._id} Member={Member} />
									</Button>
								</Grid>
							))}
							{props.Course.teachingAssistants.map((Member) => (
								<Grid item xs key={"MGi" + Member._id}>
									<Button
										onClick={(event) =>
											handleSelectMemberClick(Member._id, event)
										}>
										<MemberCard key={"M" + Member._id} Member={Member} />
									</Button>
								</Grid>
							))}
							{props.Course.courseCoordinator ? (
								<Grid item xs key={"MGi" + props.Course.courseCoordinator._id}>
									<Button
										onClick={(event) =>
											handleSelectMemberClick(
												props.Course.courseCoordinator._id,
												event
											)
										}>
										<MemberCard
											key={"M" + props.Course.courseCoordinator._id}
											Member={props.Course.courseCoordinator}
										/>
									</Button>
								</Grid>
							) : null}
						</Grid>
					</DialogActions>
				</Dialog>
				<CardHeader
					action={
						<IconButton aria-label="settings" onClick={handleClickListItem}>
							<MoreVertIcon />
						</IconButton>
					}
					avatar={avatar}
					title={props.Slot.type}
					subheader={props.Slot.timing}
				/>
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
				<CardContent>
					<Grid container spacing={2} direction="row">
						{props.Slot.memberID ? (
							<Grid item xl>
								<MemberCard Member={props.Slot.memberID} />
							</Grid>
						) : null}
						<Grid item xl>
							<LocationCard Location={props.Slot.location} />
						</Grid>
					</Grid>
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
}
