const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
const faculty = require('../models/faculty');
const Location = require('../models/location.js');
const academicMember = require('../models/academicMember');
const { memberSchema, findById } = require('../models/members');
const members = require('../models/members');
const slot = require('../models/slot');
const department = require('../models/department');
const course = require('../models/course');
const attendance = require('../models/attendance');
const missing = require('../models/missing');

const HrRouter = express.Router();

HrRouter.use(bodyParser.json());
HrRouter.use(express.json());
HrRouter.use(authenticate);

HrRouter.route('/addLocation')
.post( async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of location should be given in body");
        }else if (req.body.capacity == null){
            return res.status(400).send("capacity of location should be given in body");
        }else if (req.body.type == null){
            return res.status(400).send("capacity of location should be given in body");
        }else{
            //all data required are given
            //verify that the capacity matches the type 
            //e.g if a lab or room capacity <= 25
            const cap = req.body.capacity;
            let maxCap = 0;
            if (req.body.type == "Lab" || req.body.type == "Room"){
                maxCap = 25;
            }else if (req.body.type == "Lecture Hall"){
                maxCap = 250;
            }else{
                //it is an office
                maxCap = 5;
            }
            if (cap > maxCap){
                return res.status(400).send("capacity of location exceeds limit");
            }else{
                //make a new location 
                const loc = new Location({
                    name: req.body.name,
                    capacity : req.body.capacity,
                    type: req.body.type
                });
                await loc.save();
                res.send("location added");
                console.log("Location added");
            }   
        }
    }
});

HrRouter.route('/deleteLocation/:name')
.delete(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a location with the name = id
        const loc = (await Location.find({"name": req.params.name}))[0];
      //  console.log(loc);
        if(loc.length == 0){
            return res.status(400).send("name of location is not found");
        }
        else{
             //delete the existing location with all slots in this location and offices
            if (loc.type == "office"){
                //make the office locations of academic members inside this office N/A
                const staff = await members.find({"officeLocation": loc._id});
                for (let i = 0 ; i < staff.length; i++){
                   await  members.findByIdAndUpdate(staff[i]._id, {"officeLocation": null});
                    //res.send("office is nullified");
                    console.log("office is nullified");
                }
            }else{
                 //make the slot locations N/A
                 //console.log(loc._id);

                 const s = await slot.find({"location": loc._id});
                 for (let j = 0 ; j < s.length; j++){
                     await slot.findByIdAndUpdate(s[j]._id, {"location": null});
                     //res.send("slot location is nullified");
                     console.log("slot location is nullified");
                 }
            }
            await Location.findOneAndDelete({"name": req.params.name});
            res.send("loc deleted");
        }  
    }
});

HrRouter.route('/updateLocation/:name')
.put( async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a location with the name = id
        const loc = await Location.find({"name": req.params.name});
        if(loc.length == 0){
            return res.status(400).send("name of location is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.capacity != null){
                 //check that the capacity is suitable
                 const cap = req.body.capacity;
                 let maxCap = 0;
                 if (loc.type == "Lab" || loc.type == "Room"){
                     maxCap = 25;
                 }else if (loc.type == "Lecture Hall"){
                     maxCap = 250;
                 }else{
                     //it is an office
                     maxCap = 5;
                 }
                 if (req.body.capacity > maxCap){
                    return res.status(400).send("this new capacity exceeds the max capacity of the location");
                 }else{
                       //update the existing location
                     await Location.findOneAndUpdate({"name": req.params.name}, {"capacity": req.body.capacity});
                     res.send("location capacity is updated")
                 }
             }
        }  
    }
});

HrRouter.route('/addFaculty')
.post(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of faculty should be given in body");
        }else{
            //all data required are given
            const n = await faculty.find({"name": req.body.name});
            if (n != 0){
                return res.status(400).send("there exists a faculty with this name");
            }else{
            //add a new faculty
                const f = new faculty({
                    name: req.body.name,
                    departments: [],
                    teachingAssistants:[],
                    instructors:[]
                });
               // console.log(f);
                await f.save();
                res.send("faculty added");
            }
        }       
    }
});

