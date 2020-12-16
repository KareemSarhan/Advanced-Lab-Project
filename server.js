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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
//mongoose.connect(mongoConnectionString, { useNewUrlParser: true , useUnifiedTopology: true})
//const connection = mongoose.connection;
//connection.once('open', function() {
console.log("MongoDB database connection established successfully");
app.use(bodyParser.json());
app.use('/AM', AcademicMemberRouter);
app.use('/CC', CourseCoordinatorRouter);
app.use('/CourseInstructor', CourseInstRouter);
app.use('/Hod', HodRouter);
app.use('/Hr', HrRouter);
app.use('/Member', MemberRouter);
async function PopulateCourses() {
    course.collection.insertOne({
        name: "batee5",
        code: "bat300",
        numberOfSlotsNeeded: 8,
        numberOfSlotsAssigned: 5,
        coverage: 0.6
    });
}
async function da5lData() {
    // const o2 = await Location.find({"name": "c3.217"});
    // let o3;
    // if (o2 != null){
    //     o3 = o2[0]._id;
    // }
    // console.log(o3);
    //const c = (await course.find({}))[0];
    const d = (await department.find())[0];
    let ta = await academicMember.find({ $or: [{ "type": "CourseCoordinator" }, { "type": "academic member" }] });
    let doc = await academicMember.find({ $or: [{ "type": "CourseInstructor" }, { "type": "HeadOfDepartment" }] });
    let tA = [];
    for (let i = 0; i < ta.length; i++) {
        tA.push(ta[i]._id);
    }
    let docA = [];
    for (let j = 0; j < doc.length; j++) {
        docA.push(doc[j]._id);
    }
    // await faculty.findOneAndUpdate({"name": "MET"}, {"departments": d , "teachingAssistants": tA , "instructors": docA});
    console.log("updated")
};

    async function da5lData(){
        // const o2 = await Location.find({"name": "c3.217"});
        // let o3;
        // if (o2 != null){
        //     o3 = o2[0]._id;
        // }
        // console.log(o3);
        // const c = (await course.find({}))[0];
        //  console.log(c._id);
        //  const d = (await department.find())[0];
        //  //let ta = await academicMember.find({$or:[{"type": "CourseCoordinator"}, {"type": "academic member"}]});
        //  let doc = (await academicMember.find({"type": "CourseCoordinator"}));
        //  let s = (await slot.find({"type": "Tutorial"}))[0]; 
        //  let tA = [];
        //  for (let i = 0 ; i < ta.length; i++){
        //     tA.push(ta[i]._id);
        //  }
        //  let docA = [];
        //  for (let j = 0 ; j < doc.length; j++){
        //     docA.push(doc[j]._id);
        //  }
        //await academicMember.findOneAndUpdate({"type": "HeadOfDepartment"}, {"schedule" :[], "courses":[]});
    //     const salt = await bcrypt.genSalt(12); //if the number is increased the complexity of salting increases
    //     const hashedPassword = await bcrypt.hash("234", salt);
    //     const o = (await Location.find({"name": "test"}))[0];
    //     const m = new Member({
    //         name: "A",
    //         id: "hr-2",
    //         password: hashedPassword,
    //         email: "A@gmail.com",
    //         officeLocation:o._id,
    //         salary: 1000
    //     }) ;
    //     //await m.save();
    //     console.log("new mem");
    //     const me = (await members.find({"name": "A"}))[0];
    //     const s = new slot({
    //         type: "Tutorial",
    //         course: c._id,
    //         location: o._id,
    //         timing: "Monday 1st",
    //         memberID: me._id
    //     });
    //    // await s.save();
    //     console.log("new slot");
    // const dep = new department({
    //     name: "BIDep",
    //     facultyName: "BI"
    // })
    // await dep.save();
    // console.log("dep added");
        //const d = (await department.find({"name": "BIDep"}))[0];
        //await faculty.findOneAndUpdate({"name":"BI"}, {"departments": [d._id]});
        console.log("fac updated");
        };

    console.log("check9");
   // da5lData();
    console.log("check10");
    // const d = new Date();
    // const day = d.getDay();
    // console.log(day);



module.exports = app