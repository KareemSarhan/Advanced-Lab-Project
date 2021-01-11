const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var authenticate = require("../authenticate");
const jwt_decode = require("jwt-decode");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const key = "shawerma";
const academicMember = require("../models/academicMember");
const members = require("../models/members");
const course = require("../models/course");
const slots = require("../models/slot");
const departments = require("../models/department");
const locations = require("../models/location");
const AM = require("../models/academicMember");
var validator = require("validator");

const CourseInstRouter = express.Router();
CourseInstRouter.use(authenticate);
CourseInstRouter.use(bodyParser.json());

CourseInstRouter.route("/ViewMyCourses").get(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			//console.log(loggedMember);
			const ac = await academicMember.findOne({
				Memberid: loggedMember._id,
			});
			//console.log(ac);

			const acCourses = ac.courses;
			const query = {
				_id: acCourses,
			};
			var Courses = await course
				.find(query)
				.populate({
					path: "slots",
					populate: {
						path: "location",
					},
				})
				.populate({
					path: "slots",
					populate: {
						path: "memberID",
						populate: {
							path: "Memberid",
						},
					},
				})
				.populate({
					path: "instructors",
					populate: {
						path: "Memberid",
					},
				})
				.populate({
					path: "teachingAssistants",
					populate: {
						path: "Memberid",
					},
				})
				.populate({
					path: "courseCoordinator",
					populate: {
						path: "Memberid",
					},
				});
			res.json({
				Courses,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});
CourseInstRouter.route("/ViewCoverage").get(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("auth-token"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			const LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});

			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}
			const acCourses = LoggedAcm.courses;
			const query = {
				_id: acCourses,
			};
			const options = {
				_id: 0,
				name: 1,
				code: 1,
				numberOfSlotsNeeded: 1,
				numberOfSlotsAssigned: 1,
				coverage: 1,
			};
			var Courses = await course.find(query, options);
			res.json({
				Courses,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

CourseInstRouter.route("/ViewSlotAssignment").get(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			const LoggedAcm = await academicMember
				.findOne({
					Memberid: loggedMember._id,
					type: "CourseInstructor",
				})
				.populate({
					path: "courses",
					select: "-_id slots name code",
					populate: {
						path: "slots",
						select: "-_id location timing type memberID",
						populate: {
							path: "location",
							select: "-_id type name",
						},
					},
				})
				.populate({
					path: "courses",
					select: "-_id slots name code",
					populate: {
						path: "slots",
						select: "-_id location timing type memberID",
						populate: {
							path: "memberID",
							select: "-_id Memberid type officeHourse",
							populate: {
								path: "Memberid",
								select: "-_id email name id dayOff officeLocation ",
							},
						},
					},
				});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			res.json({
				Courses: LoggedAcm.courses,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});
CourseInstRouter.route("/DepNotInCourseStaff").post(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			//console.log(req.body);
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			const LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}
			const CourseID = req.body.CourseID;
			if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
				return res.status(400).send("Input Type Error");
			}

			var AcmCourse = await course.findOne({
				_id: CourseID,
			});
			if (!AcmCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}
			var DepNotInCourseStaff = await academicMember
				.find({
					courses: { $ne: AcmCourse._id },
					department: LoggedAcm.department,
				})
				.populate({
					path: "Memberid",
					populate: {
						path: "officeLocation",
					},
				});

			res.json({
				DepNotInCourseStaff,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

CourseInstRouter.route("/ViewInDepStaff").get(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			const LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}
			var AcmDepartment = await departments
				.findOne({
					name: LoggedAcm.department,
				})
				.populate({
					path: "headOfDep",
					populate: {
						path: "Memberid",
						populate: {
							path: "officeLocation",
						},
					},
				})
				.populate({
					path: "headOfDep",
					populate: {
						path: "courses",
					},
				})
				.populate({
					path: "instructors",
					populate: {
						path: "Memberid",
						populate: {
							path: "officeLocation",
						},
					},
				})
				.populate({
					path: "instructors",
					populate: {
						path: "courses",
					},
				})
				.populate({
					path: "teachingAssistants",
					populate: {
						path: "courses",
					},
				})
				.populate({
					path: "teachingAssistants",
					populate: {
						path: "Memberid",
						populate: {
							path: "officeLocation",
						},
					},
				});

			res.json({
				AcmDepartment,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

CourseInstRouter.route("/ViewInCourseStaff").get(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			const LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			const CourseID = req.body.CourseID;
			if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
				return res.status(400).send("Input Type Error");
			}

			var AcmCourse = await course
				.findOne(
					{
						_id: CourseID,
					},
					"-_id name code courseCoordinator instructors teachingAssistants"
				)
				.populate({
					path: "courseCoordinator",
					select: "-_id Memberid faculty officeHourse",
				})
				.populate({
					path: "courseCoordinator",
					select: "-_id Memberid faculty officeHourse",
					populate: {
						path: "Memberid",
						select: "-_id email name id dayOff officeLocation ",
						populate: {
							path: "officeLocation",
							select: "-_id type name",
						},
					},
				})
				.populate({
					path: "instructors",
					select: "-_id Memberid faculty officeHourse",
				})
				.populate({
					path: "instructors",
					select: "-_id Memberid faculty officeHourse",
					populate: {
						path: "Memberid",
						select: "-_id email name id dayOff officeLocation ",
						populate: {
							path: "officeLocation",
							select: "-_id type name",
						},
					},
				})
				.populate({
					path: "teachingAssistants",
					select: "-_id Memberid faculty officeHourse",
				})
				.populate({
					path: "teachingAssistants",
					select: "-_id Memberid faculty officeHourse",
					populate: {
						path: "Memberid",
						select: "-_id email name id dayOff officeLocation ",
						populate: {
							path: "officeLocation",
							select: "-_id type name",
						},
					},
				});
			if (!AcmCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}

			res.json({
				"In Course Staff": AcmCourse,
			});
			return;
		}
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

CourseInstRouter.route("/AssignMemberToSlot").put(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			var LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			const CourseID = req.body.CourseID;
			if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
				return res.status(400).send("Input Type Error");
			}
			var AcmCourse = await course.findOne({
				_id: CourseID,
			});
			if (!AcmCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}
			console.log(AcmCourse.instructors);
			console.log(LoggedAcm._id);
			if (!AcmCourse.instructors.includes(LoggedAcm._id)) {
				return res
					.status(403)
					.send("You Are Not A Course Instructor For This Course.");
			}

			AcID = req.body.AcID;
			if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
				return res.status(400).send("Input Type Error");
			}

			var Acm = await academicMember.findOne({
				_id: AcID,
			});
			if (!Acm) {
				return res.status(404).send("No Academic Member Exists With This ID.");
			}
			// if (Acm.type + "" === "HeadOfDepartment")
			// {
			//     return res.status(403).send("This Academic Member Is The Head Of Department.")
			// }
			// if (Acm.type + "" === "CourseInstructor")
			// {
			//     return res.status(403).send("This Academic Member Is A Course Instructor.")
			// }
			if (!Acm.courses.includes(CourseID)) {
				return res
					.status(403)
					.send("This Academic Member Is Not Assigned To This Course.");
			}
			SlotID = req.body.SlotID;
			if (!(typeof SlotID == "string" && validator.isMongoId(SlotID))) {
				return res.status(400).send("Input Type Error");
			}
			var AcmSlot = await slots.findOne({
				_id: SlotID,
			});
			if (!AcmSlot) {
				return res.status(404).send("No Slot Exists With This ID.");
			}
			if (AcmSlot.course + "" != AcmCourse._id + "") {
				return res.status(403).send("This Slot Is Not Related To This Course.");
			}
			if (AcmSlot.memberID) {
				return res
					.status(403)
					.send("This Slot Has Already Been Assigned To An Academic Member.");
			}

			Acm.schedule.push(AcmSlot._id);

			AcmCourse.numberOfSlotsAssigned = AcmCourse.numberOfSlotsAssigned + 1;
			AcmCourse.coverage =
				AcmCourse.numberOfSlotsAssigned / AcmCourse.numberOfSlotsNeeded;

			AcmSlot.memberID = Acm._id;

			await AcmCourse.save();
			await AcmSlot.save();
			await Acm.save();

			res.send("Academic member have been Assigned to this Slot.");
		}
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}
});

