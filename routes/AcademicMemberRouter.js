const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = 'shawerma';

const AcademicMemberRouter = express.Router();

AcademicMemberRouterRouter.use(bodyParser.json());

AcademicMemberRouterRouter.route('/viewSchedule')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID
    //view schedule of this member and check replacements model to add extra slots
});

AcademicMemberRouterRouter.route('/viewReplacementReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the replacements in the replacement table
});

AcademicMemberRouterRouter.route('/sendReplacementReq')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID from the token
    //get the the memberID to send the request to from the body
    //create a new request and add it to the table 
});

AcademicMemberRouterRouter.route('/sendSlotLinkReq')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //verfiy that this member is assigned to the course of this slot
    //get the memberID from the token
    //get the course code from the body
    //get the desired slot from the body
    //create a new request in the slot linking requests table
});

AcademicMemberRouterRouter.route('/sendChangeDayOffReq')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID from the token
    //get the desired dayOff from the body
    //verfiy that this member does not have slots in the required dayoff
    //check if he left a comment which is optional
    //create a new request in the dayOff table requests table
});

AcademicMemberRouterRouter.route('/sendLeaveReq')
.post((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID from the token
    //get the desired type of leave from the body
    //get the required data according to the type of leave from the body
    //choose which leave table to add the request 
    //if this is a maternity leave check that the member is a female
});

AcademicMemberRouterRouter.route('/notification')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID from the token
    //get notified when a request of his got accepted or rejected
});

AcademicMemberRouterRouter.route('/viewAllReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get all kinds of requests
    //I do not know if this route should show only his requests or all?
});

AcademicMemberRouterRouter.route('/viewAcceptedReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get all kinds of requests that are accepted
    //I do not know if this route should show only his requests or all?
});

AcademicMemberRouterRouter.route('/viewPendingReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get all kinds of requests that are pending
    //I do not know if this route should show only his requests or all?
});

AcademicMemberRouterRouter.route('/viewRejectedReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get all kinds of requests that are rejected
    //I do not know if this route should show only his requests or all?
});

AcademicMemberRouterRouter.route('/cancelReq')
.delete((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a AM member
    //get the memberID from the token
    //get the type of requests he is willing to cancel from the body
    //if the request is still pending just delete the record
    //if the request got accepted but its day did not come reverse any taken action
});