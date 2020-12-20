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
const slot = require('../models/slot');
const Linkreq = require('../models/slotLinkReq');
const LEAVES = require('../models/Leaves');
const AccidentalLeaves = require('../models/AccidentalLeaves');

const AcademicMemberRouter = express.Router();
AcademicMemberRouter.use(bodyParser.json());

AcademicMemberRouter.route('/viewSchedule') //msh done  //written 
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                //akhadt l id
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
                const CurrentID = DecodeToken.id;
                const found = await member.findOne(
                {
                    id: CurrentID
                });
                const FoundID = found._id; //l fe members _id
                const acfound = await academicMember.findOne(
                {
                    Memberid: FoundID
                });
                // slot in the schedule 
                var scheduleslots = [];
                for (i = 0; i < acfound.schedule.length; i++)
                {
                    scheduleslots.push(acfound.schedule[i]);
                    const SlotID = scheduleslots[i];

                    const SchedSlot = await slot.findOne(
                    {
                        SlotID: slot._id,
                        memberID: FoundID
                    });
                    const LOCSChedSlot = SchedSlot.location;
                    console.log(LOCC);
                    const LOCC = await Loc.findOne(
                    {
                        _id: LOCSChedSlot.location
                    });

                    const LOCName = LOCC.name;

                    var actualSchedule = [];
                    //const foundSlot = await slots.find({ memberID: FoundID });
                    for (i = 0; i < foundSlot.length; i++)
                    {
                        actualSchedule.push([foundSlot[i].type, foundSlot[i].timing, actualOffice])
                    }
                    //check replacement models to add --->fen f mongo
                }
                res.send(actualSchedule);
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

