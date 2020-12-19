const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const members = require('../models/members');
const academicMember = require('../models/academicMember');
const course = require('../models/course');
const slot = require('../models/slot');
const location = require('../models/location');
const key = 'shawerma';


const CourseCoordinatorRouter = express.Router();

CourseCoordinatorRouter.use(bodyParser.json());
CourseCoordinatorRouter.use(express.json());
CourseCoordinatorRouter.use(authenticate);

CourseCoordinatorRouter.route('/viewSlotLinkReq')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id 
    //view slot linking requests for this course
});

CourseCoordinatorRouter.route('/acceptlotLinkReq/:reqID')
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

CourseCoordinatorRouter.route('/rejectlotLinkReq/:reqID')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //verify that there is a req with this id
    //update the status to rejected
});

CourseCoordinatorRouter.route('/addSlot')
.post(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log((payload.id).includes("ac"));
    if (!((payload.id).includes("ac"))){ 
        console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        const m = await members.find({"id": payload.id});
        if (m.length == 0){
            return res.status(401).send("there is no member with this id");
        }else{
            var acMem = await academicMember.find({"Memberid": m[0]._id});
            if (acMem.length !=0){
                //console.log("here");
                if (acMem[0].type != "CourseCoordinator"){
                    return res.status(401).send("not authorized");
                }
                else{
                    //authorized
                    //get slot details and verify that it is correct
                    if (req.body.type == null){
                        return res.status(400).send("type of slot should be given in body");
                    }else if (req.body.location == null){
                        return res.status(400).send("location should be given in body");
                    }else if (req.body.timing == null){
                        return res.status(400).send("timing of should be given in body");
                    }else{
                        //check that the location exists 
                        var l = await location.find({"name": req.body.location});
                        if (l.length == 0){
                            return res.status(400).send("there does not exist a location with this name");
                        }else{
                            //get the course id 
                            var c = await course.find({"courseCoordinator": acMem[0]._id});
                            if (c.length != 0 ){
                                const s = new slot({
                                    type: req.body.type,
                                    course: c[0]._id,
                                    location: l[0]._id,
                                    timing: req.body.timing
                                });
                                await s.save();
                                console.log("slot created");
                                //add this slot to the course slots
                                var addedSlot = (await slot.find({ $and: [{ "location": l[0]._id }, { "timing": req.body.timing }]}))[0];
                                var courseSlots = c[0].slots;
                                courseSlots.push(addedSlot. _id);
                                //update the course assigned slots and unassigned slots and slots
                                var cAssignedSlots = c[0].numberOfSlotsNeeded + 1;
                                //update the coverage
                                var cov = (c[0].numberOfSlotsAssigned)/cAssignedSlots ;
                                await course.findByIdAndUpdate(c[0]._id, {"slots": courseSlots , "numberOfSlotsNeeded": cAssignedSlots, "coverage": cov });
                                console.log("slot added to course and coverage updated");
                                res.send("slot added");
                            }
                        }
                    }
                }
            }
        }
    }    
});

CourseCoordinatorRouter.route('/updateSlot')
.put((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a CC member
    //get the course id and slot given
    //update the corresponding slot
});

CourseCoordinatorRouter.route('/deleteSlot')
.delete((req,res,next) =>{
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