CourseInstRouter.route("/RemoveMemberFromSlot").delete(
	async (req, res, next) => {
		try {
			const payload = jwt.verify(req.header("authtoken"), key);
			if (!payload.id.includes("ac")) {
				//console.log(payload.id);
				return res.status(401).send("not authorized");
			} else {
				const loggedMember = await members.findOne({
					id: payload.id,
				});
				var LoggedAcm = await academicMember.findOne({
					Memberid: loggedMember._id,
					type: "CourseInstructor",
				});
				if (!LoggedAcm) {
					return res.status(403).send("You are not a Course Instructor.");
				}

				const CourseID = req.body.CourseID;
				if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
					return res.status(400).send("Input Type Error");
				}
				var AcmCourse = await course.findOne({
					_id: CourseID,
				});
				if (!AcmCourse) {
					return res.status(404).send("No Course Exists With This ID.");
				}

				if (!AcmCourse.instructors.includes(LoggedAcm._id)) {
					return res
						.status(403)
						.send("You Are Not A Course Instructor For This Course.");
				}

				AcID = req.body.AcID;
				if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
					return res.status(400).send("Input Type Error");
				}

				var Acm = await academicMember.findOne({
					_id: AcID,
				});
				if (!Acm) {
					return res
						.status(404)
						.send("No Academic Member Exists With This ID.");
				}
				// if (Acm.type + "" === "HeadOfDepartment")
				// {
				//     return res.status(403).send("This Academic Member Is The Head Of Department.")
				// }
				// if (Acm.type + "" === "CourseInstructor")
				// {
				//     return res.status(403).send("This Academic Member Is A Course Instructor.")
				// }
				if (!Acm.courses.includes(CourseID)) {
					return res
						.status(403)
						.send("This Academic Member Is Not Assigned To This Course.");
				}
				SlotID = req.body.SlotID;
				if (!(typeof SlotID == "string" && validator.isMongoId(SlotID))) {
					return res.status(400).send("Input Type Error");
				}
				var AcmSlot = await slots.findOne({
					_id: SlotID,
				});
				if (!AcmSlot) {
					return res.status(404).send("No Slot Exists With This ID.");
				}
				if (AcmSlot.course + "" != AcmCourse._id + "") {
					return res
						.status(403)
						.send("This Slot Is Not Related To This Course.");
				}
				if (AcmSlot.memberID + "" != Acm._id + "") {
					return res
						.status(403)
						.send("This Slot Is Not Assigned To This Academic Member.");
				}

				Acm.schedule.pop(AcmSlot._id);

				AcmCourse.numberOfSlotsAssigned = AcmCourse.numberOfSlotsAssigned - 1;
				AcmCourse.coverage =
					AcmCourse.numberOfSlotsAssigned / AcmCourse.numberOfSlotsNeeded;

				AcmSlot.memberID = null;

				await AcmCourse.save();
				await AcmSlot.save();
				await Acm.save();

				res.send("Academic member have been Removed From this Slot.");
			}
		} catch (error) {
			res.status(500).json({
				error: error,
			});
		}
	}
);

