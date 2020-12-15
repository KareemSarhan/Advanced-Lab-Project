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
const members = require('./models/members.js');
const course = require('./models/course');
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

    async function da5lData(){
        // const o2 = await Location.find({"name": "c3.217"});
        // let o3;
        // if (o2 != null){
        //     o3 = o2[0]._id;
        // }
        // console.log(o3);
        // const c = (await course.find({}))[0];
        // let ta = await academicMember.find({$or:[{"type": "academic member"}, {"type": "CourseCoordinator"}]});
        // let doc = await academicMember.find({"type": "CourseInstructor"});
        // await department.findOneAndUpdate({"name": "CS"}, {"courses": c , "teachingAssistants": ta, "instructors":doc});
        // console.log("updated");
        };

    console.log("check9");
   // da5lData();
    console.log("check10");


module.exports= app