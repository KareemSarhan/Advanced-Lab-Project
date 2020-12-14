const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
//const authenticate = require('../authenticate.js');
const faculty = require('../models/faculty');

const HrRouter = express.Router();

HrRouter.use(bodyParser.json());
HrRouter.use(express.json());

HrRouter.route('/addLocation')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that the capacity matches the type 
    //e.g if a lab or room capacity <= 25
    //make a new location 
});

HrRouter.route('/updateLocation/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a location with the name = id
    //update the existing location
});

HrRouter.route('/deleteLocation/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a location with the name = id
    //delete the existing location
});

HrRouter.route('/addFaculty')
.post(async (req,res,next) =>{
    //authenticate that this is a valid member
  // authenticate();
    // const f = new faculty({
    //     name: req.body.name
    // });
    // await f.save();
    // res.send("bravo");
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //add a new faculty
});

HrRouter.route('/updateFaculty/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a faculty with the name = id
    //update the existing faculty
});

HrRouter.route('/deleteFaculty/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a faculty with the name = id
    //delete the existing faculty with the corresponding departments
});

HrRouter.route('/addDepartment')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //add a new department to this faculty
});

HrRouter.route('/updateDepartment/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //verify that there is a department with the name = id
    //update the existing department
});

HrRouter.route('/deleteDepartment/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //verify that there is a department with the name = id
    //delete the existing department 
    //update the academic members table by removing the HOD fieldn of the corresponding head
});

HrRouter.route('/addCourse')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that the department and faculty exist
    //add a new course to this department
});

HrRouter.route('/updateCourse/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that there exists a faculty and department and course
    //update the course with code = id
});

HrRouter.route('/deleteCourse/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the needed credentials are given
    //get the faculty from the body
    //get the department from the body
    //verify that there exists a faculty and department and course
    //delete the course with code = id
    //delete the slots with this course
});

HrRouter.route('/addStaffMember')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that the given mail is unique
    //make the system automatically increment the ids
    //check if this is an academic member of hr to make the id prefix 
    //put this member to the corresponding table(academic/hr)
    //prompt the user to change the password on first login
    //check that the office given is not full
    //check that there is no course assigned to this member if academic
    //if this is an HR member make the dayoff Saturday
});

HrRouter.route('/updateStaffMember/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //update this member
});

HrRouter.route('/deleteStaffMember/:id')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //delete this member
});

HrRouter.route('/addSignInorOut/:id')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id and is not the same as the doer
    //get the date from the body
    //add signin or signout that is missing
    //decrement the missing days
});

HrRouter.route('/viewAttendance/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //view the attendance record of this member
});

HrRouter.route('/viewMissing')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //view members with missings more than 0
});

HrRouter.route('/updateSalary/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //compute the deductions using the missings table
});

module.exports = HrRouter;