HrRouter.route('/updateFaculty/:name')
.put(async (req,res,next) =>{
 //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        console.log(req.params.name);
        //verify that there is a faculty with the name = :name
        const fac = await faculty.find({"name": req.params.name});
        console.log(fac);
        if(fac.length == 0){
            return res.status(400).send("name of faculty is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.number != null){
                    //update the existing faculty
                     await faculty.findOneAndUpdate({"name": req.params.name}, {"numberOfYears": req.body.number});
                     res.send("faculty number of years is updated")
             }
        }
    }
});

HrRouter.route('/deleteFaculty/:name')
.delete(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a faculty with the name = :name
        const fac = await faculty.find({"name": req.params.name});
        if(fac.length == 0){
            return res.status(400).send("name of faculty is not found");
        }
        else{
            //delete the existing faculty and handle academic members
            const m = await academicMember.find({"faculty": req.params.name});
            for (let i = 0 ; i < m.length; i++){
                await academicMember.findByIdAndUpdate(m[i]._id, {"faculty": "N/A"});
            }
            const d = await department.find({"facultyName": req.params.name});
            for (let j = 0 ; j < d.length; j++){
                await department.findByIdAndUpdate(d[j]._id, {"facultyName": "N/A"});
            }
            await faculty.findOneAndDelete({"name": req.params.name});
            res.send("faculty deleted ,faculty name at corresponding department is removed ,faculty name for corresponding academic members is removed" );
        }   
    }
});

HrRouter.route('/addDepartment')
.post(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of department should be given in body");
        }else if (req.body.faculty == null){
            return res.status(400).send("name of faculty should be given in body");
        }else if (req.body.headOfDepartment == null){
            return res.status(400).send("name of head of department should be given in body");
        }else{
            //all data required are given
             //make sure this department does not exist in other faculties
             const otherDep = (await department.find({"name": req.body.name}));
             if (otherDep.length != 0){
                 return res.status(400).send("there exists a department with this name");
             }else{
                let c = "";
                if (req.body.code != null){
                    c = req.body.code;
                }
                let f = null;
                const fa = (await faculty.find({"name": req.body.faculty}));
                if(fa.length == 0){
                    return res.status(400).send("there does not exist a faculty with this name");
                }else{
                    f = fa[0];
                    const h1 = (await members.find({"id" : {$in:[req.body.headOfDepartment]}}))[0];
                
                    if(!h1){
                        return res.status(400).send("there does not exist an instructor with this id");
                    }
                    else{
                        const h = (await academicMember.find({"Memberid": h1._id}))[0]
                        const d = new department({
                            name: req.body.name,
                            code: c,
                            facultyName: req.body.faculty,
                            headOfDep: h._id
                        });
                        //add a new department to this faculty
                        await d.save();
                        console.log("dep added");
                        const dN = (await department.find({"name": req.body.name}))[0];
                        //console.log(dN);
                        
                        let x = [];
                        x = f.departments;
                        x.push(dN._id);
                        //console.log(x);
                        await faculty.findByIdAndUpdate(f._id, {"departments" : x});
                        console.log("dep added to faculty");
                        res.send("department added");
                        }
                    }
                }
            }
        }      
});

HrRouter.route('/updateDepartment/:name')
.put( async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //console.log(req.params.name);
        //verify that there is a department with the name = :name
        const dep = await department.find({"name": req.params.name});
        //console.log(fac);
        if(dep.length == 0){
            return res.status(400).send("name of department is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.code != null){
                    //update the existing faculty
                     await department.findOneAndUpdate({"name": req.params.name}, {"code": req.body.code});
                     console.log("code updated");
             }
             if (req.body.headOfDepartment != null){
                const h1 = (await members.find({"id" : {$in:[req.body.headOfDepartment]}}))[0];
                if (h1){
                    //console.log(h1);
                    const h = (await academicMember.find({"Memberid": h1._id}))[0];
                    //console.log(dep);
                    if (h.faculty == dep[0].facultyName){
                        //console.log(h.faculty);
                        //the proposed head is of the same faculty
                        const prevHead = ((await department.find({"name": req.params.name}))[0]).headOfDep;
                        //console.log(prevHead);
                        //return the previous head back to being a course instructor
                        await academicMember.findByIdAndUpdate(prevHead, {"type": "CourseInstructor"});
                        console.log("prev head updated");
                        await academicMember.findByIdAndUpdate(h._id, {"type": "HeadOfDepartment"});
                        console.log("new head updated");
                        await department.findOneAndUpdate({"name": req.params.name}, {"headOfDep": h._id});
                        console.log("new head assigned to department");
                    }
                    else{
                        return res.status(400).send("this academic member does not belong to the same faculty");
                    }
                }else{
                    return res.status(400).send("there is no academic member of this id");
                }
             }
             res.send("department updated");
        }  
    }
});

