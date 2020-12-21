require('dotenv').config();
var moment = require("moment");

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

   // async function da5lData(){
     
        // const o2 = await Location.find({"name": "c3.217"});
        // let o3;
        // if (o2 != null){
        //     o3 = o2[0]._id;
        // }
        // console.log(o3);
         //const c = (await course.find({}))[0];

      //    const d = (await department.find())[0];
      //    let ta = await academicMember.find({$or:[{"type": "CourseCoordinator"}, {"type": "academic member"}]});
      //    let doc = await academicMember.find({$or:[{"type": "CourseInstructor"}, {"type": "HeadOfDepartment"}]});
      //    let tA = [];
      //    for (let i = 0 ; i < ta.length; i++){
      //       tA.push(ta[i]._id);
      //    }
      //    let docA = [];
      //    for (let j = 0 ; j < doc.length; j++){
      //       docA.push(doc[j]._id);
      //    }
      //   // await faculty.findOneAndUpdate({"name": "MET"}, {"departments": d , "teachingAssistants": tA , "instructors": docA});
      //    console.log("updated");
        

   
    
   //  function calculateDays(startDate,endDate)
   //  {
   //     var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   //     var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   //     var duration = moment.duration(end_date.diff(start_date));
   //     var days = duration.asDays();       
   //     return days;
   //  }
//   var duration=  calculateDays("2020-12-17T08:02:27.679+00:00","2020-12-17T12:18:13.070+00:00")
//   console.log(moment().format('LLLL'))

module.exports= app