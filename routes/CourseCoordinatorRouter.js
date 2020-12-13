const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = 'shawerma';

const CourseCoordinatorRouter = express.Router();

CourseCoordinatorRouter.use(bodyParser.json());

CourseCoordinatorRouter.route('/viewSlotLinkReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id 
    //view slot linking requests for this course
});

CourseCoordinatorRouter.route('acceptlotLinkReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //verify that there is a req with this id
    //get the course id 
    //update the status to accepted
    //update the mem schedule with this assignment
    //update the course assigned slots
    //update the coverage
});

CourseCoordinatorRouter.route('rejectlotLinkReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //verify that there is a req with this id
    //update the status to rejected
});

CourseCoordinatorRouter.route('addSlot')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id 
    //get slot details and verify that it is correct
    //update the course assigned slots and unassigned slots and slots
    //update the coverage
});

CourseCoordinatorRouter.route('updateSlot')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id and slot given
    //update the corresponding slot
});

CourseCoordinatorRouter.route('deleteSlot')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id and slot given
    //delete the record from slots table
    //update the corresponding slots in course 
    //update the course assigned slots and unassigned slots and slots
    //update the coverage

});

//update academic members schedules with slots changed