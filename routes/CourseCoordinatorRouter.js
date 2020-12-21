const express = require('express');
const { timeStamp } = require('console');
const validator = require('validator');
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
const DeletedToken = require("../models/DeletedTokens")
const attendance = require("../models/attendance");
const Missings = require("../models/missing");
const courses = require("../models/course")
const slotLinkReqs = require("../models/slotLinkReq");
const Slots = require("../models/slot")
const { ObjectID } = require('mongodb');
const slot = require('../models/slot');
const CourseCoordinatorRouter = express.Router();
CourseCoordinatorRouter.use(bodyParser.json());


CourseCoordinatorRouter.route('/viewSlotLinkReq')
.get(async(req,res,next) =>{
    try{
        const token  = req.header('auth-token');
        const DecodeToken = jwt_decode(token);
        const id = DecodeToken.id;
        const existingUser = await members.findOne({id:id});
        const deletedtoken = await DeletedToken.findOne({token:token});
        const existingAM = await AM.findOne({Memberid:existingUser._id})
        const CCofCourse = await courses.findOne({courseCoordinator:existingAM._id})
        console.log(CCofCourse.name)
        const typeOfAM = existingAM.type;
        const SLslotsReq = await slotLinkReqs.find({courseID:CCofCourse._id})
        console.log(typeOfAM)
        if(!(typeOfAM=="CourseCoordinator")){
            res.send("Not authorized .")
            return
        }
        if(!existingUser){
            res.send("Not authenticated .")
            return;
        }
    if(deletedtoken){
        res.send("Sorry you are logged out .")
    }
    else{
        res.json({
            SLslotsReq
            
        });

    }
    

}
    catch(error){
        res.status(500).json({error:error.message})
    }
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id 
    //view slot linking requests for this course
});


CourseCoordinatorRouter.route('/rejectslotLinkReq')
.put(async(req,res,next) =>{
    try{
    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const existingUser = await members.findOne({id:id});
    const deletedtoken = await DeletedToken.findOne({token:token});
    const existingAM = await AM.findOne({Memberid:existingUser._id})
    if(!existingUser){
        res.send("Not authenticated .")
        return;
    }
if(deletedtoken){
    res.send("Sorry you are logged out .")
    return
}
const typeOfAM = existingAM.type;
if(!(typeOfAM=="CourseCoordinator")){
    res.send("Not authorized .")
    return
}
const TAid = req.body.id;
if(!(TAid)){
    res.send("Please enter an Id for the acedmic member you want .")
    return
}
else{
    const TA_id = await AM.findOne({Memberid:TAid._id})
}
    const CCofCourse = await courses.findOne({courseCoordinator:existingAM._id})
   // console.log(CCofCourse.name)
    const Wantedreq = await slotLinkReqs.find({courseID:CCofCourse._id , memberid : TA_id})
    
    if(!Wantedreq){
        res.send("No request with this id ")
    }
    //console.log(Wantedreq)
   
   
else{
    slotLinkReqs.updateOne({_id:Wantedreq._id},{status:"Rejected"} , function(err, res) {
        if (err) throw err;
        console.log("document updated 1");
      });
    res.send("Data is updated.")

}
}
catch(error){
    res.status(500).json({error:error.message})
}
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //verify that there is a req with this id
    //update the status to rejected
});

CourseCoordinatorRouter.route('/addSlot')
.put((req,res,next) =>{
    
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id 
    //get slot details and verify that it is correct
    //update the course assigned slots and unassigned slots and slots
    //update the coverage
});




