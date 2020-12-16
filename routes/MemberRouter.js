const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt_decode = require('jwt-decode'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const members = require('../models/members')
const location = require('../models/location')
const AM = require('../models/academicMember')
var token = "";


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
         token = jwt.sign({id:existingUser.id},key);
       
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
.get((req,res,next) =>{
     token = "" ;
     res.header("auth-token",token);
    res.send("logged out ")

    //verify that the needed credentials are given
    //I think delete the token
});

MemberRouter.route('/viewProfile')
.get(async(req,res,next) =>{
    try{
    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const existingUser = await members.findOne({id:id});
    if(!existingUser){
        res.send("not Authenticated")
    }
    if(id.includes('ac')){
    const academicMember = await AM.findOne({Memberid :existingUser._id});
     const OfficeID = existingUser.officeLocation;
     const OfficeName = await location.findOne({_id:OfficeID});
     const course = academicMember.course;
    res.json({
        Member :{
            name :existingUser.name,
            email:existingUser.email,
            faculty :academicMember.faculty,
            department: academicMember.department,
            dayOff:existingUser.dayOff,
            Office : OfficeName.name,
            course : course
        }
    })
    //res.send(course)
}
else{
res.json({
    Member :{
        name :existingUser.name,
        email:existingUser.email,
        Office : OfficeName.name
    }
});
}
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
});

MemberRouter.route('/updateProfile')
.post(async(req,res,next) =>{
    try{
    const {NewSecondaryEmail,NewPhonenumber, NewOfficehours} = req.body;
    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const existingUser = await members.findOne({id:id});
    if(!existingUser){
        res.send("Not authenticated");
    }
    if(NewSecondaryEmail){
    members.updateOne({id:id},{SecondayMail:NewSecondaryEmail} , function(err, res) {
        if (err) throw err;
        console.log("document updated 1");
      });
    }
      if(NewPhonenumber){
      members.updateOne({id:id},{phoneNumber:NewPhonenumber} , function(err, res) {
        if (err) throw err;
        console.log("document updated 2");
      });
    }
      if(id.includes('ac')){
          if(NewOfficehours){
            AM.updateOne({Memberid:existingUser._id},{officeHourse:NewOfficehours} , function(err, res) {
                if (err) throw err;
                console.log("document updated 2");
              });
  
          }
      }
      res.send("Updated Successfully .")

    }
    catch(error){
        res.status(500).json({error:error.message})

    }
    //authenticate
    //refuse to update name or id
    //check member type;
    //if academic member refuse to update salary, faculty and department.
});

MemberRouter.route('/resetPassword')
.post(async(req,res,next) =>{
    try{
    //console.log("hello")
    const NewPassword = req.body.NewPassword;
    if(NewPassword.length < 7 ){
       res.send("Password must be atleast 8 characters ")
    }
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
.put(async(req,res,next) =>{
    try{
      //  const nowDate = new Date();
        
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
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
.get(async(req,res,next) =>{
    try{

    }
    catch(error){
        res.status(500).json({error:error.message})
    }

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
