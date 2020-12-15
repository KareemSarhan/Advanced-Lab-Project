const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt_decode = require('jwt-decode'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const members = require('../models/members')
const MemberRouter = express.Router();
MemberRouter.use(bodyParser.json());

MemberRouter.route('/login')
.post(async(req,res,next) =>{
    try {
        const {email,password}=req.body;
        if(!email|| !password){
            return res.status(400).json({msg:"please enter email or password"})
        }
        const existingUser = await members.findOne({email:email});
        if(!existingUser)
        {
            return res.status(400).json({msg:"Not found Member."})
        }
        const isMatched = await bcrypt.compare(password,existingUser.password);
        if(!isMatched){
            return res.status(400).json({msg:"inavalid password"})
        }
        const token = jwt.sign({id:existingUser.id},key);
       
        res.header("auth-token",token);
        res.send("Logged in sucssefully ")

    }
    catch(error){
        res.status(500).json({error:error.message})
    }

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
.post(async(req,res,next) =>{
    try{
    console.log("hello")
    const NewPassword = req.body.NewPassword;
    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const existingUser = await members.findOne({id:id});
    const salt = await bcrypt.genSalt();
    const hasedPassword = await bcrypt.hash(NewPassword,salt);
    if(!existingUser){
    res.send("not authenticated ");
    }
    members.updateOne({id:id},{password:hasedPassword} , function(err, res) {
        if (err) throw err;
        console.log("document updated");
      });
      members.updateOne({id:id},{prompt:false} , function(err, res) {
        if (err) throw err;
        console.log("document updated");
      });
      res.send("Password Updated sucssefully.")
   
    }
    catch(error){
        res.status(500).json({error:error.message})
    }

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

module.exports = MemberRouter;