HrRouter.route('/deleteDepartment/:name')
.delete(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a department with the name = :name
        const dep = await department.find({"name": req.params.name});
        if(dep.length == 0){
            return res.status(400).send("name of department is not found");
        }
        else{
            //delete the existing department 
            //update the academic members table by removing the HOD field of the corresponding head
            const m = await academicMember.find({"department": req.params.name});
            for (let i = 0 ; i < m.length; i++){
                await academicMember.findByIdAndUpdate(m[i]._id, {"department": "N/A" });
            }
            const head = dep[0].headOfDep;
            await academicMember.findByIdAndUpdate(head, {"type": "CourseInstructor"});
            const f = await faculty.find({"name": dep[0].facultyName});
            const fd = f[0].departments;
            for (let j = 0 ; j < fd.length; j++){
                if (fd[j] == dep[0]._id +""){
                    fd.splice(j,1);
                }
            }
            console.log(f[0]);
            console.log(fd);
            await faculty.findByIdAndUpdate(f[0]._id, {"departments": fd});
            await department.findOneAndDelete({"name": req.params.name});
            res.send("department deleted ,faculty of this department no longer includes this department ,department name for corresponding academic members is removed" );
        }  
    }   
});

HrRouter.route('/addCourse')
.post(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of course should be given in body");
        }else if (req.body.code == null){
            return res.status(400).send("course  code should be given in body");
        }else if (req.body.numberOfSlotsNeeded == null){
            return res.status(400).send("name of head of department should be given in body");
        }else if (req.body.creditHours == null){
            return res.status(400).send("credit hours of course should be given in body");
        }else if (req.body.department== null){
            return res.status(400).send("name of department should be given in body");
        }else{
            //all data required are given
            //verify that the department exist
            //console.log(req.body.department);
             const dep = (await department.find({"name": req.body.department}));
            if (dep.length == 0){
                return res.status(400).send("there does not exist a department with this name");
            }else{
                //check that there does not exist a course with this name or code
                const otherC = await course.find({$or:[{"name": req.body.name}, {"code": req.body.code}]});
                if (otherC.length != 0){
                    return res.status(400).send("there exists a course with this name and/or code");
                }else{
                    const cour = new course({
                    name: req.body.name,
                    code: req.body.code,
                    numberOfSlotsNeeded: req.body.numberOfSlotsNeeded,
                    slots: [],
                    coverage: 0,
                    teachingAssistants: [],
                    instructors: [],
                    courseCoordinator: null,
                    creditHours: req.body.creditHours
                });
                //add a new course
                await cour.save();
                console.log("course added");
                //add the new course to this department
                const nC = (await course.find({"name": req.body.name}))[0];
                coursesInDep = dep[0].courses;
                coursesInDep.push(nC._id);
                await department.findByIdAndUpdate(dep[0]._id, {"courses" : coursesInDep});
                console.log("course added to department");
                res.send("course added to department");
                }
            }
        }       
    }    
});

HrRouter.route('/updateCourse/:name')
.put(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //console.log(req.params.name);
        //verify that there is a course with the name = :name
        const cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.creditHours != null){
                    //update the existing course
                     await course.findOneAndUpdate({"name": req.params.name}, {"creditHours": req.body.creditHours});
                     //res.send("course credit hours is updated")
             }
             if (req.body.numberOfSlotsNeeded != null){
                //update the existing course
                 await course.findOneAndUpdate({"name": req.params.name}, {"numberOfSlotsNeeded": req.body.numberOfSlotsNeeded});
                 //res.send("course number of needed slots is updated")
         }
         res.send("course updated");
        }
    }
});

