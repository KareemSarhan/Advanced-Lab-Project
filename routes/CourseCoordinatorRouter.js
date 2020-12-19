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

CourseCoordinatorRouter.route('/viewSlotLinkReq')
    .get((req, res, next) =>
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
            const reqID = req.body.reqID;
            const request = await SlotLinkReqs.findOne(
            {
                _id: reqID,
            })
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
            if (reqcourse.courseCoordinator != loggedacm._id)
            {
                res.send("course not related to this course coordinator")
                return
            }
            const reqSlot = await slots.findOne(
                {
                    _id: request.requestedSlot
                })
                //check if el wad da by coord el course da
            if (request.courseID != reqcourse._id)
            {
                res.send("course not related to this course coordinator");
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
        // }
        // catch (error)
        // {
        //     res.status(500).json(
        //     {
        //         error: error
        //     })
        // }
    });

CourseCoordinatorRouter.route('rejectlotLinkReq/:reqID')
    .put((req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //verify that there is a req with this id
        //update the status to rejected
    });

CourseCoordinatorRouter.route('addSlot')
    .put((req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //get the course id 
        //get slot details and verify that it is correct
        //update the course assigned slots and unassigned slots and slots
        //update the coverage
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