CourseCoordinatorRouter.route('/updateSlot')
.post(async(req,res,next) =>{
    try{
    const SlotMember = req.body.SlotMember
    const SlotTiming = req.body.SlotTiming
    
    const NewTiming =req.body.NewTiming
    const NewLocation =req.body.NewLocation  //name

    const FindMem= await members.findOne({id:SlotMember})
  //  console.log(FindMem)
    const FindAM = await AM.findOne({Memberid:FindMem._id})
    // console.log(FindAM)


    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const deletedtoken = await DeletedToken.findOne({token:token});
    const existingUser = await members.findOne({id:id});
    //console.log(existingUser)
    const existingAM = await AM.findOne({Memberid:existingUser._id})
   // console.log(existingAM)
    const CCofCourse = await courses.findOne({courseCoordinator:existingAM._id})
    //console.log(CCofCourse)
    const getLocation = await location.findOne({name:NewLocation})
   // console.log(getLocation)
    const typeOfAM = existingAM.type;
    
    if(!(typeOfAM=="CourseCoordinator")){
        res.send("Not authorized .")
        return
    }
    if(!existingUser){
        res.send("Not authenticated .")
        return;
    }
if(deletedtoken){
    res.send("Sorry you are logged out .")
    return
}
if(!(SlotMember) || !(SlotTiming)){
    res.send('Please enter the required Data.')
}
else {
  
    const WantedSlot = await slot.findOne({course:CCofCourse._id , timing:SlotTiming , memberID :FindAM._id  });
    if(!WantedSlot){
        res.send("not found wanted slot ")
        return
    }
    else {
        if(NewTiming){
    Slots.updateOne({_id:WantedSlot._id},{timing:NewTiming} , function(err, res) {
        if (err) throw err;
        console.log("document updated 1");
      });
    }
    if((NewLocation))
    {
        Slots.updateOne({_id:WantedSlot._id},{ location :getLocation._id} , function(err, res) {
            if (err) throw err;
            console.log("document updated 1");
          });
    }
    res.send("Data is updated.")  
    }

}
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id and slot given
    //update the corresponding slot
});






CourseCoordinatorRouter.route('/deleteSlot')
.delete(async(req,res,next) =>{
    try{
      //  console.log("shh")
    const SlotMember = req.body.SlotMember
    const SlotTiming = req.body.SlotTiming
    
    const FindMem= await members.findOne({id:SlotMember})
   // console.log(FindMem)
    const FindAM = await AM.findOne({Memberid:FindMem._id})
  //  console.log(FindAM)

    const token  = req.header('auth-token');
    const DecodeToken = jwt_decode(token);
    const id = DecodeToken.id;
    const deletedtoken = await DeletedToken.findOne({token:token});
    const existingUser = await members.findOne({id:id});
    //console.log(existingUser)
    const existingAM = await AM.findOne({Memberid:existingUser._id})
   // console.log(existingAM)
    const CCofCourse = await courses.findOne({courseCoordinator:existingAM._id})
   // console.log(CCofCourse)
    const typeOfAM = existingAM.type;

    if(!(typeOfAM=="CourseCoordinator")){
        res.send("Not authorized .")
        return
    }
    if(!existingUser){
        res.send("Not authenticated .")
        return;
    }
if(deletedtoken){
    res.send("Sorry you are logged out .")
    return
}
else{
   const WantedSlot = await slot.findOne({course:CCofCourse._id , timing:SlotTiming , memberID :FindAM._id  });
   //console.log(WantedSlot._id)
   //console.log(wantedSlotID)
   const SchedualeOfTA = FindAM.schedule;
   for(i=0 ; i < SchedualeOfTA.length;i++){
    //console.log("here 4")
       if(SchedualeOfTA[i]==WantedSlot._id + ""){
           console.log("here 1 ")
        SchedualeOfTA.splice(i,1);
       }
   }
   console.log(SchedualeOfTA)
  const SlotsOfCourse =CCofCourse.slots
  //console.log(CCofCourse.slots)
  for(i=0 ; i <SlotsOfCourse.length;i++){
    //console.log("here 3")
    if(SlotsOfCourse[i].equals(WantedSlot._id )){
        console.log("here 2")
        SlotsOfCourse.splice(i,1);
       }

  }
  console.log(SlotsOfCourse)
  const NewnumberOfSlotsNeeded = CCofCourse.numberOfSlotsNeeded-1;
 //console.log(CCofCourse.numberOfSlotsNeeded)
  const NewnumberOfSlotsAssigned=CCofCourse.numberOfSlotsAssigned-1
 // console.log(CCofCourse.numberOfSlotsAssigned)

  const NewCoverage = NewnumberOfSlotsAssigned/NewnumberOfSlotsNeeded
  //console.log(NewCoverage)

  await courses.updateOne({_id:CCofCourse._id},{numberOfSlotsNeeded:NewnumberOfSlotsNeeded,numberOfSlotsAssigned:NewnumberOfSlotsAssigned,coverage:NewCoverage,slots:SlotsOfCourse} , function(err, res) {
    if (err) throw err;
   // console.log("document updated 1");
  });
  await AM.updateOne({_id:FindAM._id},{schedule: SchedualeOfTA } , function(err, res) {
    if (err) throw err;
   // console.log("document updated 1");
  });
    

await Slots.findOneAndDelete({_id: WantedSlot._id})
  // console.log(SlotsOfCourse.length)
//    console.log(SchedualeOfTA.length)
//    console.log(SchedualeOfTA)
    

}
  res.send("Deleted slot.")
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id and slot given
    //delete the record from slots table
    //update the corresponding slots in course 
    //update the course assigned slots and unassigned slots and slots
    //update the coverage

});

//update academic members schedules with slots changed

module.exports = CourseCoordinatorRouter;