HrRouter.route('/deleteCourse/:name')
.delete(async(req,res,next) =>{
     //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a department with the name = :name
        const cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
            //get the department from the body
            if (req.body.department == null){
                return res.status(400).send("name of department should be given in the body");
            }else{
                //check if there exists a department with this name
                const dep = await department.find({"name": req.body.department});
                if (dep.length == 0){
                    return res.status(400).send("name of department is not found");
                }else{
                    //delete the slots with this course
                    const s = await slot.find({});
                    //console.log(s);
                    for (let i = 0 ; i < s.length ; i++){
                        if (s[i].course == cour._id + ""){
                            //console.log(s[i]);
                            const teacher = s[i].memberid;
                            const corTeacher = await academicMember.findById(teacher);
                            const sched = corTeacher.schedule;
                            for (let q = 0 ; q < sched.length; q++){
                                if (sched[q]._id == s[i]._id + ""){
                                    sched.splice(q,1);
                                }
                            }
                            await academicMember.findByIdAndUpdate(teacher, {"schedule": sched});
                            console.log("slot deleted from member schedule");
                            await slot.findByIdAndDelete(s[i]._id);
                            console.log("slot deleted");
                        }  
                    }
                    //delete the course from academic members and make the coordinator back to academic member
                    const coordinator = cour.courseCoordinator;
                    const m = await academicMember.find({});
                    for (let j = 0 ; j < m.length ; j++){
                        const mC = m[j].courses;
                        for (let z = 0 ; z < mC.length; z++){
                            if (mC._id == cour._id + ""){
                                mC.splice(z,1);
                            }
                        }
                        await academicMember.findByIdAndUpdate(m[j]._id, {"courses": mC});
                        console.log("course removed from academic member");
                    }
                    await academicMember.findByIdAndUpdate(coordinator, {"type": "academic member"});
                    console.log("course coordinator back to academic member");
                    //delete the course from department
                    const dC = dep[0].courses;
                    for (let w = 0 ; w < dC.length ; w++){
                        if (dC._id == cour._id + ""){
                            dC.splice(w,1);
                        }
                    }
                    await department.findByIdAndUpdate(dep._id, {"courses": dC});
                    console.log("course removed from department");
                    await course.findByIdAndDelete(cour[0]._id);
                    res.send("course deleted");
                }
            }
        }  
    }   
});

