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
const location = require('../models/location')
const AM = require('../models/academicMember')

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
                var courses = await course.find({ _id: acCourses })
                var coverage = [];
                courses.forEach(course => {
                    name = course.name
                    coveragenum = course.coverage
                    coverage.push({ name, coveragenum })
                });
                res.json({
                    coverage
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
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the slots assigned to this course which also has the academic members assigned
    });

CourseInstRouter.route('/viewStaffInDep')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get all academic members assigned to this department
    });

CourseInstRouter.route('/viewStaff/:cID')
    .get((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get all academic members assigned to this course
    });

CourseInstRouter.route('/assignMemToSlot')
    .put((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get all unassigned slots for the course given in the body
        //assign the given member in the body to this slot
    });

CourseInstRouter.route('/deleteAssignment/:cID')
    .put((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get the slot assigned
        //make the academic member null
    });

CourseInstRouter.route('/removeMember/:cID')
    .delete((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //remove this member from the course teachers
        //remove his name from course slots
        //remove this course from the member's courses
    });

CourseInstRouter.route('/assignCoordinator/:cID')
    .put((req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a CI member
        //get the department of this member
        //get the course in this dep from params
        //get the mem id from body
        //update the CC field of course to this member
        //update the type of this member
    });

module.exports = CourseInstRouter;