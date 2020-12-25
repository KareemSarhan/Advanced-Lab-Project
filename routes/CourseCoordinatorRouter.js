const express = require('express');
const
{
    timeStamp
} = require('console');
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
const academicMember = require('../models/academicMember')

const DeletedToken = require("../models/DeletedTokens")
const attendance = require("../models/attendance");
const Missings = require("../models/missing");
const courses = require("../models/course")
const course = require("../models/course")

const slotLinkReqs = require("../models/slotLinkReq");
const SlotLinkReqs = require("../models/slotLinkReq");
const slots = require("../models/slot")

const Slots = require("../models/slot")
const
{
    ObjectID
} = require('mongodb');
const slot = require('../models/slot');
const CourseCoordinatorRouter = express.Router();

CourseCoordinatorRouter.use(express.json());
CourseCoordinatorRouter.use(bodyParser.json());
CourseCoordinatorRouter.use(authenticate);

CourseCoordinatorRouter.route('/viewSlotLinkReq')
    .get(async(req, res, next) =>
    {
        try
        {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne(
            {
                id: id
            });
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            const existingAM = await AM.findOne(
            {
                Memberid: existingUser._id
            })
            const CCofCourse = await courses.findOne(
                {
                    courseCoordinator: existingAM._id
                })
                //  console.log(CCofCourse.name)
            const typeOfAM = existingAM.type;
            const SLslotsReq = await slotLinkReqs.find(
                {
                    courseID: CCofCourse._id
                })
                //console.log(typeOfAM)

            if (!existingUser)
            {
                res.send("Not authenticated .")
                return;
            }
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            if (!(typeOfAM == "CourseCoordinator"))
            {
                res.send("Not authorized .")
                return
            }
            if (!SLslotsReq)
            {
                res.send("No requests for this course .")
            }
            else
            {
                res.json(
                {
                    SLslotsReq

                });

            }


        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //get the course id 
        //view slot linking requests for this course
    });
CourseCoordinatorRouter.route('/AcceptSlotLinkReq')
    .put(async(req, res, next) =>
    {
        try
        {
            const payload = jwt.verify(req.header('auth-token'), key);
            if (!((payload.id).includes("ac")))
            {
                //console.log(payload.id);
                return res.status(401).send("not authorized");
            }
            else
            {
                const loggedMember = await members.findOne(
                {
                    id: payload.id
                })
                var LoggedAcm = await academicMember.findOne(
                {
                    Memberid: loggedMember._id,
                    type: "CourseCoordinator"
                })
                if (!LoggedAcm)
                {
                    return res.status(403).send("You are not a Course Coordinator.")
                }
                const RequestID = req.body.RequestID;
                if (!(typeof(RequestID) == "string"))
                {
                    return res.status(400).send("Input Type Error");
                }
                const Request = await SlotLinkReqs.findOne(
                {
                    requestID: RequestID,
                })
                if (!Request)
                {
                    return res.status(404).send("No Course Exists With This ID.")
                    return;
                }
                if (Request.status + "" != "Pending")
                {
                    return res.status(403).send("Request Is Not In Pending State.")
                }


                const CourseID = Request.courseID;
                var AcmCourse = await course.findOne(
                {
                    _id: CourseID
                })
                if (!AcmCourse)
                {
                    return res.status(404).send("No Course Exists With This ID.")
                }

                if (AcmCourse.courseCoordinator + "" != LoggedAcm._id + "")
                {
                    return res.status(403).send("You Are Not The Course Coordinator For This Course.")

                }

                AcID = Request.memberID;

                var Acm = await academicMember.findOne(
                {
                    _id: AcID
                })
                if (!Acm)
                {
                    return res.status(404).send("No Academic Member Exists With This ID.")
                }
                // if (Acm.type + "" === "HeadOfDepartment")
                // {
                //     return res.status(403).send("This Academic Member Is The Head Of Department.")
                // }
                // if (Acm.type + "" === "CourseInstructor")
                // {
                //     return res.status(403).send("This Academic Member Is A Course Instructor.")
                // }
                if (!Acm.courses.includes(CourseID + ""))
                {
                    console.log(Acm)
                    return res.status(403).send("This Academic Member Is Not Assigned To This Course.")
                }
                SlotID = Request.requestedSlot;
                var AcmSlot = await slots.findOne(
                {
                    _id: SlotID
                })
                if (!AcmSlot)
                {
                    return res.status(404).send("No Slot Exists With This ID.")
                }
                if (AcmSlot.course + "" != AcmCourse._id + "")
                {
                    return res.status(403).send("This Slot Is Not Related To This Course.")
                }
                if (AcmSlot.memberID)
                {
                    return res.status(403).send("This Slot Has Already Been Assigned To An Academic Member.")
                }

                Acm.schedule.push(AcmSlot._id);

                AcmCourse.numberOfSlotsAssigned = AcmCourse.numberOfSlotsAssigned + 1;
                AcmCourse.coverage = AcmCourse.numberOfSlotsAssigned / AcmCourse.numberOfSlotsNeeded;

                AcmSlot.memberID = Acm._id;

                Request.status = "Accepted"

                await Request.save();
                await AcmCourse.save();
                await AcmSlot.save();
                await Acm.save();

                res.send("Request Accepted, Acadmic member have been Assigned to this Slot.");
















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

CourseCoordinatorRouter.route('/rejectslotLinkReq')
    .put(async(req, res, next) =>
    {
        try
        {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne(
            {
                id: id
            });
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            const existingAM = await AM.findOne(
            {
                Memberid: existingUser._id
            })
            const TAid = req.body.id;
            const MemberTA = await members.findOne(
            {
                id: TAid
            })
            const TA_id = await AM.findOne(
                {
                    Memberid: MemberTA._id
                })
                //console.log(TA_id +"hiiii")


            if (!existingUser)
            {
                res.send("Not authenticated .")
                return;
            }
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            const typeOfAM = existingAM.type;
            if (!(typeOfAM == "CourseCoordinator"))
            {
                res.send("Not authorized .")
                return
            }
            if (!(TAid))
            {
                res.send("Please enter an Id for the acedmic member you want .")
                return
            }


            const CCofCourse = await courses.findOne(
                {
                    courseCoordinator: existingAM._id
                })
                // console.log(CCofCourse.name)
            const Wantedreq = await slotLinkReqs.find(
            {
                courseID: CCofCourse._id,
                memberid: TA_id._id
            })

            if (!Wantedreq)
            {
                res.send("No request with this id ")
            }
            //console.log(Wantedreq)


            else
            {
                slotLinkReqs.updateOne(
                {
                    memberID: TA_id._id,
                    courseID: CCofCourse._id
                },
                {
                    status: "Rejected"
                }, function(err, res)
                {
                    if (err) throw err;
                    console.log("document updated 1");
                });
                res.send("Data is updated.")

            }
        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
        }
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //verify that there is a req with this id
        //update the status to rejected
    });

CourseCoordinatorRouter.route('/addSlot')
    .post(async(req, res, next) =>
    {
        //authenticate that this is a valid member
        //authorize that this is a CC member
        const payload = jwt.verify(req.header('auth-token'), key);
        //console.log((payload.id).includes("ac"));
        if (!((payload.id).includes("ac")))
        {
            console.log(payload.id);
            return res.status(401).send("not authorized");
        }
        else
        {
            const m = await members.find(
            {
                "id": payload.id
            });
            if (m.length == 0)
            {
                return res.status(401).send("there is no member with this id");
            }
            else
            {
                var acMem = await AM.find(
                {
                    "Memberid": m[0]._id
                });
                if (acMem.length != 0)
                {
                    //console.log("here");
                    if (acMem[0].type != "CourseCoordinator")
                    {
                        return res.status(401).send("not authorized");
                    }
                    else
                    {
                        //authorized
                        //get slot details and verify that it is correct
                        if (req.body.type == null)
                        {
                            return res.status(400).send("type of slot should be given in body");
                        }
                        else if (req.body.location == null)
                        {
                            return res.status(400).send("location should be given in body");
                        }
                        else if (req.body.timing == null)
                        {
                            return res.status(400).send("timing of should be given in body");
                        }
                        else
                        {
                            //check that the location exists 
                            var l = await location.find(
                            {
                                "name": req.body.location
                            });
                            if (l.length == 0)
                            {
                                return res.status(400).send("there does not exist a location with this name");
                            }
                            else
                            {
                                //get the course id 
                                var c = await courses.find(
                                {
                                    "courseCoordinator": acMem[0]._id
                                });
                                if (c.length != 0)
                                {
                                    const s = new slot(
                                    {
                                        type: req.body.type,
                                        course: c[0]._id,
                                        location: l[0]._id,
                                        timing: req.body.timing
                                    });
                                    await s.save();
                                    console.log("slot created");
                                    //add this slot to the course slots
                                    var addedSlot = (await Slots.find(
                                    {
                                        $and: [
                                        {
                                            "location": l[0]._id
                                        },
                                        {
                                            "timing": req.body.timing
                                        }]
                                    }))[0];
                                    var courseSlots = c[0].slots;
                                    courseSlots.push(addedSlot._id);
                                    //update the course assigned slots and unassigned slots and slots
                                    var cAssignedSlots = c[0].numberOfSlotsNeeded + 1;
                                    //update the coverage
                                    var cov = (c[0].numberOfSlotsAssigned) / cAssignedSlots;
                                    await courses.findByIdAndUpdate(c[0]._id,
                                    {
                                        "slots": courseSlots,
                                        "numberOfSlotsNeeded": cAssignedSlots,
                                        "coverage": cov
                                    });
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
    .post(async(req, res, next) =>
    {
        try
        {
            const SlotMember = req.body.SlotMember
            const SlotTiming = req.body.SlotTiming

            const NewTiming = req.body.NewTiming
            const NewLocation = req.body.NewLocation //name

            const FindMem = await members.findOne(
                {
                    id: SlotMember
                })
                // console.log(FindMem + "hiiiiii") 
            const FindAM = await AM.findOne(
                {
                    Memberid: FindMem._id
                })
                // console.log(FindAM  + "helloo")


            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            const existingUser = await members.findOne(
            {
                id: id
            });
            //console.log(existingUser)
            const existingAM = await AM.findOne(
                {
                    Memberid: existingUser._id
                })
                // console.log(existingAM)
            const CCofCourse = await courses.findOne(
                {
                    courseCoordinator: existingAM._id
                })
                //console.log(CCofCourse +"embedded") 
            const getLocation = await location.findOne(
                {
                    name: NewLocation
                })
                // console.log(getLocation)
            const typeOfAM = existingAM.type;

            if (!(typeOfAM == "CourseCoordinator"))
            {
                res.send("Not authorized .")
                return
            }
            if (!existingUser)
            {
                res.send("Not authenticated .")
                return;
            }
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            if (!(SlotMember) || !(SlotTiming))
            {
                res.send('Please enter the required Data.')
                return
            }
            else
            {

                const WantedSlot = await slot.findOne(
                {
                    course: CCofCourse._id,
                    timing: SlotTiming,
                    memberID: FindAM._id
                });
                if (!WantedSlot)
                {
                    res.send("not found wanted slot ")
                    return
                }
                else
                {
                    if (NewTiming)
                    {
                        Slots.updateOne(
                        {
                            _id: WantedSlot._id
                        },
                        {
                            timing: NewTiming
                        }, function(err, res)
                        {
                            if (err) throw err;
                            console.log("document updated 1");
                        });
                    }
                    if ((NewLocation))
                    {
                        Slots.updateOne(
                        {
                            _id: WantedSlot._id
                        },
                        {
                            location: getLocation._id
                        }, function(err, res)
                        {
                            if (err) throw err;
                            console.log("document updated 1");
                        });
                    }
                    res.send("Data is updated.")
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
        //authenticate that this is a valid member
        //authorize that this is a CC member
        //get the course id and slot given
        //update the corresponding slot
    });

CourseCoordinatorRouter.route('/deleteSlot')
    .delete(async(req, res, next) =>
    {
        try
        {
            const SlotMember = req.body.SlotMember
            const SlotTiming = req.body.SlotTiming
                // console.log(SlotMember)
                // console.log(SlotTiming)


            const FindMem = await members.findOne(
                {
                    id: SlotMember
                })
                //console.log(FindMem)
            const FindAM = await AM.findOne(
            {
                Memberid: FindMem._id
            })
            console.log(FindAM)

            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const deletedtoken = await DeletedToken.findOne(
            {
                token: token
            });
            const existingUser = await members.findOne(
            {
                id: id
            });
            // console.log(existingUser)
            const existingAM = await AM.findOne(
                {
                    Memberid: existingUser._id
                })
                //  console.log(existingAM)
            const CCofCourse = await courses.findOne(
                {
                    courseCoordinator: existingAM._id
                })
                // console.log(CCofCourse)
            const typeOfAM = existingAM.type;

            if (!existingUser)
            {
                res.send("Not authenticated .")
                return;
            }
            if (deletedtoken)
            {
                res.send("Sorry you are logged out .")
                return
            }
            if (!(typeOfAM == "CourseCoordinator"))
            {
                res.send("Not authorized .")
                return
            }
            if (!SlotMember || !SlotTiming)
            {
                res.send("Please enter the required data .")
                return
            }

            else
            {
                console.log(CCofCourse._id)
                console.log(SlotTiming)
                console.log(FindAM._id)
                var WantedSlot = await slot.findOne(
                {
                    course: CCofCourse._id,
                    timing: SlotTiming,
                    memberID: FindAM._id
                });
                console.log(WantedSlot)
                if (!WantedSlot)
                {
                    res.send("Not found slot")
                    return
                }
                //console.log(WantedSlot._id)
                //console.log(wantedSlotID)
                const SchedualeOfTA = FindAM.schedule;
                for (i = 0; i < SchedualeOfTA.length; i++)
                {
                    //console.log("here 4")
                    if (SchedualeOfTA[i] == WantedSlot._id + "")
                    {
                        console.log("here 1 ")
                        SchedualeOfTA.splice(i, 1);
                    }
                }
                // console.log(SchedualeOfTA)
                const SlotsOfCourse = CCofCourse.slots
                    //console.log(CCofCourse.slots)
                for (i = 0; i < SlotsOfCourse.length; i++)
                {
                    //console.log("here 3")
                    if (SlotsOfCourse[i].equals(WantedSlot._id))
                    {
                        console.log("here 2")
                        SlotsOfCourse.splice(i, 1);
                    }

                }
                //console.log(SlotsOfCourse)
                const NewnumberOfSlotsNeeded = CCofCourse.numberOfSlotsNeeded - 1;
                //console.log(CCofCourse.numberOfSlotsNeeded)
                const NewnumberOfSlotsAssigned = CCofCourse.numberOfSlotsAssigned - 1
                    // console.log(CCofCourse.numberOfSlotsAssigned)

            }
            console.log(SlotsOfCourse)
            const NewnumberOfSlotsNeeded = CCofCourse.numberOfSlotsNeeded - 1;
            //console.log(CCofCourse.numberOfSlotsNeeded)
            const NewnumberOfSlotsAssigned = CCofCourse.numberOfSlotsAssigned - 1
                // console.log(CCofCourse.numberOfSlotsAssigned)

            const NewCoverage = NewnumberOfSlotsAssigned / NewnumberOfSlotsNeeded
                //console.log(NewCoverage)

            await courses.updateOne(
            {
                _id: CCofCourse._id
            },
            {
                numberOfSlotsNeeded: NewnumberOfSlotsNeeded,
                numberOfSlotsAssigned: NewnumberOfSlotsAssigned,
                coverage: NewCoverage,
                slots: SlotsOfCourse
            }, function(err, res)
            {
                if (err) throw err;
                // console.log("document updated 1");
            });
            await AM.updateOne(
            {
                _id: FindAM._id
            },
            {
                schedule: SchedualeOfTA
            }, function(err, res)
            {
                if (err) throw err;
                // console.log("document updated 1");
            });


            await Slots.findOneAndDelete(
                {
                    _id: WantedSlot._id
                })
                // console.log(SlotsOfCourse.length)
                //    console.log(SchedualeOfTA.length)
                //    console.log(SchedualeOfTA)


            res.send("Deleted slot.")

        }
        catch (error)
        {
            res.status(500).json(
            {
                error: error.message
            })
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