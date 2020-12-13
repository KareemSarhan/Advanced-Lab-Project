const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = 'shawerma';

const HodRouter = express.Router();

HodRouter.use(bodyParser.json());

HodRouter.route('/assignInstructor')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the course instructor id from the body
    //get the course code from the body
    //verify that there is an instructor with this id
    //verify that there is a course with this code
    //assign this instructor to the course
});

HodRouter.route('/DeleteInstructor')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the course instructor id from the body
    //get the course code from the body
    //verify that there is an instructor with this id
    //verify that there is a course with this code
    //verify that this instructor is assigned to this course
    //delete this assignment
});

HodRouter.route('/UpdateInstructor')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the course instructor id from the body
    //get the course code from the body
    //verify that there is an instructor with this id
    //verify that there is a course with this code
    //verify that this instructor is assigned to this course
    //update this assignment
});

HodRouter.route('/viewMembersDep')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //get all academic members profiles in this department
});

HodRouter.route('/viewMembers/:cID')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //get the course from the params
    //get all academic members profiles in this department teaching this course
});

HodRouter.route('/viewDaysOffAll')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //get the day off col from the members table for all teachers of this department
});

HodRouter.route('/viewDaysOff/:memID')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //verify that there is an academic member with this id
    //verify that this member is in the same department
    //get the day off of this member
});

HodRouter.route('/viewDayOffReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //show all dayoff requests for members in this department
});

HodRouter.route('/viewLeaveReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //show all leave requests for members in this department
});

HodRouter.route('/acceptDayOffReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //verify that there is a request with this id
    //change the status to accepted
    //change the dayoff in the member profile
});

HodRouter.route('/acceptLeaveReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //verify that there is a request with this id
    //change the status to accepted
    //update the missing days accordingly
});

HodRouter.route('/rejectDayOffReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //verify that there is a request with this id
    //change the status to rejected
    //get the comment from the body add the comment
});

HodRouter.route('/rejectLeaveReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //verify that there is a request with this id
    //change the status to rejected
    //get the comment from the body add the comment
});

HodRouter.route('/viewCoverage')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //show all coverages for all courses in this department
});

HodRouter.route('/viewSlotAssignments/:cID')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hod member
    //get the department
    //get the course from params
    //show all slots for this course (which accordingly show the academic members assigned)
});