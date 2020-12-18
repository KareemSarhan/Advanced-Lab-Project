const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');
const key = 'shawerma';
const member = require('../models/members');
const academicMember = require('../models/academicMember');
const ReplacementRequest = require('../models/replacementrequest');
const slots = require('../models/slot');
const LocOffice = require('../models/location');
const AcademicMemberRouter = express.Router();

AcademicMemberRouter.use(bodyParser.json());

AcademicMemberRouter.route('/viewSchedule')
    .get(async(req, res, next) => {
        try {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac"))) {
                return res.status(401).send("not authorized");
            } else {
                //akhadt l id
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
                const CurrentID = DecodeToken.id;
                const found = await member.findOne({ id: CurrentID });
                const FoundID = found._id;
                const acfound = await academicMember.findOne({ Memberid: FoundID });
                var scheduleslots = [];
                for (i = 0; i < acfound.schedule.length; i++) {
                    scheduleslots.push(acfound.schedule[i]);
                    const SlotID = scheduleslots[i];
                    const LocationOffice = await LocOffice.findOne({ SlotID: LocOffice._id });
                    const actualOffice = LocationOffice.name;

                    var actualSchedule = [];
                    const foundSlot = await slots.find({ memberID: FoundID });
                    for (i = 0; i < foundSlot.length; i++) {
                        actualSchedule.push([foundSlot[i].type, foundSlot[i].timing, actualOffice])
                    }
                    //check replacement models to add --->fen f mongo
                }
                res.send(actualSchedule);
                // res.json({
                //     data1 : actualSchedule[0][0].type,
                //     data2: actualSchedule[0][0].timing,
                // });
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

AcademicMemberRouter.route('/viewReplacementReq')
    .get(async(req, res, next) => {
        try {
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac"))) {
                return res.status(401).send("not authorized");
            } else {
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
                const CurrentID = DecodeToken.id;
                const found = await member.findOne({ id: CurrentID });
                const FoundID = found._id; //bta3 l ac member obj id
                const Req = await ReplacementRequest.findOne();
                res.json({
                    Req
                });
                //  res.send(askreq);
            }
        }
        //hal kol l replacements wala l yekhoso l member da bs ??
        //get the replacements in the replacement table
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

AcademicMemberRouter.route('/sendReplacementReq')
    .post((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get the memberID from the token
        //get the the memberID to send the request to from the body
        //create a new request and add it to the table 
    });

AcademicMemberRouter.route('/sendSlotLinkReq')
    .post((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //verfiy that this member is assigned to the course of this slot
        //get the memberID from the token
        //get the course code from the body
        //get the desired slot from the body
        //create a new request in the slot linking requests table
    });

AcademicMemberRouter.route('/sendChangeDayOffReq')
    .post((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get the memberID from the token
        //get the desired dayOff from the body
        //verfiy that this member does not have slots in the required dayoff
        //check if he left a comment which is optional
        //create a new request in the dayOff table requests table
    });

AcademicMemberRouter.route('/sendLeaveReq')
    .post((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get the memberID from the token
        //get the desired type of leave from the body
        //get the required data according to the type of leave from the body
        //choose which leave table to add the request 
        //if this is a maternity leave check that the member is a female
    });

AcademicMemberRouter.route('/notification')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get the memberID from the token
        //get notified when a request of his got accepted or rejected
    });

AcademicMemberRouter.route('/viewAllReq')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get all kinds of requests
        //I do not know if this route should show only his requests or all?
    });

AcademicMemberRouter.route('/viewAcceptedReq')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get all kinds of requests that are accepted
        //I do not know if this route should show only his requests or all?
    });

AcademicMemberRouter.route('/viewPendingReq')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get all kinds of requests that are pending
        //I do not know if this route should show only his requests or all?
    });

AcademicMemberRouter.route('/viewRejectedReq')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get all kinds of requests that are rejected
        //I do not know if this route should show only his requests or all?
    });

AcademicMemberRouter.route('/cancelReq')
    .delete((req, res, next) => {

        //authenticate that this is a valid member
        //authorize that this is a AM member
        //get the memberID from the token
        //get the type of requests he is willing to cancel from the body
        //if the request is still pending just delete the record
        //if the request got accepted but its day did not come reverse any taken action
    });

module.exports = AcademicMemberRouter;