CourseInstRouter.route("/AddMemberToCourse").put(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			var LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			const CourseID = req.body.CourseID;
			if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
				return res.status(400).send("Input Type Error");
			}
			var AcmCourse = await course.findOne({
				_id: CourseID,
			});
			if (!AcmCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}

			if (!AcmCourse.instructors.includes(LoggedAcm._id)) {
				return res
					.status(403)
					.send("You Are Not A Course Instructor For This Course.");
			}

			AcID = req.body.AcID;
			if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
				return res.status(400).send("Input Type Error");
			}

			var Acm = await academicMember.findOne({
				_id: AcID,
			});
			if (!Acm) {
				return res.status(404).send("No Academic Member Exists With This ID.");
			}
			if (Acm.type + "" === "HeadOfDepartment") {
				return res
					.status(403)
					.send("This Academic Member Is The Head Of Department.");
			}
			if (Acm.type + "" === "CourseInstructor") {
				return res
					.status(403)
					.send("This Academic Member Is A Course Instructor.");
			}
			if (Acm.courses.includes(CourseID)) {
				return res
					.status(403)
					.send("This Academic Member Is Already Assigned To This Course.");
			}

			Acm.courses.push(AcmCourse._id);
			AcmCourse.teachingAssistants.push(Acm._id);
			await AcmCourse.save();
			await Acm.save();

			res.send("Academic member have been Added to this Course.");
		}
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}
});

