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
const location = require('../models/location')
const AM = require('../models/academicMember');
const { query } = require('express');

const CourseInstRouter = express.Router();

CourseInstRouter.use(bodyParser.json());

CourseInstRouter.route('/viewCoverage')
    .get(async(req, res, next) => {
        try {

            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })
                const acCourses = ac.courses
                const query = { _id: acCourses }
                const options = { _id: 0, name: 1, coverage: 1 }
                var courses = await course.find(query, options)
                res.json({
                    courses
                })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the course coverage of the courses assigned to him
    });

CourseInstRouter.route('/viewSlotAssignment')
    .get(async(req, res, next) => {
        try {
            //ToDo : remake it using slots table only .

            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })
                const acCourses = ac.courses
                var courses = await course.find({ _id: acCourses })
                var AssigedSlots = [];
                for (let index = 0; index < courses.length; index++) {
                    Name = courses[index].name
                    slotids = courses[index].slots
                    const query = { _id: slotids, memberID: existingUser._id }
                    const options = { _id: 0, type: 1, timing: 1 }
                    var Slots = await slots.find(query, options)
                    AssigedSlots.push({ Name, Slots })

                }
            }
            res.json({
                AssigedSlots
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }

        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the slots assigned to this course which also has the academic members assigned
    });

CourseInstRouter.route('/viewStaff')
    .get(async(req, res, next) => {
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })
                const acDep = ac.department
                const options = { _id: 0, Memberid: 1, officeHourse: 1, courses: 1, schedule: 1 }
                var inDepStaff = await academicMember.find({ department: acDep }, options)

            }
            res.json({
                inDepStaff
            })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get all academic members assigned to this department
    });

CourseInstRouter.route('/viewStaff/:cID')
    .get(async(req, res, next) => {
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })
                const acDep = ac.department
                const options = { _id: 0, Memberid: 1, officeHourse: 1, courses: 1, schedule: 1 }
                var inDepStaff = await academicMember.find({ department: acDep, courses: req.params.cID }, options)

                res.json({
                    inDepStaff
                })
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get all academic members assigned to this course
    });

CourseInstRouter.route('/assignMemToSlot')
    .put(async(req, res, next) => {
        const token = req.header('auth-token');
        const DecodeToken = jwt_decode(token);
        const id = DecodeToken.id;
        const existingUser = await members.findOne({ id: id });
        if (!existingUser) {
            res.send("not Authenticated")
        }
        if (id.includes('ac')) {
            academicMemID = req.body.academicMemberID;
            courseID = req.body.courseID;
            slotID = req.body.slotID;
            res.json({
                reqas: academicMemID
            })
            academicMem = academicMember.findOne({ _id: academicMemID })
            if (academicMember != null) {

                res.json({
                    academicMem
                })

            } else {
                res.json({
                    Msg: 'this member isnt an academic Member .'
                })
            }
        }

        // } catch (error) {
        //     res.status(500).json({ error: error.message })
        // }

        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get all unassigned slots for the course given in the body
        //assign the given member in the body to this slot
    });

CourseInstRouter.route('/deleteAssignment/:cID')
    .put(async(req, res, next) => {
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })

                res.json({})
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get the slot assigned
        //make the academic member null
    });

CourseInstRouter.route('/removeMember/:cID')
    .delete(async(req, res, next) => {
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })

                res.json({})
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //remove this member from the course teachers
        //remove his name from course slots
        //remove this course from the member's courses
    });

CourseInstRouter.route('/assignCoordinator/:cID')
    .put(async(req, res, next) => {
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const id = DecodeToken.id;
            const existingUser = await members.findOne({ id: id });
            if (!existingUser) {
                res.send("not Authenticated")
            }
            if (id.includes('ac')) {
                const ac = await academicMember.findOne({ Memberid: existingUser._id })

                res.json({})
            }
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get the mem id from body
        //update the CC field of course to this member
        //update the type of this member
    });

module.exports = CourseInstRouter;