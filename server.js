require("dotenv").config();
//var moment = require("moment");
const mongoose = require("mongoose");

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const AcademicMemberRouter = require("./routes/AcademicMemberRouter");
const CourseCoordinatorRouter = require("./routes/CourseCoordinatorRouter");
const CourseInstRouter = require("./routes/CourseInstRouter");
const HodRouter = require("./routes/HodRouter");
const HrRouter = require("./routes/HrRouter");
const MemberRouter = require("./routes/MemberRouter");
const PORT = process.env.PORT || 5000;
const mongoConnectionString = process.env.mongoConnectionString;
const Member = require("./models/members.js");
const Location = require("./models/location.js");
const academicMember = require("./models/academicMember");
const Course = require("./models/course");
const slot = require("./models/slot");
const CompensationSlot = require("./models/CompensationSlot.js");
const department = require("./models/department");
const faculty = require("./models/faculty");
const ReplacementRequest = require("./models/replacementrequest.js");
const SlotLinkReqs = require("./models/slotLinkReq.js");
const members = require("./models/members.js");
const course = require("./models/course");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const slotLinkReq = require("./models/slotLinkReq");
const key = "shawerma";

const path = require("path");

const cors = require("cors");

app.options("*", (req, res) => {
	res.json({
		status: "OK",
	});
});

// app.use(function (req, res, next) {
// 	//res.header("Access-Control-Allow-Origin", "http://localhost:5000/"); // update to match the domain you will make the request from
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept"
// 	);
// 	res.header("Access-Control-Expose-Headers", "authtoken");
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
// 	res.header(
// 		"Access-Control-Allow-Headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, authtoken"
// 	);

// 	next();
// });
app.use(bodyParser.json());
app.use("/AM", AcademicMemberRouter);
app.use("/CC", CourseCoordinatorRouter);
app.use("/CourseInstructor", CourseInstRouter);
app.use("/Hod", HodRouter);
app.use("/Hr", HrRouter);
app.use("/Member", MemberRouter);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "gucportal", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "gucportal", "build", "index.html"));
	});
	console.log("DONE!");
}
const connection = mongoose.connection;
mongoose.connect(mongoConnectionString, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
connection.once("open", function () {
	console.log("MongoDB database connection established successfully");

	app.listen(PORT, function () {
		console.log("Server is running on Port: " + PORT);
	});
});

module.exports = app;