CourseInstRouter.route("/RemoveMemberFromCourse").delete(
	async (req, res, next) => {
		try {
			const payload = jwt.verify(req.header("authtoken"), key);
			if (!payload.id.includes("ac")) {
				//console.log(payload.id);
				return res.status(401).send("not authorized");
			} else {
				const loggedMember = await members.findOne({
					id: payload.id,
				});
				var LoggedAcm = await academicMember.findOne({
					Memberid: loggedMember._id,
					type: "CourseInstructor",
				});
				if (!LoggedAcm) {
					return res.status(403).send("You are not a Course Instructor.");
				}

				const CourseID = req.body.CourseID;
				if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
					return res.status(400).send("Input Type Error");
				}
				var AcmCourse = await course.findOne({
					_id: CourseID,
				});
				if (!AcmCourse) {
					return res.status(404).send("No Course Exists With This ID.");
				}

				if (!AcmCourse.instructors.includes(LoggedAcm._id)) {
					return res
						.status(403)
						.send("You Are Not A Course Instructor For This Course.");
				}

				AcID = req.body.AcID;
				if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
					return res.status(400).send("Input Type Error");
				}

				var Acm = await academicMember.findOne({
					_id: AcID,
				});
				if (!Acm) {
					return res
						.status(404)
						.send("No Academic Member Exists With This ID.");
				}
				if (!Acm.courses.includes(CourseID)) {
					return res
						.status(403)
						.send(
							"This Academic Member Is Already Not Assigned To This Course."
						);
				}
				if (Acm.type + "" === "HeadOfDepartment") {
					return res
						.status(403)
						.send("This Academic Member Is The Head Of Department.");
				}

				var AcmSlots = await slots.find({
					course: AcmCourse._id,
					memberID: Acm._id,
				});
				AcmCourse.numberOfSlotsAssigned =
					AcmCourse.numberOfSlotsAssigned - AcmSlots.length;
				AcmCourse.coverage =
					AcmCourse.numberOfSlotsAssigned / AcmCourse.numberOfSlotsNeeded;
				Acm.courses = Acm.courses.filter(function (Course) {
					return Course._id + "" != AcmCourse._id + "";
				});
				//low howa coursecoord
				if (AcmCourse.courseCoordinator + "" === Acm._id + "") {
					AcmCourse.courseCoordinator = null;
					Acm.type = "academic member";
				}
				if (AcmCourse.teachingAssistants.includes(Acm._id)) {
					AcmCourse.teachingAssistants = AcmCourse.teachingAssistants.filter(
						function (Academic) {
							return Academic + "" != Acm._id + "";
						}
					);
				}
				if (AcmCourse.instructors.includes(Acm._id)) {
					return res
						.status(403)
						.send("This Academic Member Is A Course Instructor.");
				}

				await slots.updateMany(
					{
						course: AcmCourse._id,
						memberID: Acm._id,
					},
					{
						$set: {
							memberID: null,
						},
					}
				);
				await AcmCourse.save();
				await Acm.save();

				res.send("Academic member have been removed from Course");
			}
		} catch (error) {
			res.status(500).json({
				error: error,
			});
		}
	}
);

