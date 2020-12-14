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
//mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true})
//const connection = mongoose.connection;
//connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
    app.use(bodyParser.json());
    app.use('/AM', AcademicMemberRouter);
    app.use('/CC', CourseCoordinatorRouter);
    app.use('/CI', CourseInstRouter);
    app.use('/Hod', HodRouter);
    app.use('/Hr', HrRouter);
    app.use('/Member', MemberRouter);

//});

module.exports= app