HrRouter.route('/addStaffMember')
.post(async (req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null){
            return res.status(400).send("name of member should be given in body");
        }else if (req.body.type == null){
            return res.status(400).send("type of member (whether academic or HR) should be given in body");
        }else if (req.body.email== null){
            return res.status(400).send("email of member should be given in body");
        }else if (req.body.salary == null){
            return res.status(400).send("salary of member should be given in body");
        }else if (req.body.officeLocation== null){
            return res.status(400).send("office location should be given in body");
        }else{
            //check if the office is full
            const office = await Location.find({"name": req.body.officeLocation});
            if (office.length == 0){
                return res.status(400).send("there does not exist an office with this name");
            }else if(office[0].type != "office"){
                return res.status(400).send("this location is not an office with this name");
            }else if (office[0].capacitySoFar > office[0].capacity){
                return res.status(400).send("this office is full");
            }else{
                let flagAc = false;
                let phoneNumber = "";
                let SecondayMail = "";
                let gender = "";
                if (req.body.phoneNumber != null){
                    phoneNumber = req.body.phoneNumber;
                }
                if (req.body.SecondayMail != null){
                    SecondayMail = req.body.SecondayMail;
                }
                if (req.body.gender != null){
                    gender = req.body.gender;
                }
                //check the type academic or HR
                let assignedOffice = office[0]._id;
                let nID = 0;
                let dOff = "";
                if (req.body.type == "HR"){
                    //get the last id available and increment it by 1
                    const ids = await members.find({ "id": { $regex: 'hr'}});
                    console.log(ids);
                    const maxID = ids[ids.length - 1];
                    console.log(maxID);
                    const toBeParsed = maxID.id.substring(3);
                    const iID = parseInt(toBeParsed);
                    nID = iID + 1;
                    dOff = "Saturday"
                }else{
                    // this is an academic member
                    if (req.body.faculty == null){
                        return res.status(400).send("faculty should be given in body");
                    }else if(req.body.department == null){
                        return res.status(400).send("department should be given in body");
                    }else if (req.body.dayOff == null){
                        return res.status(400).send("dayOff of academic member should be given in body");
                    } else if (req.body.academicType== null){
                        return res.status(400).send("type of academic member should be given in body");
                    }else{
                        const fac = await faculty.find({"name": req.body.faculty});
                        const dep1 = await department.find({"name": req.body.department}); 
                        if (fac.length == 0 || dep1.length == 0){
                            return res.status(400).send("there does not exist a faculty and/or a department with this name");
                        }else{
                            flagAc = true;
                            dOff = req.body.dayOff;
                            //get the last id available and increment it by 1
                            const ids = await members.find({ "id": { $regex: 'ac'}});
                            console.log(ids);
                            const maxID = ids[ids.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.id.substring(3);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;  
                        }   
                    }
                }
                //try and catch if email is not unique
                //put this member to the corresponding table(academic/hr)
                var assignedID = "";
                if (flagAc){
                    assignedID = "ac-" + nID + "";
                }else{
                    assignedID = "hr-" + nID + "";
                }
                console.log(assignedID);
                const salt = await bcrypt.genSalt(12); //if the number is increased the complexity of salting increases
                const hashedPassword = await bcrypt.hash("123456", salt); //this operation also takes time
        
                const m = new members({
                    name: req.body.name,
                    id: assignedID,
                    password: hashedPassword,
                    email: req.body.email,
                    officeLocation: assignedOffice,
                    salary: req.body.salary,
                    phoneNumber: phoneNumber,
                    SecondayMail: SecondayMail,
                    gender: gender
                });
                try{
                    await m.save();
                    console.log("member added to members table");
                    const nCapacity = office[0].capacitySoFar += 1;
                    await Location.findOneAndUpdate({"name": req.body.officeLocation}, {"capacitySoFar": nCapacity});
                    console.log("number of members in office is incremented by 1");
                }catch(err){
                    console.log(err);
                    return res.status(400).send("email already exists");
                }
                if (flagAc){
                    var dep = await department.find({"name": req.body.department}); 
                    var acMemID = (await members.find({"id": assignedID}))[0];
                    const am = new academicMember({
                        Memberid: acMemID._id,
                        schedule: [],
                        type: req.body.academicType,
                        courses: [],
                        faculty: req.body.faculty,
                        department: req.body.department,
                        officeHourse: ""
                    });
                    await am.save();
                    console.log("member added to academic members table");
                    //add this member to the corresponding department
                    var acID = await academicMember.find({"Memberid": acMemID._id});
                    let oldMem = [];
                    if (req.body.academicType == "CourseInstructor"){
                        oldMem = dep[0].instructors;
                        oldMem.push(acID[0]._id);
                        await department.findOneAndUpdate({"name":req.body.department}, {"instructors": oldMem});
                        console.log("academic member added to instructors of this department");
                    }else{
                        //an academic member
                        oldMem = dep[0].teachingAssistants;
                        oldMem.push(acID[0]._id);
                        await department.findOneAndUpdate({"name":req.body.department}, {"teachingAssistants": oldMem});
                        console.log("academic member added to teaching assistants of this department");
                    }
                }
            }
            res.send("member added");
        }       
    }    
});

HrRouter.route('/updateStaffMember/:id')
.put(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a member with the id = :id
        var mem = await members.find({"id": req.params.id});
        if(mem.length == 0){
            return res.status(400).send("member is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.officeLocation != null){
                    //update the existing office location for the member
                    //decrement the previous location capacity so far
                    //increment the new location capacity so far
                    var nextO = (await Location.find({"name": req.body.officeLocation}));
                    if (nextO.length == 0){
                        return res.status(400).send("office is not found");
                    }else{
                    const prevOid = mem[0].officeLocation;
                    console.log(mem[0].officeLocation);
                    const oldC = (await Location.findById(prevOid)).capacitySoFar;
                    const nC = oldC - 1;
                    await Location.findByIdAndUpdate(prevOid, {"capacitySoFar": nC});
                    console.log("old office capacity decremented");
                    const nextC = nextO[0].capacitySoFar + 1;
                    await Location.findByIdAndUpdate(nextO[0]._id, {"capacitySoFar": nextC});
                    console.log("new office capacity so far is incremented");
                    //update this member
                    await members.findOneAndUpdate({"id": req.params.id}, {"officeLocation": nextO[0]._id});
                    console.log("member office updated");
                    }
             }
             res.send("staff member updated");
        }  
    }
});

