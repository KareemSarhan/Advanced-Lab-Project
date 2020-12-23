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
const SlotLinkRequest = require('../models/slotLinkReq');
const slots = require('../models/slot');
const Loc = require('../models/location');
const course = require('../models/course');
const Dayoffreq = require('../models/dayOffReq');
const CompensationSlots = require('../models/CompensationSlot');
const Linkreq = require('../models/slotLinkReq');
const LEAVES = require('../models/Leaves');
var validator = require('validator');
const DeletedToken = require("../models/DeletedTokens");

const AcademicMemberRouter = express.Router();
AcademicMemberRouter.use(bodyParser.json());

AcademicMemberRouter.route('/viewSchedule') //done  //written 
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //l fe members _id
            queryForMem = {
                Memberid: FoundID
            };
            var acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });


            var acfoundforcomrem = await academicMember.findOne(queryForMem);
            console.log(acfoundforcomrem.CompensationSlots)

            acfoundforcomrem.CompensationSlots = acfoundforcomrem.CompensationSlots.filter(function(Slot)
            {
                //low true shelha
                return new Date(Slot.Date) < new Date();
            });
            console.log(acfoundforcomrem.CompensationSlots)
            acfoundforcomrem.save();


            acfound = await academicMember.findOne(
                queryForMem).populate(
            {
                path: 'schedule',
                select: '-_id course timing type location',
                populate:
                {
                    path: 'location',
                    select: '-_id name type'
                }
            }).populate(
            {
                path: 'schedule',
                select: '-_id course timing type location',
                populate:
                {
                    path: 'course',
                    select: '-_id name  '
                }
            })




            res.json(
            {
                "Schedule": acfound.schedule,
                "CompensationSlots": acfound.CompensationSlots
            })
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/viewReplacementReq') //done and written
    .get(async(req, res, next) =>
    {
        try
        {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FID = found._id; //bta3 l ac member obj id
            const REQ = await ReplacementRequest.find(
            {
                memberID: FID
            });
            var ALLREQ = [];
            for (i = 0; i < REQ.length; i++)
            {
                ALLREQ.push(["RequestID :" + REQ[i].requestID, "RequestedID :" + REQ[i].requestedID, "Requested Day :" + REQ[i].requestedDay, "Requested Slot :" + REQ[i].requestedSlot, "Status :" + REQ[i].status, "comment :" + REQ[i].comment]);
            }

            res.send(ALLREQ);
        }
        //hal kol l replacements wala l yekhoso l member da bs ??

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendReplacementReq') // done and written  
    .post(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            // console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            if (req.body.memberID == null || !(validator.isMongoId(req.body.memberID)))
            {
                return res.status(400).send("your ID should be given!!");
            }
            else if (req.body.requestedID == null || !(validator.isMongoId(req.body.requestedID)))
            {
                return res.status(400).send("Please provide the member id to send request to!");
            }
            else if (req.body.requestedDay == null || !(validator.isDate(req.body.requestedDay)))
            {
                return res.status(400).send("Please provide  the day!");
            }
            else if (req.body.requestedSlot == null || !(typeof(req.body.requestedSlot) == 'string'))
            {
                return res.status(400).send("Please provide which slot of the day!");
            }
            else
            {
                //get the last id available and increment it by 1
                flagAc = true;
                const reqID = await ReplacementRequest.find(
                {
                    "requestID":
                    {
                        $regex: 'R'
                    }
                });
                console.log(reqID);
                if (reqID.length == 0)
                {
                    nID = 1;
                }
                else
                {
                    const maxID = reqID[reqID.length - 1];
                    console.log(maxID);
                    const toBeParsed = maxID.requestID.substring(2);
                    const iID = parseInt(toBeParsed);
                    nID = iID + 1;
                }

                var assignedID = "";
                if (flagAc)
                {
                    assignedID = "R-" + nID + "";
                }
                //all data required are given    
                //Akhiran make a new request
                const ReplacementReq = new ReplacementRequest(
                {
                    requestID: assignedID,
                    memberID: req.body.memberID,
                    requestedID: req.body.requestedID,
                    requestedDay: req.body.requestedDay,
                    requestedSlot: req.body.requestedSlot
                });
                await ReplacementReq.save();
                res.send("Request added");
                console.log("Welmos7af added");
            }

        }


        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendSlotLinkReq') //done and written  
    .post(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id;
            if (req.body.memberID == null || !(validator.isMongoId(req.body.memberID)))
            {
                return res.status(400).send("your ID should be given!!");
            }
            else if (req.body.courseID == null || !(validator.isMongoId(req.body.courseID)))
            {
                return res.status(400).send("The course you are assigned to should be given!!");
            }
            else if (req.body.requestedSlot == null || !(validator.isMongoId(req.body.requestedSlot)))
            {
                return res.status(400).send("Please enter the requested slot!!");
            }
            else if (!(typeof(req.body.comment) == 'string'))
            {
                return res.status(400).send("Please enter the comment as String!!");
            }
            else
            {
                //all data required are given 
                //verfiy that this member is assigned to the course of this slot
                const ac = await academicMember.findOne(
                {
                    _id: req.body.memberID,

                });
                if (ac == null)
                {

                    res.send("This member doesn't exist ");
                    return
                }
                const coursefound = await course.findOne(
                {
                    _id: req.body.courseID
                })
                if (coursefound == null)
                {
                    res.send("no course found")
                    return
                }

                // console.log(ac);
                const acfound = await academicMember.findOne(
                {
                    _id: req.body.memberID,
                    courses: req.body.courseID
                });
                if (acfound == null)
                {

                    res.send("sorry you are not assigned to this course");
                    return
                }

                const slot = await slots.findOne(
                {
                    course: req.body.courseID,
                    _id: req.body.requestedSlot
                })
                if (slot == null)
                {
                    res.send("This slot doesn't exist in the requested course!");
                    return
                }
                flagAc = true;
                const reqID = await Linkreq.find(
                {
                    "requestID":
                    {
                        $regex: 'SL'
                    }
                });
                console.log(reqID);
                if (reqID.length == 0)
                {
                    nID = 1;
                }
                else
                {
                    const maxID = reqID[reqID.length - 1];
                    console.log(maxID);
                    const toBeParsed = maxID.requestID.substring(3);
                    const iID = parseInt(toBeParsed);
                    nID = iID + 1;
                }
                console.log(nID)
                var assignedID = "";
                if (flagAc)
                {
                    assignedID = "SL-" + nID + "";
                }
                const LinkingRequest = new Linkreq(
                {
                    requestID: assignedID,
                    memberID: req.body.memberID,
                    courseID: req.body.courseID,
                    requestedSlot: req.body.requestedSlot,
                    comment: req.body.comment
                });

                await LinkingRequest.save();
                res.send("Slot Link Request added YAYYY!!");
                console.log("ya3am added");
            }
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendChangeDayOffReq') //done and written
    .post(async(req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a AM member
        try
        {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //ac member ref member 
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });

            if (req.body.memberID == null || !(validator.isMongoId(req.body.memberID)))
            {
                return res.status(400).send("Please enter your ID!!");
            }
            else if (req.body.requestedDay == null || !(typeof(req.body.requestedDay == 'string')))
            {
                return res.status(400).send("Please enter The requested Day!!");
            }
            else if (!typeof(req.body.comment == 'string'))
            {
                return res.status(400).send("Please enter The comment in string");
            }
            else
            {
                //all data is given
                //get the desired dayOff from the body
                const dayoff = req.body.requestedDay;
                var scheduleslots = [];
                //verfiy that this member does not have slots in the required dayoff
                for (i = 0; i < acfound.schedule.length; i++)
                {
                    scheduleslots.push(acfound.schedule[i]);
                    const SlotID = scheduleslots[i];
                    const ActualSlot = await slots.findOne(
                    {
                        SlotID: slots._id
                    });
                    console.log(found.dayOff)
                    if (req.body.requestedDay.includes(found.dayOff))
                    {
                        return res.status(400).send("This is your actual dayoff!!");
                    }
                    if (ActualSlot == null || !(ActualSlot.timing.includes(req.body.requestedDay)))
                    {
                        //check if he left a comment which is optional
                        //create a new request in the dayOff table requests table
                        flagAc = true;
                        const reqID = await Dayoffreq.find(
                        {
                            "requestID":
                            {
                                $regex: 'DayOff'
                            }
                        });

                        if (reqID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            const maxID = reqID[reqID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(7);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                            console.log(nID);
                        }
                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "DayOff-" + nID + "";
                        }
                        const DayoffReq = new Dayoffreq(
                        {
                            requestID: assignedID,
                            memberID: req.body.memberID,
                            requestedDay: req.body.requestedDay,
                            comment: req.body.comment
                        });
                        await DayoffReq.save();
                        res.send("Day Off Request added");
                        console.log("Akhadt agaza yabnel mahzoza");
                    }
                    else
                    {
                        return res.status(400).send("Cannot send request in a busy day nihahaha!!");
                    }
                }
            }
        }


        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendLeaveReq') //donee and written
    .post(async(req, res, next) =>
    {
        try
        {
            //     //authenticate that this is a valid member
            //    // authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //ac member ref member MEBMER table _id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            if (req.body.StaffID == null || !(validator.isMongoId(req.body.StaffID)) || (req.body.StaffID != FoundID))
            {
                return res.status(400).send("Enter your ID");
            }
            else if (req.body.Leavetype == null || !(typeof(req.body.Leavetype == 'string')))
            {
                return res.status(400).send("Please enter the type of leave!!");
            }
            else
            {
                if (req.body.Leavetype == "Accidental")
                {
                    if (req.body.numberOfdays == null)
                    {
                        return res.status(400).send("Please enter The number of days!!");
                    }
                    else
                    {
                        flagAc = true;
                        const AcID = await LEAVES.find(
                        {
                            "requestID":
                            {
                                $regex: 'Ac'
                            }
                        });
                        if (AcID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            console.log(AcID);
                            const maxID = AcID[AcID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(3);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                        }
                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "Ac-" + nID + "";
                        }
                        const LeaveRequest = new LEAVES(
                        {
                            requestID: assignedID,
                            StaffID: req.body.StaffID,
                            Leavetype: req.body.Leavetype,
                            numberOfdays: req.body.numberOfdays,
                            reason: req.body.reason
                        });
                        await LeaveRequest.save();
                        res.send("Leave Request added");
                        console.log("Welmos7af added");
                    }
                }
                else if (req.body.Leavetype == "Annual")
                {
                    if (req.body.numberOfdays == null || !(typeof(req.body.numberOfdays == 'number')))
                    {
                        return res.status(400).send("Please enter The number of days!!");
                    }
                    else if (req.body.dateOfLeave == null || !(validator.isDate(req.body.dateOfLeave)))
                    {
                        return res.status(400).send("Please enter The date of leave!!");
                    }
                    else if (req.body.replacementID == null || !(validator.isMongoId(req.body.replacementID)))
                    {
                        return res.status(400).send("Please enter The replacement ID!!");
                    }
                    else if (!typeof(req.body.reason == 'string'))
                    {
                        return res.status(400).send("Please enter The reason in string!!");
                    }
                    else
                    {
                        flagAc = true;
                        flagAc = true;
                        const AcID = await LEAVES.find(
                        {
                            "requestID":
                            {
                                $regex: 'An'
                            }
                        });
                        if (AcID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            console.log(AcID);
                            const maxID = AcID[AcID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(3);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                        }

                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "An-" + nID + "";
                        }
                        const LeaveRequest = new LEAVES(
                        {
                            requestID: assignedID,
                            StaffID: req.body.StaffID,
                            Leavetype: req.body.Leavetype,
                            numberOfdays: req.body.numberOfdays,
                            dateOfLeave: req.body.dateOfLeave,
                            replacementID: req.body.replacementID,
                            reason: req.body.reason
                        });
                        await LeaveRequest.save();
                        res.send("Leave Request added");
                        console.log("Welmos7af added");
                    }

                }
                else if (req.body.Leavetype == "Compensation")
                {
                    if (req.body.dateOfabsence == null || !(validator.isDate(req.body.dateOfabsence)))
                    {
                        return res.status(400).send("Please enter The date of absence!!");
                    }
                    else if (req.body.dateOfcompensation == null || !(validator.isDate(req.body.dateOfcompensation)))
                    {
                        return res.status(400).send("Please enter The date of compensation!!");
                    }
                    else if (req.body.reason == null || !typeof(req.body.reason == 'string'))
                    {
                        return res.status(400).send(" You must Enter a reason!!");
                    }
                    else
                    {
                        flagAc = true;
                        const AcID = await LEAVES.find(
                        {
                            "requestID":
                            {
                                $regex: 'C'
                            }
                        });
                        if (AcID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            console.log(AcID);
                            const maxID = AcID[AcID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(2);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                        }
                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "C-" + nID + "";
                        }
                        const LeaveRequest = new LEAVES(
                        {
                            requestID: assignedID,
                            StaffID: req.body.StaffID,
                            Leavetype: req.body.Leavetype,
                            dateOfabsence: req.body.dateOfabsence,
                            dateOfcompensation: req.body.dateOfcompensation,
                            reason: req.body.reason
                        });
                        await LeaveRequest.save();
                        res.send("Leave Request added");
                        console.log("Welmos7af added");
                    }

                }
                else if (req.body.Leavetype == "Maternity")
                {
                    if (req.body.dateOfLeave == null || !(validator.isDate(req.body.dateOfLeave)))
                    {
                        return res.status(400).send("Please enter The date of leave!!");
                    }
                    if (req.body.document == null || !(typeof(req.body.document == 'string')))
                    {
                        return res.status(400).send("Please enter The required document!!");
                    }
                    if (!typeof(req.body.reason == 'string'))
                    {
                        return res.status(400).send("Please the reason in string");
                    }
                    if (!(req.body.StaffID.gender != "female"))
                    {
                        return res.status(400).send("The user should be a female Estargel !!");
                    }
                    {
                        flagAc = true;
                        const AcID = await LEAVES.find(
                        {
                            "requestID":
                            {
                                $regex: 'M'
                            }
                        });
                        if (AcID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            console.log(AcID);
                            const maxID = AcID[AcID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(3);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                        }
                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "M-" + nID + "";
                        }
                        const LeaveRequest = new LEAVES(
                        {
                            requestID: assignedID,
                            StaffID: req.body.StaffID,
                            Leavetype: req.body.Leavetype,
                            dateOfLeave: req.body.dateOfLeave,
                            document: req.body.document,
                            reason: req.body.reason
                        });
                        await LeaveRequest.save();
                        res.send(" Maternity Leave Request added");
                        console.log("Welmos7af added");
                    }
                }
                else if (req.body.Leavetype == "Sick")
                {
                    if (req.body.dateOfLeave == null || !(validator.isDate(req.body.dateOfLeave)))
                    {
                        return res.status(400).send("Please enter The date of leave!!");
                    }
                    else if (req.body.document == null || !(typeof(req.body.document == 'string')))
                    {
                        return res.status(400).send("Please enter The required document!!");
                    }
                    else if (req.body.dateOfdocument == null || !(validator.isDate(req.body.dateOfdocument)))
                    {
                        return res.status(400).send("Please enter The date of document!!");
                    }
                    else if (!typeof(req.body.reason == 'string'))
                    {
                        return res.status(400).send("Please enter the reason in string !!");
                    }
                    else
                    {
                        flagAc = true;
                        const AcID = await LEAVES.find(
                        {
                            "requestID":
                            {
                                $regex: 'S'
                            }
                        });
                        if (AcID.length == 0)
                        {
                            nID = 1;
                        }
                        else
                        {
                            console.log(AcID);
                            const maxID = AcID[AcID.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.requestID.substring(2);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;
                        }
                        var assignedID = "";
                        if (flagAc)
                        {
                            assignedID = "S-" + nID + "";
                        }
                        const LeaveRequest = new LEAVES(
                        {
                            requestID: assignedID,
                            StaffID: req.body.StaffID,
                            Leavetype: req.body.Leavetype,
                            dateOfLeave: req.body.dateOfLeave,
                            document: req.body.document,
                            dateOfdocument: req.body.dateOfdocument,
                            reason: req.body.reason
                        });
                        await LeaveRequest.save();
                        res.send(" Sickness Leave Request added");
                        console.log("Welmos7af added");
                    }
                }

            }
        }
        //get the desired type of leave from the body--done
        //get the required data according to the type of leave from the body--done
        //if this is a maternity leave check that the member is a female
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/notification') //done /written in doc
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //bta3 l ac member obj id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            const ViewDAYOFF = await Dayoffreq.find(
            {
                memberID: acID
            }); //dayofff req
            const ViewRepReq = await ReplacementRequest.find(
            {
                memberID: FoundID
            }); //rep req
            const ViewSlorLinkReq = await Linkreq.find(
            {
                memberID: acID
            }); //
            const ViewLeaves = await LEAVES.find(
            {
                FoundID: LEAVES.StaffID
            });
            const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length + ViewLeaves.length;
            var ALLREQ = []; //han7ot feha kolo
            for (i = 0; i < ViewDAYOFF.length; i++)
            {
                if (ViewDAYOFF[i].status == "Accepted" || ViewDAYOFF[i].status == "rejected")
                //console.log( ViewDAYOFF); 
                    ALLREQ.push(ViewDAYOFF[i]);

            }
            for (i = 0; i < ViewRepReq.length; i++)
            {
                if (ViewRepReq[i].status == "Accepted" || ViewRepReq[i].status == "rejected")
                    ALLREQ.push(ViewRepReq[i]);

            }
            for (i = 0; i < ViewSlorLinkReq.length; i++)
            {
                if (ViewSlorLinkReq[i].status == "Accepted" || ViewSlorLinkReq[i].status == "rejected")
                    ALLREQ.push(ViewSlorLinkReq[i]);
            }
            for (i = 0; i < ViewLeaves.length; i++)
            {
                if (ViewLeaves[i].status == "Accepted" || ViewLeaves[i].status == "rejected")
                    ALLREQ.push(ViewLeaves[i]);
            }
            //aflet else l auth 
            // console.log(ALLREQ) ;      
            res.send(ALLREQ);
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/viewAllReq') //done  / written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //bta3 l ac member obj id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            const ViewDAYOFF = await Dayoffreq.find(
            {
                memberID: acID
            }); //dayofff req
            const ViewRepReq = await ReplacementRequest.find(
            {
                memberID: FoundID
            }); //rep req
            const ViewSlorLinkReq = await Linkreq.find(
            {
                memberID: acID
            }); //

            const ViewLeaves = await LEAVES.find(
            {
                FoundID: LEAVES.StaffID
            });
            const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length + ViewLeaves.length;
            var ALLREQ = []; //han7ot feha kolo
            for (i = 0; i < LLength; i++)
            {
                ALLREQ.push(ViewDAYOFF[i], ViewRepReq[i], ViewSlorLinkReq[i], ViewLeaves[i]);

            }
            res.send(ALLREQ);
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/viewAcceptedReq') //done  / written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //bta3 l ac member obj id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            const ViewDAYOFF = await Dayoffreq.find(
            {
                memberID: acID
            }); //dayofff req
            const ViewRepReq = await ReplacementRequest.find(
            {
                memberID: FoundID
            }); //rep req
            const ViewSlorLinkReq = await Linkreq.find(
            {
                memberID: acID
            });
            const ViewLeaves = await LEAVES.find(
            {
                FoundID: LEAVES.StaffID
            });
            const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length + ViewLeaves.length;
            var ALLREQ = []; //han7ot feha kolo
            for (i = 0; i < ViewDAYOFF.length; i++)
            {
                if (ViewDAYOFF[i].status == "Accepted")
                {
                    ALLREQ.push(ViewDAYOFF[i]);
                }
            }
            for (i = 0; i < ViewRepReq.length; i++)
            {
                if (ViewRepReq[i].status == "Accepted")
                {
                    ALLREQ.push(ViewRepReq[i]);
                }
            }
            for (i = 0; i < ViewSlorLinkReq.length; i++)
            {
                if (ViewSlorLinkReq[i].status == "Accepted")
                {
                    ALLREQ.push(ViewSlorLinkReq[i]);
                }
            }
            for (i = 0; i < ViewLeaves.length; i++)
            {
                if (ViewLeaves[i].status == "Accepted")
                {
                    ALLREQ.push(ViewLeaves[i]);
                }
            }
            // console.log(ALLREQ) ;      
            res.send(ALLREQ);
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/viewPendingReq') //done  /written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //bta3 l ac member obj id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            const ViewDAYOFF = await Dayoffreq.find(
            {
                memberID: acID
            }); //dayofff req
            const ViewRepReq = await ReplacementRequest.find(
            {
                memberID: FoundID
            }); //rep req
            const ViewSlorLinkReq = await Linkreq.find(
            {
                memberID: acID
            }); //
            const ViewLeaves = await LEAVES.find(
            {
                FoundID: LEAVES.StaffID
            });
            const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length + ViewLeaves.length;

            var ALLREQ = []; //han7ot feha kolo
            for (i = 0; i < ViewDAYOFF.length; i++)
            {
                if (ViewDAYOFF[i].status == "Pending")
                {
                    ALLREQ.push(ViewDAYOFF[i]);
                }
            }
            for (i = 0; i < ViewRepReq.length; i++)
            {
                if (ViewRepReq[i].status == "Pending")
                {
                    ALLREQ.push(ViewRepReq[i]);
                }
            }
            for (i = 0; i < ViewSlorLinkReq.length; i++)
            {
                if (ViewSlorLinkReq[i].status == "Pending")
                {
                    ALLREQ.push(ViewSlorLinkReq[i]);
                }
            }
            for (i = 0; i < ViewLeaves.length; i++)
            {
                if (ViewLeaves[i].status == "Pending")
                {
                    ALLREQ.push(ViewLeaves[i]);
                }
            }
            // console.log(ALLREQ) ;      
            res.send(ALLREQ);
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/viewRejectedReq') //done /written //etf2o ala upper or lower case
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id; //bta3 l ac member obj id
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            const ViewDAYOFF = await Dayoffreq.find(
            {
                memberID: acID
            }); //dayofff req
            const ViewRepReq = await ReplacementRequest.find(
            {
                memberID: FoundID
            }); //rep req
            const ViewSlorLinkReq = await Linkreq.find(
            {
                memberID: acID
            });
            const ViewLeaves = await LEAVES.find(
            {
                FoundID: LEAVES.StaffID
            });
            const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length + ViewLeaves.length;

            var ALLREQ = []; //han7ot feha kolo
            for (i = 0; i < ViewDAYOFF.length; i++)
            {
                if (ViewDAYOFF[i].status == "rejected")
                {
                    ALLREQ.push(ViewDAYOFF[i]);
                }
            }
            for (i = 0; i < ViewRepReq.length; i++)
            {
                if (ViewRepReq[i].status == "rejected")
                {
                    ALLREQ.push(ViewRepReq[i]);
                }
            }
            for (i = 0; i < ViewSlorLinkReq.length; i++)
            {
                if (ViewSlorLinkReq[i].status == "rejected")
                {
                    ALLREQ.push(ViewSlorLinkReq[i]);
                }
            }
            for (i = 0; i < ViewLeaves.length; i++)
            {
                if (ViewLeaves[i].status == "rejected")
                {
                    ALLREQ.push(ViewLeaves[i]);
                }
            }
            res.send(ALLREQ);
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/cancelReq') //
    .delete(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            //get the memberID from the token
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            console.log(DecodeToken);
            const id = DecodeToken.id;
            if (!((id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const CurrentID = DecodeToken.id;
            const found = await member.findOne(
            {
                id: CurrentID
            });
            const FoundID = found._id;
            const acfound = await academicMember.findOne(
            {
                Memberid: FoundID
            });
            const acID = acfound._id;
            //get the type of requests he is willing to cancel from the body
            if (req.body.requestID.includes("SL"))
            {
                const slotrequest = await Linkreq.findOne(
                {
                    requestID: req.body.requestID
                });
                // console.log(slotrequest.memberID)
                if (slotrequest == null)
                {
                    return res.status(400).send("ID of the request is not found");
                }
                else if (acID != slotrequest.memberID)
                {
                    return res.status(400).send("you don't have a request of this ID");

                }
                else
                {
                    //if the request is still pending just delete the record   
                    //if the request got accepted but its day did not come reverse any taken action  

                    if (slotrequest.status == "Pending" || (slotrequest.status == "Accepted"))
                    {
                        await Linkreq.findOneAndDelete(
                        {
                            "requestID": req.body.requestID
                        });
                        res.send("Slot Link request deleted!")
                    }
                }
            }
            else if (req.body.requestID.includes("R"))
            {
                const Reprequest = await ReplacementRequest.findOne(
                {
                    requestID: req.body.requestID
                });

                // console.log(slotrequest.memberID)
                //          if(acID!=Reprequest.memberID){
                //              console.log(acID!=Reprequest.memberID)
                //             return res.status(400).send("you don't have a request of this ID");
                // } else
                if (Reprequest == null)
                {
                    return res.status(400).send("ID of the request is not found");
                }
                else
                {
                    //if the request is still pending just delete the record   
                    //if the request got accepted but its day did not come reverse any taken action   
                    const today = new Date();
                    const requestDay = Reprequest.requestedDay.getDate();
                    const requestMonth = Reprequest.requestedDay.getMonth();
                    const requestYear = Reprequest.requestedDay.getFullYear();
                    console.log(today.getDate())
                    if (Reprequest.status == "Pending" || (Reprequest.status == "Accepted" && (requestDay > today.getDate() && requestMonth >= today.getMonth() && requestYear >= today.getFullYear())))
                    {
                        await ReplacementRequest.findOneAndDelete(
                        {
                            "requestID": req.body.requestID
                        });
                        res.send("Replacement request deleted!")
                    }
                    else
                    {
                        return res.status(400).send("request date passed or rejected!");

                    }

                }
                if (req.body.requestID.includes("DayOff"))
                {
                    const DayOffrequest = await Dayoffreq.findOne(
                    {
                        requestID: req.body.requestID
                    });

                    // console.log(slotrequest.memberID)
                    //          if(acID!=Reprequest.memberID){
                    //              console.log(acID!=Reprequest.memberID)
                    //             return res.status(400).send("you don't have a request of this ID");
                    // } else
                    if (DayOffrequest == null)
                    {
                        return res.status(400).send("ID of the request is not found");
                    }
                    else
                    {
                        //if the request is still pending just delete the record   
                        //if the request got accepted but its day did not come reverse any taken action   
                        const today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        //    const requestDay=DayOffrequest.requestedDay.getDate();
                        //    const requestMonth=DayOffrequest.requestedDay.getMonth();
                        //    const requestYear=DayOffrequest.requestedDay.getFullYear();
                        console.log(today.getDate())
                        if (DayOffrequest.status == "Pending" || DayOffrequest.status == "Accepted")
                        {
                            await Dayoffreq.findOneAndDelete(
                            {
                                "requestID": req.body.requestID
                            });
                            res.send("DayOff request deleted!")
                        }
                        else
                        {
                            return res.status(400).send("Cannot delete request is rejected!");

                        }

                    }


                }
                else if (req.body.requestID.includes("An" || "Ac" || "C" || "M" || "S"))
                {
                    const LeaveRequest = await LEAVES.findOne(
                    {
                        requestID: req.body.requestID
                    });
                    //          if(acID!=Reprequest.memberID){
                    //              console.log(acID!=Reprequest.memberID)
                    //             return res.status(400).send("you don't have a request of this ID");
                    // } else
                    if (LeaveRequest == null)
                    {
                        return res.status(400).send("ID of the request is not found");
                    }
                    else
                    //if the request is still pending just delete the record   
                    //if the request got accepted but its day did not come reverse any taken action   
                    if (req.body.requestID.includes("Ac") && (LeaveRequest.status == "Pending" || LeaveRequest.status == "Accepted"))
                    {
                        await LEAVES.findOneAndDelete(
                        {
                            "requestID": req.body.requestID
                        });
                        return res.send("Accidental Leave Request deleted!")

                    }
                    else if (req.body.requestID.includes("An"))
                    {
                        //increment the missing days incase the request was accepted
                        //remove the extra slot from the member who accepted the compensation if any 
                        const today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        const requestDay = LeaveRequest.dateOfLeave.getDate();
                        const requestMonth = LeaveRequest.dateOfLeave.getMonth();
                        const requestYear = LeaveRequest.dateOfLeave.getFullYear();
                        if (LeaveRequest.status == "Pending" || (LeaveRequest.status == "Accepted" && (requestDay > today.getDate() && requestMonth >= today.getMonth() && requestYear >= today.getFullYear())))
                        {
                            await LEAVES.findOneAndDelete(
                            {
                                "requestID": req.body.requestID
                            });
                            return res.send("Annual Leave Request deleted!")
                        }
                        else
                        {
                            return res.send(" Annual Leave Request day passed or rejected!")
                        }
                    }
                    else if (req.body.requestID.includes("C"))
                    {
                        const today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        const requestDay = LeaveRequest.dateOfcompensation.getDate();
                        const requestMonth = LeaveRequest.dateOfcompensation.getMonth();
                        const requestYear = LeaveRequest.dateOfcompensation.getFullYear();
                        if (LeaveRequest.status == "Pending" || (LeaveRequest.status == "Accepted" && (requestDay > today.getDate() && requestMonth >= today.getMonth() && requestYear >= today.getFullYear())))
                        {
                            await LEAVES.findOneAndDelete(
                            {
                                "requestID": req.body.requestID
                            });
                            return res.send(" Compensation Leave Request deleted!")
                        }
                        else
                        {
                            return res.send(" Compensation Leave Request day passed or rejected!")
                        }

                    }
                    else if (req.body.requestID.includes("M"))
                    {
                        const today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        const requestDay = LeaveRequest.dateOfLeave.getDate();
                        const requestMonth = LeaveRequest.dateOfLeave.getMonth();
                        const requestYear = LeaveRequest.dateOfLeave.getFullYear();
                        if (LeaveRequest.status == "Pending" || (LeaveRequest.status == "Accepted" && (requestDay > today.getDate() && requestMonth >= today.getMonth() && requestYear >= today.getFullYear())))
                        {
                            await LEAVES.findOneAndDelete(
                            {
                                "requestID": req.body.requestID
                            });
                            return res.send(" Maternity Leave Request deleted!")
                        }
                        else
                        {
                            return res.send(" Maternity Leave  Request day passed or rejected!")
                        }
                    }
                    else if (req.body.requestID.includes("S"))
                    {
                        const today = new Date();
                        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                        const requestDay = LeaveRequest.dateOfLeave.getDate();
                        const requestMonth = LeaveRequest.dateOfLeave.getMonth();
                        const requestYear = LeaveRequest.dateOfLeave.getFullYear();
                        if (LeaveRequest.status == "Pending" || (LeaveRequest.status == "Accepted" && (requestDay > today.getDate() && requestMonth >= today.getMonth() && requestYear >= today.getFullYear())))
                        {
                            await LEAVES.findOneAndDelete(
                            {
                                "requestID": req.body.requestID
                            });
                            return res.send(" Sick Leave Request deleted!")
                        }
                        else
                        {
                            return res.send(" Sick Leave Request day passed or rejected!")
                        }
                    }
                }

            }


        }


        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });


AcademicMemberRouter.route('/AcceptReq')
    .post(async(req, res, next) =>
    {
        try
        {
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                //get the memberID from the token
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
                const CurrentID = DecodeToken.id;
                const found = await member.findOne(
                {
                    id: CurrentID
                });
                const FoundID = found._id;
                const acfound = await academicMember.findOne(
                {
                    Memberid: FoundID
                });
                var request = await ReplacementRequest.findOne(
                {
                    requestID: req.body.requestID
                })
                if (!request)
                {
                    return res.send("Request Doesnt Exist");
                }
                if (!request.requestedID.equals(acfound._id))
                {
                    return res.send("You are not the academic person requested.")
                }
                if (request.status != "Pending")
                {
                    return res.send("Request not in Pending state.")
                }
                request.status = "Accepted"
                request.save();
            }
        }
        catch
        {

        }
    });







module.exports = AcademicMemberRouter;