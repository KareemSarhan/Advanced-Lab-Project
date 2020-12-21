const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const academicMember = require('../models/academicMember')
const members = require('../models/members')
const course = require('../models/course')
const slots = require('../models/slot')
const locations = require('../models/location')
const AM = require('../models/academicMember');
var validator = require('validator');


const CourseInstRouter = express.Router();

CourseInstRouter.use(bodyParser.json());


//authenticate that this is a valid member
//authorize that this is a CI member
//get the course coverage of the courses assigned to him
CourseInstRouter.route('/viewCoverage')
    .get(async(req, res, next) =>
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
                res.send("not Authenticated")
                return;
            }
            if (id.includes('ac'))
            {
                const ac = await academicMember.findOne(
                {
                    Memberid: loggedMember._id
                })
                const acCourses = ac.courses
                const query = {
                    _id: acCourses
                }
                const options = {
                    _id: 0,
                    name: 1,
                    code: 1,
                    numberOfSlotsNeeded: 1,
                    numberOfSlotsAssigned: 1,
                    coverage: 1
                }
                var Courses = await course.find(query, options)
                res.json(
                {
                    Courses
                })
                return;

            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the slots assigned to this academic member
CourseInstRouter.route('/viewSlotAssignment')
    .get(async(req, res, next) =>
    {
        try
        {
            //ToDo : remake it using slots table only we populate bdl el 2rf da.


            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const loggedMember = await members.findOne(
            {
                id: id
            });
            if (!loggedMember)
            {
                res.send("not Authenticated")
                return;
            }
            if (id.includes('ac'))
            {
                const ac = await academicMember.findOne(
                {
                    Memberid: loggedMember._id
                })
                const acCourses = ac.courses
                var courses = await course.find(
                {
                    _id: acCourses
                })
                var AssigedSlots = [];
                for (let index = 0; index < courses.length; index++)
                {
                    Name = courses[index].name
                    slotids = courses[index].slots
                    const slotsquery = {
                        _id: slotids,
                        memberID: loggedMember._id
                    }
                    const slotsoptions = {
                        _id: 0,
                        type: 1,
                        timing: 1,
                        location: 1,

                    }
                    var Slots = await slots.find(slotsquery, slotsoptions).populate(
                    {
                        path: 'location',
                        select: '-_id name type capacity'
                    })
                    AssigedSlots.push(
                    {
                        Name,
                        Slots
                    })

                }
                res.json(
                {
                    AssigedSlots
                })
                return;


            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get all academic members assigned to this department
CourseInstRouter.route('/viewStaff')
    .get(async(req, res, next) =>
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
                const ac = await academicMember.findOne(
                {
                    Memberid: loggedMember._id
                })
                const acDep = ac.department
                const options = {
                    _id: 0,
                    Memberid: 1,
                    officeHourse: 1,
                    courses: 1,
                    type: 1,
                    faculty: 1,
                    department: 1,
                    schedule: 1
                }
                var inDepStaff = await academicMember.find(
                {
                    department: acDep
                }, options)
                var resStaff = []
                const locationoptions = {
                    _id: 0,
                    name: 1,
                    type: 1
                }
                for (let index = 0; index < inDepStaff.length; index++)
                {
                    var indepmem = await members.findOne(
                    {
                        _id: inDepStaff[index].Memberid
                    });
                    var officeLocation = await locations.findOne(
                    {
                        _id: indepmem.officeLocation
                    })
                    var memcourses = await course.find(
                    {
                        _id: inDepStaff[index].courses
                    },
                    {
                        _id: 0,
                        name: 1,
                        code: 1,
                        numberOfSlotsAssigned: 1,
                        numberOfSlotsNeeded: 1
                    })
                    resStaff.push(
                    {
                        name: indepmem.name,
                        Gender: indepmem.gender,
                        Memberid: indepmem.id,
                        Email: indepmem.email,
                        Postion: inDepStaff[index].type,
                        faculty: inDepStaff[index].faculty,
                        Department: inDepStaff[index].department,
                        Dayoff: indepmem.Dayoff,
                        officetype: officeLocation.type,
                        officename: officeLocation.name,
                        Courses: memcourses

                    })


                }
                res.json(
                {
                    "In Department Staff": resStaff
                })
                return;
            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get the course in this dep from params
//get all academic members assigned to this course
CourseInstRouter.route('/viewCourseStaff')
    .get(async(req, res, next) =>
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
                const CourseID = req.body.CourseID + "";
                console.log(CourseID)
                if (CourseID == null)
                {
                    res.send("CourseID is null");
                    return;
                }
                if (!validator.isMongoId(CourseID))
                {
                    res.send("CourseID is not a valid objectID");
                    return;
                }
                const ac = await academicMember.findOne(
                {
                    Memberid: loggedMember._id
                })
                const acDep = ac.department
                const options = {
                    _id: 0,
                    Memberid: 1,
                    officeHourse: 1,
                    courses: 1,
                    type: 1,
                    faculty: 1,
                    department: 1,
                    schedule: 1
                }
                var inDepStaff = await academicMember.find(
                {
                    department: acDep,
                    courses: CourseID
                }, options)
                var resStaff = []
                const locationoptions = {
                    _id: 0,
                    name: 1,
                    type: 1
                }
                for (let index = 0; index < inDepStaff.length; index++)
                {
                    var indepmem = await members.findOne(
                    {
                        _id: inDepStaff[index].Memberid
                    });
                    var officeLocation = await locations.findOne(
                    {
                        _id: indepmem.officeLocation
                    })
                    var memcourses = await course.find(
                    {
                        _id: inDepStaff[index].courses
                    },
                    {
                        _id: 0,
                        name: 1,
                        code: 1,
                        numberOfSlotsAssigned: 1,
                        numberOfSlotsNeeded: 1
                    })
                    resStaff.push(
                    {
                        name: indepmem.name,
                        Gender: indepmem.gender,
                        Memberid: indepmem.id,
                        Email: indepmem.email,
                        Postion: inDepStaff[index].type,
                        faculty: inDepStaff[index].faculty,
                        Department: inDepStaff[index].department,
                        Dayoff: indepmem.Dayoff,
                        officetype: officeLocation.type,
                        officename: officeLocation.name,
                        Courses: memcourses

                    })


                }
                res.json(
                {
                    "In Department Staff": resStaff
                })
                return;
            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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


//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get the course in this dep from params
//get all unassigned slots for the course given in the body
//assign the given member in the body to this slot
///  assig el member to course
CourseInstRouter.route('/assignMemToSlot')
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
                //shofo course inst wla la2a
                CourseID = req.body.CourseID;
                AcID = req.body.AcID;
                SlotID = req.body.SlotID;
                //check if el wad da bydy el course da
                const ac = await academicMember.findOne(
                {
                    _id: AcID,
                    courses: CourseID
                })
                if (!ac)
                {
                    res.send("This academic Member is not a part of this course");
                    return;
                }
                else
                {
                    //check low el slot de taba3 el course da
                    const accourse = await course.findOne(
                    {
                        _id: CourseID,
                        slots: SlotID
                    })
                    if (!accourse)
                    {
                        res.send("This Slot is not a part of this course");
                        return;
                    }
                    else
                    {
                        //check en el slot mesh assigned 
                        const acslot = await slots.findOne(
                            {
                                _id: SlotID,
                                course: CourseID
                            })
                            //console.log(acslot);
                        if (acslot == null)
                        {
                            res.send("Slot doesnt exist in this course")
                            return
                        }
                        if (acslot.memberID)
                        {
                            res.send("This Slot is already assigned");
                            return;
                        }
                        else
                        {
                            ac.schedule.push(acslot._id)
                            ac.save();
                            console.log("asdasdasdasdasdas");
                            acslot.memberID = ac.Memberid;
                            await acslot.save();
                            //console.log(accourse);

                            accourse.numberOfSlotsNeeded = accourse.slots.length;
                            accourse.numberOfSlotsAssigned = accourse.numberOfSlotsAssigned + 1;
                            accourse.coverage = accourse.numberOfSlotsAssigned / accourse.numberOfSlotsNeeded
                            await accourse.save();
                            res.send("Updated Slot , Academic member and Course Tables .");
                        }
                    }
                }

            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get the course in this dep from params
//get the slot assigned
CourseInstRouter.route('/unassignMemFromSlot')
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
                CourseID = req.body.CourseID;
                AcID = req.body.AcID;
                SlotID = req.body.SlotID;
                //check if el wad da bydy el course da
                const ac = await academicMember.findOne(
                {
                    _id: AcID,
                    courses: CourseID
                })
                if (!ac)
                {
                    res.send("This academic Member is not a part of this course");
                    return;
                }
                else
                {
                    //check low el slot de taba3 el course da
                    const accourse = await course.findOne(
                    {
                        _id: CourseID,
                        slots: SlotID
                    })
                    if (!accourse)
                    {
                        res.send("This Slot is not a part of this course");
                        return;
                    }
                    else
                    {
                        //check en el slot mesh assigned 
                        const acslot = await slots.findOne(
                            {
                                _id: SlotID,
                                course: CourseID
                            })
                            //console.log(acslot);
                        if (acslot.memberID)
                        {
                            res.send("This Slot is already assigned");
                            return;
                        }
                        else
                        {
                            //  console.log(acslot);
                            acslot.memberID = ac.Memberid;
                            await acslot.save();
                            //console.log(accourse);

                            accourse.numberOfSlotsNeeded = accourse.slots.length;
                            accourse.AssigedSlots = accourse.AssigedSlots + 1;
                            accourse.coverage = accourse.numberOfSlotsAssigned / accourse.numberOfSlotsNeeded
                            await accourse.save();
                            res.send("Updated Slot and Course Tables gamed awy.");
                        }
                    }
                }

            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get the course in this dep from params
//remove this member from the course teachers
//remove his name from course slots
//remove this course from the member's courses
//make the academic member null
CourseInstRouter.route('/removeMember')
    .delete(async(req, res, next) =>
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
                CourseID = req.body.CourseID;
                AcID = req.body.AcID;
                //check if el wad da bydy el course da
                const ac = await academicMember.findOne(
                {
                    _id: AcID,
                    courses: CourseID
                })
                if (!ac)
                {
                    res.send("This academic Member is not a part of this course");
                    return;
                }
                else
                {
                    const accourse = await course.findOne(
                    {
                        _id: CourseID,
                    })
                    if (!accourse)
                    {
                        res.send("Course doesnot exist.")
                        return;
                    }


                    // acadimic member
                    console.log("ablllllll" + ac);
                    ac.courses = ac.courses.filter(function(ele)
                    {
                        return ele != CourseID;
                    });
                    console.log("b3dddddd" + ac);
                    await ac.save();

                    //slots
                    const acslots = await slots.findOne(
                    {
                        course: CourseID,
                        memberID: AcID
                    })
                    console.log("ablllllll Slooots " + acslots);
                    slotscount = 0
                    if (acslots != null)
                    {
                        for (let index = 0; index < acslots.length; index++)
                        {
                            acslots[index].memberID = null;
                        }
                        console.log("b3dddddd" + acslots);
                        slotscount = acslots.length;
                        await acslots.save();
                    }
                    //sha8aaaaaaaaaaaaaaaaaal
                    //course
                    console.log("ablllllll courssesss  " + accourse);
                    accourse.courseCoordinator = accourse.courseCoordinator == AcID ? null : accourse.courseCoordinator;
                    //
                    accourse.instructors = accourse.instructors.filter(function(ele)
                    {
                        return ele != AcID;
                    });
                    accourse.teachingAssistants = accourse.teachingAssistants.filter(function(ele)
                    {
                        return ele != AcID;
                    });
                    accourse.numberOfSlotsAssigned = accourse.numberOfSlotsAssigned - slotscount;
                    accourse.coverage = accourse.numberOfSlotsAssigned / accourse.numberOfSlotsNeeded;
                    console.log("b3dddddd" + accourse);
                    await accourse.save();




                    res.send("removed course assigment from slots , courses, academic member tables");
                }

            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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

//authenticate that this is a valid member
//authorize that this is a CI member
//get the department of this member
//get the course in this dep from params
//get the mem id from body
//update the CC field of course to this member
//update the type of this member
CourseInstRouter.route('/assignCoordinator')
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
                CourseID = req.body.CourseID;
                AcID = req.body.AcID;
                //check if el wad da bydy el course da
                const ac = await academicMember.findOne(
                {
                    _id: AcID,
                    //sheel de low sa7
                    courses: CourseID
                })
                if (!ac)
                {
                    res.send("This academic Member is not a part of this course");
                    return;
                }
                else
                {
                    const accourse = await course.findOne(
                    {
                        _id: CourseID,
                    })
                    if (accourse.courseCoordinator == AcID)
                    {
                        res.json(
                        {
                            Msg: "This Instructor is already the Course instructor"
                        })
                        return;
                    }
                    accourse.courseCoordinator = AcID;
                    await accourse.save();
                    ac.type = "CourseCoordinator";
                    ac.save();
                    res.json(
                    {
                        Msg: "This Instructor is now the Course instructor"
                    })
                    return;
                }

            }
            else
            {
                res.send("This User isnt an academic member.")
                return;
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


module.exports = CourseInstRouter;