HrRouter.route('/deleteStaffMember/:id')
.delete(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a member with the id = :id
        var mem = await members.find({"id": req.params.id});
        if(mem.length == 0){
            return res.status(400).send("member is not found");
        }
        else{
            //get the office location from the member
            var office = mem[0].officeLocation;
            if (office != null){
                 //decrement the officelocation by 1
                var oldO = (await Location.findById(office))
                var oldC = oldO.capacitySoFar;
                var nC = oldC + 1;
                await Location.findByIdAndUpdate(office, {"capacitySoFar": nC});
                console.log("office capacity so far is decremented by 1");
            }
            if ((req.params.id).includes("ac")){
                // this is an academic member
                // check if it a course coordinator or head of department and nullify the corresponding fields
                var acMem = (await academicMember.find({"Memberid": mem[0]._id}))[0];
                var acType = acMem.type;
                var dep = acMem.department;
                var fac = acMem.faculty;
                var s = acMem.schedule;
                var c = acMem.courses;
                //remove this member from the department's array of instructors or teaching assistants
                //remove this member from the faculty's array of instructors or teaching assistants
                //remove this member from the course's array of instructors or teaching assistants
                var actualDep = (await department.find({"name": dep}))[0];
                var actualFac = (await faculty.find({"name": fac}))[0];
                if (acType == "CourseInstructor" || acType == "HeadOfDepartment"){
                    var depIns = actualDep.instructors;
                    for (let i = 0 ; i < depIns.length; i++){
                        if (depIns[i] == acMem._id + ""){
                            depIns.splice(i,1);
                            break;
                        }
                    }
                    var facIns = actualFac.instructors;
                    for (let j = 0 ; j < facIns.length; j++){
                        if (facIns[j] == acMem._id + ""){
                            facIns.splice(j,1);
                            break;
                        }
                    }
                    await department.findByIdAndUpdate(actualDep._id, {"instructors": depIns});
                    console.log("member removed from department's instructors");
                    await faculty.findByIdAndUpdate(actualFac._id, {"instructors": facIns});
                    console.log("member removed from faculty's instructors");
                    for (let q = 0 ; q < c.length; q++){
                        var actualC = (await course.findById(c[q]));
                        var actualCIns = actualC.instructors;
                        for (let e = 0; e < actualCIns.length; e++){
                            if (actualCIns[e] == acMem._id + ""){
                                actualCIns.splice(e,1);
                                break;
                            }
                        }
                        await course.findByIdAndUpdate(actualC._id, {"instructors": actualIns});
                        console.log("member removed from course's instructors");
                    }
                    if (acType == "HeadOfDepartment"){
                        await department.findByIdAndUpdate(actualDep._id, {"headOfDep": "N/A"});
                        console.log("member removed from being head of his department");
                    }
                }else if(acType == "CourseCoordinator" || acType == "academic member"){
                    var depTas = actualDep.teachingAssistants;
                    for (let x = 0 ; x < depTas.length; x++){
                        if (depTas[x] == acMem._id + ""){
                            depTas.splice(x,1);
                            break;
                        }
                    }
                    var facTas = actualFac.teachingAssistants;
                    for (let y = 0 ; y < facTas.length; y++){
                        if (facTas[y] == acMem._id + ""){
                            facTas.splice(y,1);
                            break;
                        }
                    }
                    await department.findByIdAndUpdate(actualDep._id, {"teachingAssistants": depTas});
                    console.log("member removed from department's teaching assistants");
                    await faculty.findByIdAndUpdate(actualFac._id, {"teachingAssistants": facTas});
                    console.log("member removed from faculty's teaching assistants");
                    for (let w = 0 ; w < c.length; w++){
                        var actualC2 = (await course.findById(c[w]));
                        var actualCTas = actualC2.teachingAssistants;
                        for (let t = 0; t < actualCTas.length; t++){
                            if (actualCTas[t] == acMem._id + ""){
                                actualCTas.splice(t,1);
                                break;
                            }
                        }
                        await course.findByIdAndUpdate(actualC._id, {"teachingAssistants": actualCTas});
                        console.log("member removed from course's teaching assistants");
                    }
                    if (acType == "CourseCoordinator"){
                        await course.findOneAndUpdate({"courseCoordinator": acMem._id}, {"courseCoordinator": "N/A"});
                        console.log("member removed from being course coordinator of the corresponding course");
                    }
                }
                //remove this member from slots and increment the number of unAssigned slots and recalculate the coverage
                for (let r = 0 ; r < s.length; r++){
                    var currSlot = await slot.findById(s[r]);
                    var slotCour = currSlot.course;
                    var cours = await course.findById(slotCour);
                    var oldunAssign = cours.numberOfSlotsAssigned;
                    var newUnAssign = oldunAssign - 1;
                    var nCov = newUnAssign/cours.numberOfSlotsNeeded;
                    await course.findByIdAndUpdate(cours._id, {"numberOfSlotsAssigned": newUnAssign, "coverage": nCov});
                    console.log("course coverage updated and number of unAssigned slots is incremented");
                    await slot.findByIdAndUpdate(s[r], {"memberID": null});
                    console.log("member removed from teaching slots");
                }
                //delete this member
                await members.findByIdAndDelete(mem[0]._id);
                console.log("member removed from members table");
                await academicMember.findByIdAndDelete(acMem._id);
                console.log("member removed from academic members table");
            }
            res.send("member deleted");
        }
    }   
});