CourseInstRouter.route("/UpdateMemberCourse").put(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			var LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			const FromCourseID = req.body.FromCourseID;
			if (
				!(typeof FromCourseID == "string" && validator.isMongoId(FromCourseID))
			) {
				return res.status(400).send("Input Type Error");
			}
			var AcmFromCourse = await course.findOne({
				_id: FromCourseID,
			});
			if (!AcmFromCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}

			if (!AcmFromCourse.instructors.includes(LoggedAcm._id)) {
				return res
					.status(403)
					.send("You Are Not A Course Instructor For This Course.");
			}

			AcID = req.body.AcID;
			if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
				return res.status(400).send("Input Type Error");
			}

			var Acm = await academicMember.findOne({
				_id: AcID,
			});
			if (!Acm) {
				return res.status(404).send("No Academic Member Exists With This ID.");
			}
			if (!Acm.courses.includes(FromCourseID)) {
				return res
					.status(403)
					.send("This Academic Member Is Already Not Assigned To This Course.");
			}
			if (Acm.type + "" === "HeadOfDepartment") {
				return res
					.status(403)
					.send("This Academic Member Is The Head Of Department.");
			}

			var AcmSlots = await slots.find({
				course: AcmFromCourse._id,
				memberID: Acm._id,
			});
			AcmFromCourse.numberOfSlotsAssigned =
				AcmFromCourse.numberOfSlotsAssigned - AcmSlots.length;
			AcmFromCourse.coverage =
				AcmFromCourse.numberOfSlotsAssigned / AcmFromCourse.numberOfSlotsNeeded;
			Acm.courses = Acm.courses.filter(function (Course) {
				return Course._id + "" != AcmFromCourse._id + "";
			});
			//low howa coursecoord
			if (AcmFromCourse.courseCoordinator + "" === Acm._id + "") {
				AcmFromCourse.courseCoordinator = null;
				Acm.type = "academic member";
			}
			if (AcmFromCourse.teachingAssistants.includes(Acm._id)) {
				AcmFromCourse.teachingAssistants = AcmFromCourse.teachingAssistants.filter(
					function (Academic) {
						return Academic + "" != Acm._id + "";
					}
				);
			}
			if (AcmFromCourse.instructors.includes(Acm._id)) {
				return res
					.status(403)
					.send("This Academic Member Is A Course Instructor.");
			}

			//------------------------------------------------------------------------------------------------------------------------------------------------------------------

			const ToCourseID = req.body.ToCourseID;
			if (!(typeof ToCourseID == "string" && validator.isMongoId(ToCourseID))) {
				return res.status(400).send("Input Type Error");
			}
			var AcmToCourse = await course.findOne({
				_id: ToCourseID,
			});
			if (!AcmToCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}

			if (!AcmToCourse.instructors.includes(LoggedAcm._id)) {
				return res
					.status(403)
					.send("You Are Not A Course Instructor For This Course.");
			}
			if (AcmFromCourse._id + "" == AcmToCourse._id + "") {
				return res.status(403).send("The two Courses are the same.");
			}
			if (Acm.type + "" === "HeadOfDepartment") {
				return res
					.status(403)
					.send("This Academic Member Is The Head Of Department.");
			}
			if (Acm.type + "" === "CourseInstructor") {
				return res
					.status(403)
					.send("This Academic Member Is A Course Instructor.");
			}
			if (Acm.courses.includes(ToCourseID)) {
				return res
					.status(403)
					.send("This Academic Member Is Already Assigned To This Course.");
			}

			Acm.courses.push(AcmToCourse._id);

			AcmToCourse.teachingAssistants.push(Acm._id);

			await slots.updateMany(
				{
					course: AcmFromCourse._id,
					memberID: Acm._id,
				},
				{
					$set: {
						memberID: null,
					},
				}
			);
			await AcmFromCourse.save();
			await AcmToCourse.save();
			await Acm.save();

			res.send(
				"Academic member have been removed from the First Course and added to the Second Course"
			);
		}
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}
});

CourseInstRouter.route("/AssignAsCoordinator").put(async (req, res, next) => {
	try {
		const payload = jwt.verify(req.header("authtoken"), key);
		if (!payload.id.includes("ac")) {
			//console.log(payload.id);
			return res.status(401).send("not authorized");
		} else {
			const loggedMember = await members.findOne({
				id: payload.id,
			});
			var LoggedAcm = await academicMember.findOne({
				Memberid: loggedMember._id,
				type: "CourseInstructor",
			});
			if (!LoggedAcm) {
				return res.status(403).send("You are not a Course Instructor.");
			}

			const CourseID = req.body.CourseID;
			if (!(typeof CourseID == "string" && validator.isMongoId(CourseID))) {
				return res.status(400).send("Input Type Error");
			}
			var AcmCourse = await course.findOne({
				_id: CourseID,
			});
			if (!AcmCourse) {
				return res.status(404).send("No Course Exists With This ID.");
			}

			if (!AcmCourse.instructors.includes(LoggedAcm._id)) {
				return res
					.status(403)
					.send("You Are Not A Course Instructor For This Course.");
			}
			if (AcmCourse.courseCoordinator) {
				return res
					.status(403)
					.send("Course Already Have a Course Coordinator.");
			}

			AcID = req.body.AcID;
			if (!(typeof AcID == "string" && validator.isMongoId(AcID))) {
				return res.status(400).send("Input Type Error");
			}

			var Acm = await academicMember.findOne({
				_id: AcID,
			});
			if (!Acm) {
				return res.status(404).send("No Academic Member Exists With This ID.");
			}
			if (Acm.type + "" === "CourseCoordinator") {
				return res
					.status(403)
					.send("This Academic Member Is Already A Course Coordinator.");
			}
			if (Acm.courses.includes(CourseID)) {
				return res
					.status(403)
					.send("This Academic Member Is Already Assigned To This Course.");
			}
			if (Acm.type + "" === "HeadOfDepartment") {
				return res
					.status(403)
					.send("This Academic Member Is The Head Of Department.");
			}

			AcmCourse.courseCoordinator = Acm._id;

			Acm.courses.push(AcmCourse._id);
			Acm.type = "CourseCoordinator";
			await AcmCourse.save();
			await Acm.save();

			res.send("Academic member is now the Course Coordinator");
		}
	} catch (error) {
		res.status(500).json({
			error: error,
		});
	}
});

module.exports = CourseInstRouter;
