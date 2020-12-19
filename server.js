require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AcademicMemberRouter = require('./routes/AcademicMemberRouter');
const CourseCoordinatorRouter = require('./routes/CourseCoordinatorRouter');
const CourseInstRouter = require('./routes/CourseInstRouter');
const HodRouter = require('./routes/HodRouter');
const HrRouter = require('./routes/HrRouter');
const MemberRouter = require('./routes/MemberRouter');
const PORT = process.env.PORT;
const mongoConnectionString = process.env.mongoConnectionString
const Member = require('./models/members.js');
const Location = require('./models/location.js');
const academicMember = require('./models/academicMember');
const Course = require('./models/course');
const slot = require('./models/slot');
const department = require('./models/department');
const faculty = require('./models/faculty');
const ReplacementRequest = require('./models/replacementrequest.js');
const SlotLinkReqs = require('./models/slotLinkReq.js');
const members = require('./models/members.js');
const course = require('./models/course');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
//mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true})
//const connection = mongoose.connection;
//connection.once('open', function() {
app.use(bodyParser.json());
app.use('/AM', AcademicMemberRouter);
app.use('/CC', CourseCoordinatorRouter);
app.use('/CourseInstructor', CourseInstRouter);
app.use('/Hod', HodRouter);
app.use('/Hr', HrRouter);
app.use('/Member', MemberRouter);

module.exports = app