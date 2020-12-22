const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const validator = require('validator');
const academicMember = require('../models/academicMember');
const department = require('../models/department');
const member = require('../models/members');
const courses = require('../models/course');
const members = require('../models/members');
const slot = require('../models/slot');
const dayOffReq = require('../models/dayOffReq');
const location = require('../models/location');
const course = require('../models/course');
const Leaves = require('../models/Leaves');
const missing = require('../models/missing');
const DeletedToken = require("../models/DeletedTokens")

const HodRouter = express.Router();

HodRouter.use(bodyParser.json());
HodRouter.use(express.json())

HodRouter.route('/assignInstructor')
    .post(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            if(typeOf(req.body.id)=='String' || typeOf(req.body.code)=='String')
            const insID = req.body.id
            const c = req.body.code
            const ufound = await academicMember.findOne({ Memberid: found._id });
            const m = await members.findOne({ id: insID });
            if (m == null) {
                return res.status(401).send("User does not exist");
            }
            const a = await academicMember.findOne({ Memberid: m._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            if (a.department != ufound.department) {
                return res.status(401).send("The instructor is not in your department");
            }
            if (a.type == "academic member") {
                return res.status(401).send("The user is not an instructor");
            }
            //get the course instructor id from the body
            //get the course code from the body
            //verify that there is an instructor with this id
            //verify that there is a course with this code
            //assign this instructor to the course
            else {

                const co = await course.findOne({ code: c });
                if (co == null) {
                    return res.status(401).send("Course does not exist");
                }
                const courseId = await course.findOne({ code: c });
                const dep = await department.findOne({ name: ufound.department });
                var flag=false;
                for (i = 0; i < dep.courses.length; i++) {
                    if (dep.courses[i].equals(co._id)) {
                        flag =true;
                        courseId.instructors.push(a._id)
                        await courseId.save();
                        a.courses.push(courseId._id);
                        await a.save();
                        break;
                    }
                }
                if(flag == false)
                return res.status(401).send("This course is not in your department");
            }
            res.json("Instructor added successfully")
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/DeleteInstructor')
    .delete(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });

            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the course instructor id from the body
            //get the course code from the body
            //verify that there is an instructor with this id
            //verify that there is a course with this code
            //verify that this instructor is assigned to this course
            //delete this assignment
            else {
                if(typeOf(req.body.id)=="String" || typeOf(req.body.code)=="String"){
                const courseIns = req.body.id;
                const courseCode = req.body.code;
                const m = await members.findOne({ id: courseIns });
                if (m == null)
                    return res.status(401).send("This instructor does not exist");
                const c = await courses.findOne({ code: courseCode });
                if (c == null)
                    return res.status(401).send("This course does not exist");
                const a = await academicMember.findOne({ Memberid: m._id });
                if (a.type == "academic member")
                return res.status(401).send("The user is not an instructor");
                if (a.department != ufound.department)
                    return res.status(401).send("The instructor is not in your department");
                const d= await department.findOne({name:ufound.department},{courses:c._id});
                if(d==null)
                    return res.status(401).send("The course is not in your department");
                for (i = 0; i < c.instructors.length; i++) {
                    if (c.instructors[i].equals(a._id)) {
                        c.instructors.pop(c.instructors[i]);
                        a.courses.pop(c._id);
                        await a.save();
                        await c.save();
                    }
                    else {
                        return res.status(401).send("This instructor is not assigned to this course");
                    }
                }

                const s = await slot.find({ _id: a.schedule })
                for (i = 0; i < s.length; i++) {
                    if (s != null) {
                        if (s[i].memberID.equals(a._id) && s[i].course.equals(c._id)) {
                            s[i].memberID = null;
                            await s[i].save();
                            a.schedule.pop(s[i]._id);
                            await a.save()
                            c.numberOfSlotsAssigned--;
                            c.coverage = c.numberOfSlotsAssigned / c.numberOfSlotsNeeded;
                            await c.save();
                        }
                    }
                }
            }
        }
            res.json("instructor deleted successfully")
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });


HodRouter.route('/UpdateInstructor')
    .put(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the course instructor id from the body
            //get the course code from the body
            //verify that there is an instructor with this id
            //verify that there is a course with this code
            //verify that this instructor is assigned to this course
            //update this assignment
            else {
                if(typeOf(req.body.id)=='String' || typeOf(req.body.codeOld)== 'String' || typeOf(req.body.codeNew)== "String"){
                const courseIns = req.body.id;
                const courseCodeOld = req.body.codeOld;
                const courseCodeNew = req.body.codeNew;
                const m = await members.findOne({ id: courseIns });
                if (m == null)
                    return res.status(401).send("This instructor does not exist");
                const c = await courses.findOne({ code: courseCodeOld });
                if (c == null)
                    return res.status(401).send("The old course does not exist");
                const c1 = await courses.findOne({ code: courseCodeNew });
                if (c1 == null)
                    return res.status(401).send("The new course does not exist");
                const a = await academicMember.findOne({ Memberid: m._id })
                const dep = await department.findOne({ name: ufound.department }, { courses: courseCodeNew });
                const dep1 = await department.findOne({ name: ufound.department }, { courses: courseCodeOld });
                
                if (dep == null)
                    return res.status(401).send("The new course does not belong to your departmwnt");
                if (dep1 == null)
                    return res.status(401).send("The old course does not belong to your deparment");
                    
                if (a.department != ufound.department) {
                    return res.status(401).send("The instructor does not belong to your deparment");
                }
                // if(a == null)
                //      return res.status(401).send("The instructor is not assigned to the old course");
                // if(a2!=null){
                //     console.log(a2)
                //     console.log(a)
                //      return res.status(401).send("The instructor is already assigned to the new course");
                // }
                for (i = 0; i < a.courses.length; i++) {
                    if (a.courses[i].equals(c1._id)) {
                        return res.status(401).send("The instructor is already assigned to the new course")
                    }
                    if (!(a.courses[i].equals(c._id))) {
                        return res.status(401).send("The instructor is not assigned to the old course")
                    }

                }
                c.instructors.pop(a.Memberid);
                c1.instructors.push(a.Memberid);
                await c.save();
                await c1.save();
                a.courses.pop(c._id);
                a.courses.push(c1._id);
                await a.save();

                const s = await slot.find({ _id: a.schedule })
                for (i = 0; i < s.length; i++) {
                    if (s != null) {
                        if (s[i].memberID.equals(a._id) && s[i].course.equals(c._id)) {
                            s[i].memberID = null;
                            await s[i].save();
                            a.schedule.pop(s[i]._id);
                            await a.save()
                            c.numberOfSlotsAssigned--;
                            c.coverage = c.numberOfSlotsAssigned / c.numberOfSlotsNeeded;
                            await c.save();
                        }
                    }
                }

            }

            res.json("Instructor updated successfully")
        }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewMembersDep')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }


            //get the department
            //get all academic members profiles in this department
            else {
                const dep = ufound.department;
                const depmembers = await department.findOne({ name: dep });
                var TA;
                var TA1;
                var course = [];
                var c;
                var courseInstructor;
                var courseInstructor1;
                var allStaff = [];
                var loc;
                for (i = 0; i < depmembers.teachingAssistants.length; i++) {
                    TA = await academicMember.findOne({ _id: depmembers.teachingAssistants[i] });
                    TA1 = await members.findOne({ _id: TA.Memberid });
                    loc = await location.findOne({_id:TA1.officeLocation});
                    course = [];
                    for (j = 0; j < TA.courses.length; j++) {
                        c = await courses.findOne({ _id: TA.courses[j] });
                        course.push(c.code)
                    }
                    allStaff.push([TA1.name, TA1.id, TA1.email, course, TA.type, TA.faculty, TA.department,loc.name, TA.officeHourse, TA1.dayOff]);
                }
                for (i = 0; i < depmembers.instructors.length; i++) {
                    courseInstructor1 = await academicMember.findOne({ _id: depmembers.instructors[i] });
                    courseInstructor = await members.findOne({ _id: courseInstructor1.Memberid });
                    loc = await location.findOne({_id:courseInstructor.officeLocation});
                    course = [];
                    for (j = 0; j < courseInstructor1.courses.length; j++) {
                        c = await courses.findOne({ _id: courseInstructor1.courses[j] });
                        course.push(c.code)
                    }
                    allStaff.push([courseInstructor.name, courseInstructor.id, courseInstructor.email, course, courseInstructor1.type, courseInstructor1.faculty, courseInstructor1.department,loc.name, courseInstructor1.officeHourse, courseInstructor.dayOff]);
                }

                res.json(allStaff);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewMembers/:cID')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }

            //get the department
            //get the course from the params
            //get all academic members profiles in this department teaching this course
            else {
                const dep = ufound.department;
                //const depmembers=await department.findOne({name:dep});
                const courseID = req.params.cID;
                const c = await courses.findOne({ code: courseID });
                if (c == null)
                    return res.status(401).send("This course does not exist");
                if((await department.findOne({name:dep},{courses:c._id}))== null)   
                return res.status(401).send("This course is not in your department");
                var c1;
                var cTA;
                var ta;
                var ins;
                var ins1;
                var course = [];
                var All = [];
                var loc;
                for (i = 0; i < c.teachingAssistants.length; i++) {
                    ta = await academicMember.findOne({ _id: c.teachingAssistants[i] });
                   
                    if (ta != null) {
                        cTA = await members.findOne({ _id: ta.Memberid });
                        loc = await location.findOne({_id:cTA.officeLocation})
                        course = [];
                        for (j = 0; j < ta.courses.length; j++) {
                            c1 = await courses.findOne({ _id: ta.courses[j] });
                            course.push(c1.code)
                        }
                        All.push([cTA.name, cTA.id, cTA.email, course, ta.type, ta.faculty, ta.department, loc.name,ta.officeHourse, cTA.dayOff]);
                    }
                    //All.push([cTA.name,cTA.id,cTA.email,course,ta.type,ta.faculty,ta.department,ta.officeHourse]);
                }
                for (i = 0; i < c.instructors.length; i++) {
                    ins1 = await academicMember.findOne({ _id: c.instructors[i] });
                    if (ins1 != null) {
                        ins = await members.findOne({ _id: ins1.Memberid });
                        loc = await location.findOne({_id:ins.officeLocation});
                        course = [];
                       for (j = 0; j < ins1.courses.length; j++) {
                            c1 = await courses.findOne({ _id: ins1.courses[j] });
                            course.push(c1.code)
                        }
                        All.push([ins.name, ins.id, ins.email, course, ins1.type, ins1.faculty, ins1.department, loc.name,ins1.officeHourse, ins.dayOff]);
                    }
                }
                res.json(All);
            }

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewDaysOffAll')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }

            //get the department
            //get the day off col from the members table for all teachers of this department
            else {
                const dep = ufound.department;
                const depmembers = await department.findOne({ name: dep });
                var depTeachingAssistants = [];
                //var TAs=[];
                var TA;
                var staff;
                var depCourseInstructor = [];
                var courseInstructor = [];
                var courseInstructor1;
                var allStaff = [];
                for (i = 0; i < depmembers.teachingAssistants.length; i++) {
                    depTeachingAssistants.push(depmembers.teachingAssistants[i]);
                    TA = await academicMember.findOne({ _id: depTeachingAssistants[i] });
                    staff = await members.findOne({ _id: TA.Memberid });
                    //  TAs.push(TA);
                    allStaff.push([staff.name, staff.id, staff.dayOff]);
                }
                for (j = 0; j < depmembers.instructors.length; j++) {
                    depCourseInstructor.push(depmembers.instructors[j]);
                    courseInstructor1 = await academicMember.findOne({ _id: depCourseInstructor[j] });
                    staff = await members.findOne({ _id: courseInstructor1.Memberid });
                    courseInstructor.push(courseInstructor1);
                    allStaff.push([staff.name, staff.id, staff.dayOff]);
                }
                res.json(allStaff);
            }

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewDaysOff/:memID')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            if (mem == null) {
                return res.status(401).send("This user does not exist");
            }

            //get the department
            //verify that there is an academic member with this id
            //verify that this member is in the same department
            //get the day off of this member
                if (!req.params.memID.includes("ac")) {
                    return res.status(401).send("This user is not an academic staff");
                }

                const dep = ufound.department;
                const depmembers = await department.findOne({ name: dep });
                const mem = await members.findOne({ id: req.params.memID });

                var dayoff;
                
                    const amem = await academicMember.findOne({ Memberid: mem._id });
                    if (amem.department !== dep) {
                        return res.status(401).send("This user is not in your department");
                    }
                    else {
                        dayoff = mem.dayOff;
                    }
                res.json([mem.name, mem.id, dayoff]);
            }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });


HodRouter.route('/viewDayOffReq')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }

            //get the department
            //show all dayoff requests for members in this department
            else {
                const dep = ufound.department;
                const dayoffreq = await dayOffReq.find({})
                var a;
                var m;
                var all = [];
                for (i = 0; i < dayoffreq.length; i++) {
                    a = await academicMember.findOne({ _id: dayoffreq[i].memberID });
                    m = await members.findOne({ _id: a.Memberid });
                    if (a.department == dep) {
                        all.push([m.name, m.id, dayoffreq[i].requestID, dayoffreq[i].status, dayoffreq[i].requestedDay, dayoffreq[i].comment]);
                    }
                }
                res.json(all)
            }

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewLeaveReq')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the department
            //show all leave requests for members in this department
            const d = await department.findOne({ name: ufound.department });
            var l;
            var a;
            var m;
            var total = [];
            for (i = 0; i < d.teachingAssistants.length; i++) {
                a = await academicMember.findOne({ _id: d.teachingAssistants[i] });
                m = await members.findOne({ _id: a.Memberid });
                l = await Leaves.find({StaffID: m._id });
                for(j=0;j<l.length;j++){
                    if(l[j]!=null){
                    if (l[j].Leavetype == "Accidental") {
                        total.push([m.name, m.id, l[j].numberOfdays, l[j].status]);
                    }
                    if (l[j].Leavetype == "Annual") {
                        total.push([m.name, m.id, l[j].numberOfdays, l[j].status, l[j].dateOfLeave, l[j].AnnualBalance]);
                    }
                    if (l[j].Leavetype == "Compensation") {
                        total.push([m.name, m.id, l[j].dateOfabsence, l[j].status, l[j].dateOfcompensation, l.reason]);
                    }
                    if (l[j].Leavetype == "Maternity") {
                        total.push([m.name, m.id, l[j].document, l[j].status, l[j].dateOfLeave]);
                    }
                    if (l[j].Leavetype == "Sick") {
                        total.push([m.name, m.id, l[j].document, l[j].status, l[j].dateOfLeave, l[j].dateOfdocument]);
                    }
            }
        }
        }
            for (i = 0; i < d.instructors.length; i++) {
                a = await academicMember.findOne({ _id: d.instructors[i] });
                m = await members.findOne({ _id: a.Memberid });
                l = await Leaves.find({ StaffID: m._id });
                    for(j=0;j<l.length;j++){
                        if (l[j] != null) {
                    if (l[j].Leavetype == "Accidental") {
                        total.push([m.name, m.id, l[j].Leavetype, l[j].numberOfdays, l[j].status]);
                    }
                    if (l[j].Leavetype == "Annual") {
                        total.push([m.name, m.id, l[j].Leavetype, l[j].numberOfdays, l[j].status, l[j].dateOfLeave, l[j].AnnualBalance]);
                    }
                    if (l[j].Leavetype == "Compensation") {
                        total.push([m.name, m.id, l[j].Leavetype, l[j].dateOfabsence, l[j].status, l[j].dateOfcompensation, l[j].reason]);
                    }
                    if (l[j].Leavetype == "Maternity") {
                        total.push([m.name, m.id, l[j].Leavetype, l[j].document, l[j].status, l[j].dateOfLeave]);
                    }
                    if (l[j].Leavetype == "Sick") {
                        total.push([m.name, m.id, l[j].Leavetype, l[j].document, l[j].status, l[j].dateOfLeave, l[j].dateOfdocument]);
                    }
                }
            }
        }
            res.json(total);
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/acceptDayOffReq/:reqID')
    .put(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the department
            //verify that there is a request with this id
            //change the status to accepted
            //change the dayoff in the member profile
            else {
                const dep = ufound.department;
                const dayoffreq = await dayOffReq.findOne({ requestID: req.params.reqID });
                if (dayoffreq.requestID == null) {
                    return res.status(401).send("This request does not exist");
                }
                var u = await dayOffReq.findOneAndUpdate({ requestID: req.params.reqID }, { status: "Accepted" })
                var a = await academicMember.findOne({ _id: u.memberID });
                var m = await members.findOne({ _id: a.Memberid });
                if (a.department != dep) {
                    return res.status(401).send("This user is not in your department");
                }
                m.dayOff = dayoffreq.requestedDay;
                await m.save();
        
            res.json("Request changed successfully")
        }
    }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/acceptLeaveReq/:reqID')
    .put(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the department
            //verify that there is a request with this id
            //change the status to accepted
            //update the missing days accordingly
            const l1 = await Leaves.findOne({ requestID: req.params.reqID });
            if (l1 == null)
                return res.status(401).send("This request does not exist");
            const d = await department.findOne({ name: ufound.department });
            const m = await members.findOne({ _id: l1.StaffID });
            const miss = await missing.findOne({ Memberid: m._id });
            if (!(m.id.includes("ac")))
                return res.status(401).send("This request does not belong to an academic member");
            const a = await academicMember.findOne({ Memberid: m._id });
            if (a.department != ufound.department)
                return res.status(401).send("This request does not belong to your department");
            var total = [];
            console.log(l1)
            if (l1 != null) {
                l1.status = "Accepted";
                await l1.save();
                miss.missingDays = miss.missingDays - l1.numberOfdays;
                miss.remainingDays = miss.remainingDays - l1.numberOfdays;
                await miss.save();
                if(l1.LeaveType == "Annual"|| l1.LeaveType == "Accidental"){
                    l1.AnnualBalance-=l1.numberOfdays;
                    await l1.save();
                }
            }
            res.json("Request updated successfully");
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/rejectDayOffReq/:reqID')
    .put(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }
            //get the department
            //verify that there is a request with this id

            //change the status to rejected
            //get the comment from the body add the comment
            else {
                const dep = ufound.department;
                const dayoffreq = await dayOffReq.findOne({ requestID: req.params.reqID });
                if (dayoffreq == null)
                    return res.status(401).send("This request does not exist");
                // if (dayoffreq.requestID == null) {
                //     return res.status(401).send("This request does not exist");
                // }
                var a = await academicMember.findOne({ _id: dayoffreq.memberID });
                if (a.department != dep) {
                    return res.status(401).send("This user is not in your department");
                }
                if(typeOf(req.body.comment)){
                const comment = req.body.comment
                //var u= await dayOffReq.findOneAndUpdate({requestID: req.params.reqID}, {status:"rejected"})
                dayoffreq.status = "rejected";
                dayoffreq.comment = comment;
                await dayoffreq.save();


                }
                res.json(dayoffreq)
            
            }

        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/rejectLeaveReq/:reqID')
    .put(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");

            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if(ufound.type != "HeadOfDepartment"){
                return res.status(401).send("not authorized");
               }
            //get the department
            //verify that there is a request with this id
            //change the status to rejected
            //get the comment from the body add the comment
            const l1 = await Leaves.findOne({ requestID: req.params.reqID });
            if (l1 == null)
                return res.status(401).send("This request does not exist");
            const d = await department.findOne({ name: ufound.department });

            const m = await members.findOne({ _id: l1.StaffID });
            if (!(m.id.includes("ac")))
                return res.status(401).send("This request does not belong to an academic member");
            const a = await academicMember.findOne({ Memberid: m._id });
            if (a.department != ufound.department)
                return res.status(401).send("This request does not belong to your department");
            var total = [];

            if (l1 != null) {
                if (req.body.comment == null) {
                    return res.status(401).send("Please enter a comment");
                }
                if(typeOf(req.body.comment)=="String"){
                l1.status = "rejected";
                l1.HodComment = req.body.comment;
                await l1.save();
            }
        }
            res.json("Request updated successfully");
    }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

HodRouter.route('/viewCoverage')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }

            //get the department
            //show all coverages for all courses in this department
            else {
                const dep = ufound.department;
                const depmembers = await department.findOne({ name: dep });
                var depCourses = [];
                var co;
                var result = [];
                for (i = 0; i < depmembers.courses.length; i++) {
                    depCourses.push(depmembers.courses[i]);
                    co = await courses.findOne({ _id: depmembers.courses[i] })
                    if (co != null)
                        result.push([co.code, co.coverage]);
                }
                res.json(result);
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }

    });