AcademicMemberRouter.route('/viewReplacementReq') //done written
    .get(async(req, res, next) =>
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
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                    ALLREQ.push([REQ[i].requestID, REQ[i].requestedID, REQ[i].requestedDay, REQ[i].requestedSlot, REQ[i].status, REQ[i].comment]);
                }

                res.send(ALLREQ);
            }
            //hal kol l replacements wala l yekhoso l member da bs ??
        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendReplacementReq') // written  ¬¬ ezboti l date fn
    .post(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
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
                if (req.body.memberID == null)
                {
                    return res.status(400).send("your ID should be given!!");
                }
                else if (req.body.requestedID == null)
                {
                    return res.status(400).send("Please provide the member id to send request to!");
                }
                else if (req.body.requestedDay == null)
                {
                    return res.status(400).send("Please provide  the day!");
                }
                else if (req.body.requestedSlot == null)
                {
                    return res.status(400).send("Please provide which slot of the day!");
                }
                else
                {
                    //all data required are given
                    const reqDay = req.body.requestedDay;
                    const today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    //var date1=today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    if (reqDay < date)
                    {
                        return res.status(400).send("Cannot send request in a day passed!!");
                    }
                    else
                    {
                        //Akhiran make a new request
                        const ReplacementReq = new ReplacementRequest(
                        {
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

AcademicMemberRouter.route('/sendSlotLinkReq') //done written  ----> lw l member doesn't exist
    .post(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
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
                if (req.body.memberID == null)
                {
                    return res.status(400).send("your ID should be given!!");
                }
                else if (req.body.courseID == null)
                {
                    return res.status(400).send("The course you are assigned to should be given!!");
                }
                else if (req.body.requestedSlot == null)
                {
                    return res.status(400).send("Please enter the requested slot!!");
                }
                else
                {
                    //all data required are given 
                    //verfiy that this member is assigned to the course of this slot
                    const ac = await academicMember.findOne(
                    {
                        Memberid: FoundID,

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
                        Memberid: FoundID,
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
                    const LinkingRequest = new Linkreq(
                    {
                        requestID: req.body.requestID,
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
        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendChangeDayOffReq') //done written
    .post(async(req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a AM member
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
                const FoundID = found._id; //ac member ref member 
                const acfound = await academicMember.findOne(
                {
                    Memberid: FoundID
                });
                if (req.body.requestID == null)
                {
                    return res.status(400).send("Enter the requestID");
                }
                else if (req.body.memberID == null)
                {
                    return res.status(400).send("Please enter your ID!!");
                }
                else if (req.body.requestedDay == null)
                {
                    return res.status(400).send("Please enter The requested Day!!");
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
                            SlotID: slot._id
                        });
                        if (ActualSlot == null || !(ActualSlot.timing.includes(dayoff)))
                        {
                            //check if he left a comment which is optional
                            //create a new request in the dayOff table requests table
                            const DayoffReq = new Dayoffreq(
                            {
                                requestID: req.body.requestID,
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
        }

        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/sendLeaveReq')
    .post(async(req, res, next) =>
    {
        try
        {
            //     //authenticate that this is a valid member
            //    // authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                //       //get the memberID from the token
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                if (req.body.type == "Sick Leave")
                {


                }
            }
        }
        //get the desired type of leave from the body
        //get the required data according to the type of leave from the body
        //choose which leave table to add the request 
        //if this is a maternity leave check that the member is a female
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
    });

AcademicMemberRouter.route('/notification') //done -- written in doc
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
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
                const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length;
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

AcademicMemberRouter.route('/viewAllReq') //done --> zawedy ba2y l requets / written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length;
                var ALLREQ = []; //han7ot feha kolo
                for (i = 0; i < LLength; i++)
                {
                    ALLREQ.push(ViewDAYOFF[i], ViewRepReq[i], ViewSlorLinkReq[i]);

                }
                res.send(ALLREQ);
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

AcademicMemberRouter.route('/viewAcceptedReq') //done -->zawedy ba2y l requets / written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length;

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
                    if (ViewSlorLinkReq[i].status == "accepted")
                    {
                        ALLREQ.push(ViewSlorLinkReq[i]);
                    }
                }
                // console.log(ALLREQ) ;      
                res.send(ALLREQ);
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

AcademicMemberRouter.route('/viewPendingReq') //done-->zawedy ba2y l requets /written
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length;

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
                // console.log(ALLREQ) ;      
                res.send(ALLREQ);
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

AcademicMemberRouter.route('/viewRejectedReq') //done /written //etf2o ala upper or lower case, zawedy ba2y l requets 
    .get(async(req, res, next) =>
    {
        try
        {
            //authenticate that this is a valid member
            //authorize that this is a AM member
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                return res.status(401).send("not authorized");
            }
            else
            {
                const token = req.header('auth-token');
                const DecodeToken = jwt_decode(token);
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
                const LLength = ViewDAYOFF.length + ViewRepReq.length + ViewSlorLinkReq.length;

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
                // console.log(ALLREQ) ;      
                res.send(ALLREQ);
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

AcademicMemberRouter.route('/cancelReq/:type') //~~
    .delete(async(req, res, next) =>
    {
        // try{
        //     //authenticate that this is a valid member
        //         //authorize that this is a AM member
        //     const payload = jwt.verify(req.header('auth-token'), key);
        //     if (!((payload.id).includes("ac"))) {
        //         return res.status(401).send("not authorized");
        //     } else {
        //         //get the memberID from the token
        //         const token = req.header('auth-token');
        //         const DecodeToken = jwt_decode(token);
        //         const CurrentID = DecodeToken.id;
        //         const found = await member.findOne({ id: CurrentID });
        //         const FoundID = found._id;
        //         const acfound = await academicMember.findOne({ Memberid: FoundID });
        //          //get the type of requests he is willing to cancel from the body
        //                const reqType=req.params.type;
        //                if(fac.length == 0){
        //                 return res.status(400).send("name of faculty is not found");
        //             }
        //          //if the request is still pending just delete the record
        //          if(){

        //          }
        //     }       

        //if the request got accepted but its day did not come reverse any taken action
        // }catch (error) {
        //             res.status(500).json({ error: error.message })
        //         }
    });

module.exports = AcademicMemberRouter;