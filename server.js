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
    console.log("check");

    async function da5lData(){
        console.log("check2");
        const o = new Location({
            name: "c7.103",
            capacity: 3,
            type: "office"
        });

        console.log("check3");
        await o.save();
        console.log("check4");
        const member1 = new Member({
            name: "Farah",
            id: "ac-1",
            password: "123",
            email: "farah@gmail.com",
            officeLocation: o,
            salary: 1000000000,
            gender: "female",
            dayOff: "Saturday" 
        }); 

        console.log("check5");
        await member1.save();
        console.log("check6");

        const member2 = new Member({
            name: "Passant",
            id: "hr-1",
            password: "123",
            email: "basbosa@gmail.com",
            officeLocation: o,
            salary: 100000000000000,
            gender: "female",
            dayOff: "Saturday" 
            
        }); 
        console.log("check7");
        await member2.save();
        console.log("check8");
        //sanya hagrb 7aga
       
    }

    console.log("check9");
    //da5lData();
    console.log("check10");


module.exports= app