HodRouter.route('/viewSlotAssignments/:cID')
    .get(async (req, res, next) => {
        //authenticate that this is a valid member
        //authorize that this is a Hod member
        try {
            const token = req.header('auth-token');
            const DecodeToken = jwt_decode(token);
            const currentid = DecodeToken.id;
            const found = await member.findOne({ id: currentid });
            const deletedtoken = await DeletedToken.findOne({token:token});
            if(deletedtoken){
                 res.send("Sorry you are logged out .")
             }
             const found = await member.findOne({ id: currentid });
             if( !found)
             return res.status(401).send("Not authenticated");
            const ufound = await academicMember.findOne({ Memberid: found._id });
            if (!currentid.includes("ac")) {
                return res.status(401).send("not authorized");
            }
            if (ufound.type != "HeadOfDepartment") {
                return res.status(401).send("not authorized");
            }

            //get the department
            //get the course from params
            //show all slots for this course (which accordingly show the academic members assigned)
            else {
                const c = await courses.findOne({ code: req.params.cID });
                if (c === null) {
                    return res.status(401).send("This course does not exist");
                }
                //const d = await department.findOne({name:ufound.department});

                // for(i=0;i<d.courses.length;i++){


                //     if(c._id !== d.courses[i]){
                //         return res.status(401).send("This course is not in your department");
                //     }
                // }
                var s;
                var c1;
                var c2;
                var loc;
                var all = [];
                for (i = 0; i < c.slots.length; i++) {
                    s = await slot.findOne({ _id: c.slots[i] });
                    if(s!=null){
                    c1 = await academicMember.findOne({ _id: s.memberID });
                    if (c1 != null) {
                        c2 = await members.findOne({ _id: c1.Memberid });
                        all.push([c2.name, c2.id,s.timing, loc.name, loc.type, s.type]);
                    }
                    else{
                    loc = await location.findOne({ _id: s.location });
                        all.push([null,null,s.timing, loc.name, loc.type, s.type]);
                }
            }
            }
                res.json(all)
            }
        }
        catch (error) {
            res.status(500).json({ error: error.message })
        }
    });

module.exports = HodRouter;