HrRouter.route('/addSignIn/:id')
.put(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    let payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a member with the id = :id
        var mem = await members.find({"id": req.params.id});
        if(mem.length == 0){
            return res.status(400).send("member is not found");
        }
        //verify that the member is not doing it to himself
        else if (payload.id == req.params.id){
            return res.status(401).send("not authorized to do this route to yourself");
        }
        //get the date from the body
        else if (req.params.year == null){
            return res.status(400).send("year should be given in body");
        }else if (req.params.month == null){
            return res.status(400).send("month should be given in body");
        }
        else if (req.params.day == null){
            return res.status(400).send("day should be given in body");
        }
        else if (req.params.hour == null){
            return res.status(400).send("Hour should be given in body");
        }
        else if (req.params.minute == null){
            return res.status(400).send("minute should be given in body");
        }else{
            var SpentHours;
            var SpentMin ;
            var finalDuration;
            const d = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute);
            var rec = find({ $and: [{ "Memberid": mem[0]._id }, { "signIn": null}]});
            if (rec.length != 0){
                //check that the record is the same date as the body
                const givenYear = req.params.year;
                const givenMonth = req.params.month;
                const givenDay = req.params.day;
                const recYear = rec[0].signOut.getFullYear();
                const recMonth = rec[0].signOut.getMonth(); + 1; //because index in month starts by 0
                const recDay = rec[0].signOut.getDate();
                if (givenYear == recYear && givenMonth == recMonth && givenDay == recDay){
                    await attendance.findByIdAndUpdate(rec[0]._id, {"signIn": d});
                    console.log("sign in added");
                    var correspondingSignInHours= req.params.hour;
                    var correspondingSignInMinutes=req.params.minute;
                    var signOut = rec[0].signOut;
                    var correspondingSignOutHour=signOut.getHours();
                    var correspondingSignOutMin=signOut.getMinutes();
                    if(correspondingSignOutHour>19){
                        var time2 = new Date('1995-12-17T02:00:00')
                        var time = new Date('1995-12-17T19:00:00')
                        var timeHour2 = time2.getHours();
                        var timeHour = time.getHours();
                        finalDuration = (timeHour- (correspondingSignInHours-timeHour2))
                        console.log( correspondingSignInHours + "  d5l " + finalDuration + timeHour) ;
                
                    }
                    else{
                    SpentHours = (correspondingSignOutHour- correspondingSignInHours)
                    SpentMin = (correspondingSignOutMin- correspondingSignInMinutes)/60
                    if(SpentMin<0){
                        SpentMin=SpentMin/-1;
                       }
                       finalDuration = SpentMin + SpentHours;
                       console.log(finalDuration);
                    }
                    await attendance.findByIdAndUpdate(rec[0]._id, {"duration": finalDuration});
                    console.log("duration updated");
                    //decrement the missing days and hours
                    const oldMiss = await missing.findOne({"Memberid": mem[0]._id});
                    if (oldMiss){
                        oldMissH = oldMiss.missingHours;
                        nMissH = oldMissH - finalDuration;
                        oldRemH = oldMiss.remainingHours;
                        nRemH = oldRemH - finalDuration;
                        oldMissD = oldMiss.missingDays;
                        nMissD = oldMissD - 1;
                        oldRemD = oldMiss.remainingDays;
                        nRemD = oldRemD - 1;
                        await missing.findOneAndUpdate({"Memberid": mem[0]._id},{"missingHours": nMissH , "remainingHours":nRemH , "missingDays": nMissD , "remainingDays":nRemD});
                        console.log("missings updated");
                    } 
                    res.send("sign in added");
                }else{
                    return res.status(400).send("there is no record missing a signIn at this date");
                }
            }else{
                return res.status(400).send("there is no record missing a signIn");
            }  
        }
    }
});

