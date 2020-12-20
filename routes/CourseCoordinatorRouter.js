const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const members = require('../models/members');
const slotLinkReq = require('../models/slotLinkReq');
const academicMember = require('../models/academicMember');
const SlotLinkReqs = require('../models/slotLinkReq');
const courses = require('../models/course')
const slots = require('../models/slot')


const key = 'shawerma';


const CourseCoordinatorRouter = express.Router();

CourseCoordinatorRouter.use(bodyParser.json());
CourseCoordinatorRouter.use(express.json());
CourseCoordinatorRouter.use(authenticate);

CourseCoordinatorRouter.route('/viewSlotLinkReq')
    .get(async(req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //get the course id 
        //view slot linking requests for this course
    });


//authenticate that this is a valid member
//authorize that this is a CC member
//verify that there is a req with this id
//get the course id 
//update the status to accepted
//update the mem schedule with this assignment
//update the course assigned slots
//update the coverage
CourseCoordinatorRouter.route('/acceptlotLinkReq')
    .put(async(req, res, next) =>
    {
        // try
        // {
        const token = req.header('auth-token');
        const DecodeToken = jwt_decode(token);
        const id = DecodeToken.id;
        const loggedMember = await members.findOne(
        {
            id: id
        });
        if (!loggedMember)
        {
            res.send("not Authenticated");
            return;
        }
        if (id.includes('ac'))
        {
            const loggedacm = await academicMember.findOne(
            {
                Memberid: loggedMember._id
            });
            //console.log("ASdasdasdsasdddddddddddddddddddad" + loggedMember._id);
            const loggedcourse = await courses.findOne(
            {
                courseCoordinator: loggedacm._id
            });
            const requests = await SlotLinkReqs.find(
            {
                courseID: loggedcourse._id
            }).populate(
            {
                path: 'courseID',
                select: 'name code numberOfSlotsNeeded numberOfSlotsAssigned coverage'
            }).populate(
            {
                path: 'memberID',
            })
            res.json(requests)
        }
        // }
        // catch (error)
        // {
        //     res.status(500).json(
        //     {
        //         error: error
        //     })
        // }
    });


//authenticate that this is a valid member
//authorize that this is a CC member
//verify that there is a req with this id
//get the course id 
//update the status to accepted
//update the mem schedule with this assignment
//update the course assigned slots
//update the coverage
CourseCoordinatorRouter.route('/acceptlotLinkReq')
    .put(async(req, res, next) =>
    {
        try
        {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const loggedMember = await members.findOne(
            {
                id: id
            });
            if (!loggedMember)
            {
                res.send("not Authenticated");
                return;
            }
            if (id.includes('ac'))
            {
                const reqID = req.body.reqID;
                const request = await SlotLinkReqs.findOne(
                {
                    _id: reqID,
                })
                if (request.status != "Pending")
                {
                    res.send("Request isnot in Pending state")
                    return
                }
                if (request == null)
                {
                    res.send("request not found.");
                    return;
                }
                const loggedacm = await academicMember.findOne(
                {
                    Memberid: loggedMember._id
                })
                const reqmaker = await academicMember.findOne(
                {
                    _id: request.memberID
                })
                console.log("course iD " + request.courseID)
                const reqcourse = await courses.findOne(
                {
                    _id: request.courseID,
                })
                console.log(
                {
                    courseCoordinator: loggedacm._id,
                    asd: reqcourse.courseCoordinator,
                    flag: reqcourse.courseCoordinator + "" == loggedacm._id + ""
                });
                if (reqcourse == null)
                {
                    res.send("course not found")
                    return
                }
                if (reqcourse.courseCoordinator + "" != loggedacm._id + "")
                {
                    res.send("course not related to this course coordinator")
                    return
                }
                const reqSlot = await slots.findOne(
                    {
                        _id: request.requestedSlot
                    })
                    //check if el wad da by coord el course da
                if (request.courseID + "" != reqcourse._id + "")
                {
                    res.send("course not relasdasdsadated to this course coordinator");
                    return;
                }
                else
                {
                    //update req
                    request.status = "accepted";
                    await request.save();

                    //update el acadimic memeber schedule\
                    reqmaker.schedule.push(reqSlot._id);
                    await reqmaker.save();

                    //update el slots 
                    reqSlot.memberID = reqmaker._id;
                    await reqSlot.save();

                    //update el course 
                    //hageb 3add el slots ely lnfs el course we lehom 7ad bydehom
                    var slotcount = await slots.find(
                    {
                        course: request.courseID,
                        memberID:
                        {
                            $ne: null
                        }
                    })
                    slotcount = slotcount.length;
                    reqcourse.numberOfSlotsAssigned = slotcount;
                    reqcourse.coverage = reqcourse.numberOfSlotsAssigned / reqcourse.numberOfSlotsNeeded;
                    await reqcourse.save();
                    res.send("Accepted");
                    return;
                }


            }
        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error
            })
        }
    });

CourseCoordinatorRouter.route('rejectlotLinkReq/:reqID')
    .put((req, res, next) =>
    {
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
                                var c = await courses.find({"courseCoordinator": acMem[0]._id});
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
                                    var addedSlot = (await slots.find({ $and: [{ "location": l[0]._id }, { "timing": req.body.timing }]}))[0];
                                    var courseSlots = c[0].slots;
                                    courseSlots.push(addedSlot. _id);
                                    //update the course assigned slots and unassigned slots and slots
                                    var cAssignedSlots = c[0].numberOfSlotsNeeded + 1;
                                    //update the coverage
                                    var cov = (c[0].numberOfSlotsAssigned)/cAssignedSlots ;
                                    await courses.findByIdAndUpdate(c[0]._id, {"slots": courseSlots , "numberOfSlotsNeeded": cAssignedSlots, "coverage": cov });
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
    

CourseCoordinatorRouter.route('updateSlot')
    .put((req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //get the course id and slot given
        //update the corresponding slot
    });

CourseCoordinatorRouter.route('deleteSlot')
    .put((req, res, next) =>
    {
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