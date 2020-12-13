const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const key = 'shawerma';

const MemberRouter = express.Router();

MemberRouter.use(bodyParser.json());

MemberRouter.route('/login')
.post((req,res,next) =>{
    //verify that the needed credentials are given
    //verify that there is a user with the email given in the body
    //if found verify that the password is correct using bcrypt
    //if this is the first login prompt the user to change password
    //use the prompt col in the member table
});

MemberRouter.route('/logout')
.post((req,res,next) =>{
    //verify that the needed credentials are given
    //I think delete the token
});

MemberRouter.route('/viewProfile')
.get((req,res,next) =>{
    //authenticate
    //check member type;
    //if academic member show courses details
});

MemberRouter.route('/updateProfile')
.put((req,res,next) =>{
    //authenticate
    //refuse to update name or id
    //check member type;
    //if academic member refuse to update salary, faculty and department.
});

MemberRouter.route('/resetPassword')
.post((req,res,next) =>{
    //authenticate
    //hash the password
    //update the corresponding record
    //make the prompt col value = false
});

MemberRouter.route('/signIn')
.post((req,res,next) =>{
    //does he has to be logged in?
    //authenticate
    //add a record in the attendace collection with the id from params with a new date created once signed in
});

MemberRouter.route('/signOut')
.post((req,res,next) =>{
    //does he has to be logged in?
    //authenticate
    //update the last record in the attendace collection with the id from params with an empty signOut
    // with a new date created once signed out
    //update the hours remaining and missing in the log table
    //update the remaining days if the number of hours spent satisfies the day
});

MemberRouter.route('/viewAllAttendance')
.get((req,res,next) =>{
    //authenticate
    //get all the records with the id from params 
});

MemberRouter.route('/viewAttendance/:mID')
.get((req,res,next) =>{
    //authenticate
    //get all the records with the id from params and month is equal to mID
});

MemberRouter.route('/viewMissingDays')
.get((req,res,next) =>{
    //authenticate
    //get all the records with the id from params
    //compute the number of days attended
    //subtract the number of days that should be attended by the number of actually attended
    //remove days off and fridays
    //if there is a remainder compare it with leaves table 
    //the remainder is the missing days
});

MemberRouter.route('/viewHours')
.get((req,res,next) =>{
    //authenticate
    //get all the records with the id from params
    //compute the number of hours missing shown in negative /extra shown in positive
});