HrRouter.route('/addSignOut/:id')
.put(async(req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    let payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a member with the id = :id
        var mem = await members.find({"id": req.params.id});
        if(mem.length == 0){
            return res.status(400).send("member is not found");
        }
        //verify that the member is not doing it to himself
        else if (payload.id == req.params.id){
            return res.status(401).send("not authorized to do this route to yourself");
        }
        //get the date from the body
        else if (req.params.year == null){
            return res.status(400).send("year should be given in body");
        }else if (req.params.month == null){
            return res.status(400).send("month should be given in body");
        }
        else if (req.params.day == null){
            return res.status(400).send("day should be given in body");
        }
        else if (req.params.hour == null){
            return res.status(400).send("Hour should be given in body");
        }
        else if (req.params.minute == null){
            return res.status(400).send("minute should be given in body");
        }else{
            var SpentHours;
            var SpentMin ;
            var finalDuration;
            const d = new Date(req.params.year, req.params.month, req.params.day, req.params.hour, req.params.minute);
            var rec = find({ $and: [{ "Memberid": mem[0]._id }, { "signOut": null}]});
            if (rec.length != 0){
                //check that the record is the same date as the body
                const givenYear = req.params.year;
                const givenMonth = req.params.month;
                const givenDay = req.params.day;
                const recYear = rec[0].signIn.getFullYear();
                const recMonth = rec[0].signIn.getMonth(); + 1; //because index in month starts by 0
                const recDay = rec[0].signIn.getDate();
                if (givenYear == recYear && givenMonth == recMonth && givenDay == recDay){
                    await attendance.findByIdAndUpdate(rec[0]._id, {"signOut": d});
                    console.log("sign out added");
                    var correspondingSignOutHours= req.params.hour;
                    var correspondingSignOutMinutes=req.params.minute;
                    var signIn = rec[0].signIn;
                    var correspondingSignInHour=signIn.getHours();
                    var correspondingSignInMin=signIn.getMinutes();
                    if(correspondingSignOutHour>19){
                        var time2 = new Date('1995-12-17T02:00:00')
                        var time = new Date('1995-12-17T19:00:00')
                        var timeHour2 = time2.getHours();
                        var timeHour = time.getHours();
                        finalDuration = (timeHour- (correspondingSignInHours-timeHour2))
                        console.log( correspondingSignInHours + "  d5l " + finalDuration + timeHour) ;
                    }
                    else{
                    SpentHours = (correspondingSignOutHour- correspondingSignInHours)
                    SpentMin = (correspondingSignOutMin- correspondingSignInMinutes)/60
                    if(SpentMin<0){
                        SpentMin=SpentMin/-1;
                       }
                       finalDuration = SpentMin + SpentHours;
                       console.log(finalDuration);
                    }
                    await attendance.findByIdAndUpdate(rec[0]._id, {"duration": finalDuration});
                    console.log("duration updated");
                    //decrement the missing days and hours
                    const oldMiss = await missing.findOne({"Memberid": mem[0]._id});
                    if (oldMiss){
                        oldMissH = oldMiss.missingHours;
                        nMissH = oldMissH - finalDuration;
                        oldRemH = oldMiss.remainingHours;
                        nRemH = oldRemH - finalDuration;
                        oldMissD = oldMiss.missingDays;
                        nMissD = oldMissD - 1;
                        oldRemD = oldMiss.remainingDays;
                        nRemD = oldRemD - 1;
                        await missing.findOneAndUpdate({"Memberid": mem[0]._id},{"missingHours": nMissH , "remainingHours":nRemH , "missingDays": nMissD , "remainingDays":nRemD});
                        console.log("missings updated");
                    } 
                    res.send("sign out added");
                }else{
                    return res.status(400).send("there is no record missing a signIn at this date");
                }
            }else{
                return res.status(400).send("there is no record missing a signIn");
            }  
        }
    }
});

HrRouter.route('/viewAttendance/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //view the attendance record of this member
});

HrRouter.route('/viewMissing')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //view members with missings more than 0
});

HrRouter.route('/updateSalary/:id')
.get((req,res,next) =>{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    //verify that there is a member with this id
    //compute the deductions using the missings table
});

module.exports = HrRouter;

