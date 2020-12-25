const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const key = 'shawerma';
var validator = require('validator');
const faculty = require('../models/faculty');
const Location = require('../models/location.js');
const academicMember = require('../models/academicMember');
const { memberSchema, findById, findOne } = require('../models/members');
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
    try{
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
                //validate the types
                if ((typeof(req.body.name) == 'string') && (typeof(req.body.type) == 'string') && (typeof(req.body.capacity) == 'number')){
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
                            type: req.body.type,
                            capacitySoFar: 0
                        });
                        await loc.save();
                        res.send("location added");
                        console.log("Location added");
                    }   
                }else{
                    return res.status(400).send("wrong data types");
                }
            }
        }
}catch(err){
    res.status(500).json({err:err.message})
}
});

HrRouter.route('/deleteLocation/:name')
.delete(async(req,res,next) =>{
    try{
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
}catch(err){
        res.status(500).json({err:err.message})
    }
});

HrRouter.route('/updateLocation/:name')
.put( async(req,res,next) =>{
    try{
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
                    if (typeof(req.body.capacity) == 'number'){
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
                }else{
                    return res.status(400).send("wrong data types");
                }
            } 
        } 
    }
}catch(err){
    res.status(500).json({err:err.message})
}
});

HrRouter.route('/addFaculty')
.post(async (req,res,next) =>{
    try{
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
            if (typeof(req.body.name) == 'string'){
                //all data required are given
                const n = await faculty.find({"name": req.body.name});
                if (n != 0){
                    return res.status(400).send("there exists a faculty with this name");
                }else{
                    var nYears = 0;
                    if (req.body.numberOfYears != null){
                        if (typeof(req.body.numberOfYears) == 'number'){
                            nYears = req.body.numberOfYears;
                        }else{
                            return res.status(400).send("wrong data type");
                        }
                    }
                    //add a new faculty
                    const f = new faculty({
                        name: req.body.name,
                        departments: [],
                        teachingAssistants:[],
                        instructors:[],
                        numberOfYears: nYears
                    });
                    // console.log(f);
                    await f.save();
                    res.send("faculty added");
                }
            }       
        }
    }
}catch(err){
    res.status(500).json({err:err.message})
}
});

HrRouter.route('/updateFaculty/:name')
.put(async (req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //console.log(req.params.name);
        //verify that there is a faculty with the name = :name
        const fac = await faculty.find({"name": req.params.name});
        console.log(fac);
        if(fac.length == 0){
            return res.status(400).send("name of faculty is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.number != null){
                if (typeof(req.body.number) == 'number'){
                    //update the existing faculty
                    await faculty.findOneAndUpdate({"name": req.params.name}, {"numberOfYears": req.body.number});
                    res.send("faculty number of years is updated")
                }
            }
        }
    }
}catch(err){
    res.status(500).json({err:err.message})
}
});

HrRouter.route('/deleteFaculty/:name')
.delete(async (req,res,next) =>{
    try{
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
                await academicMember.findByIdAndUpdate(m[i]._id, {"faculty": null});
            }
            const d = await department.find({"facultyName": req.params.name});
            for (let j = 0 ; j < d.length; j++){
                await department.findByIdAndUpdate(d[j]._id, {"facultyName": null});
            }
            await faculty.findOneAndDelete({"name": req.params.name});
            res.send("faculty deleted ,faculty name at corresponding department is removed ,faculty name for corresponding academic members is removed" );
        }   
    }
}catch(err){
    res.status(500).json({err:err.message})
}
});

HrRouter.route('/addDepartment')
.post(async(req,res,next) =>{
    try{
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
        //}else if (req.body.headOfDepartment == null){
          //  return res.status(400).send("name of head of department should be given in body");
        }else{
            if ((typeof(req.body.name) == 'string') && (typeof(req.body.faculty) == 'string')){
                //all data required are given
                //make sure this department does not exist in other faculties
                const otherDep = (await department.find({"name": req.body.name}));
                if (otherDep.length != 0){
                    return res.status(400).send("there exists a department with this name");
                }else{
                    let c = "";
                    if (req.body.code != null && typeof(req.body.code) == 'string'){
                        c = req.body.code;
                    }
                    let f = null;
                    const fa = (await faculty.find({"name": req.body.faculty}));
                    if(fa.length == 0){
                        return res.status(400).send("there does not exist a faculty with this name");
                    }else{
                        f = fa[0];
                        const instA =[];
                        const d = new department({
                            name: req.body.name,
                            code: c,
                            facultyName: req.body.faculty,
                            instructors: instA
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
                        // }
                    }
                }
            }
        } 
    }
    }catch(err){
        res.status(500).json({err:err.message})
    }     
});

HrRouter.route('/updateDepartment/:name')
.put( async (req,res,next) =>{
    try{
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
             if (req.body.code != null && typeof(req.body.code) == 'string'){
                    //update the existing faculty
                     await department.findOneAndUpdate({"name": req.params.name}, {"code": req.body.code});
                     console.log("code updated");
             }
             if (req.body.headOfDepartment != null && typeof(req.body.headOfDepartment) == 'string'){
                const h1 = (await members.find({"id" : {$regex:[req.body.headOfDepartment]}}))[0];
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
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/deleteDepartment/:name')
.delete(async(req,res,next) =>{
    try{
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
                await academicMember.findByIdAndUpdate(m[i]._id, {"department": null });
            }
            const head = dep[0].headOfDep;
            await academicMember.findByIdAndUpdate(head, {"type": "CourseInstructor"});
            const f = await faculty.find({"name": dep[0].facultyName});
            if (f.length != 0){
                const fd = f[0].departments;
                for (let j = 0 ; j < fd.length; j++){
                    if (fd[j] == dep[0]._id +""){
                        fd.splice(j,1);
                    }
                }
                console.log(f[0]);
                console.log(fd);
                await faculty.findByIdAndUpdate(f[0]._id, {"departments": fd});
            }
            await department.findOneAndDelete({"name": req.params.name});
            res.send("department deleted ,faculty of this department no longer includes this department ,department name for corresponding academic members is removed" );
        }  
    } 
}catch(err){
    res.status(500).json({err:err.message})
}   
});

HrRouter.route('/addCourse')
.post(async (req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null || typeof(req.body.name) != 'string'){
            return res.status(400).send("name of course should be given in body");
        }else if (req.body.code == null || typeof(req.body.code) != 'string'){
            return res.status(400).send("course  code should be given in body");
        }else if (req.body.numberOfSlotsNeeded == null || typeof(req.body.numberOfSlotsNeeded) != 'number'){
            return res.status(400).send("name of head of department should be given in body");
        }else if (req.body.creditHours == null || typeof(req.body.creditHours) != 'number'){
            return res.status(400).send("credit hours of course should be given in body");
        }else if (req.body.department== null || typeof(req.body.department) != 'string'){
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
}catch(err){
    res.status(500).json({err:err.message})
}    
});

HrRouter.route('/updateCourse/:name')
.put(async (req,res,next) =>{
    try{
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
        var cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.creditHours != null && typeof(req.body.creditHours) == 'number'){
                    //update the existing course
                     await course.findOneAndUpdate({"name": req.params.name}, {"creditHours": req.body.creditHours});
                     //res.send("course credit hours is updated")
             }
             if (req.body.numberOfSlotsNeeded != null && typeof(req.body.numberOfSlotsNeeded) == 'number'){
                //update the existing course
                //console.log(cour[0].numberOfSlotsAssigned);
                const cov = cour[0].numberOfSlotsAssigned/req.body.numberOfSlotsNeeded;
                //console.log(cov);
                await course.findOneAndUpdate({"name": req.params.name}, {"numberOfSlotsNeeded": req.body.numberOfSlotsNeeded , "coverage": cov});
                console.log("course number of needed slots and coverage are updated")
         }
         res.send("course updated");
        }
    }
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/deleteCourse/:name')
.delete(async(req,res,next) =>{
    try{
     //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a department with the name = :name
        var cour = await course.find({"name": req.params.name});
        if(cour.length == 0){
            return res.status(400).send("name of course is not found");
        }
        else{
            //get the department from the body
            if (req.body.department == null || typeof(req.body.department) != 'string'){
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
                        if (s[i].course == cour[0]._id + ""){
                            //console.log(s[i]);
                            const teacher = s[i].memberid;
                            const corTeacher = await academicMember.findById(teacher);
                            if(corTeacher){
                                const sched = corTeacher.schedule;
                                for (let q = 0 ; q < sched.length; q++){
                                    if (sched[q]._id == s[i]._id + ""){
                                        sched.splice(q,1);
                                    }
                                }
                                await academicMember.findByIdAndUpdate(corTeacher._id, {"schedule": sched});
                                console.log("slot deleted from member schedule");
                            }   
                            await slot.findByIdAndDelete(s[i]._id);
                                console.log("slot deleted");
                        }  
                    }
                    //delete the course from academic members and make the coordinator back to academic member
                    const coordinator = cour[0].courseCoordinator;
                    const m = await academicMember.find({});
                    for (let j = 0 ; j < m.length ; j++){
                        const mC = m[j].courses;
                        for (let z = 0 ; z < mC.length; z++){
                            if (mC._id == cour[0]._id + ""){
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
                        if (dC[w]._id == cour[0]._id + ""){
                            dC.splice(w,1);
                        }
                    }
                    await department.findByIdAndUpdate(dep[0]._id, {"courses": dC});
                    console.log("course removed from department");
                    await course.findByIdAndDelete(cour[0]._id);
                    res.send("course deleted");
                }
            }
        }  
    } 
}catch(err){
    res.status(500).json({err:err.message})
}  
});

HrRouter.route('/addStaffMember')
.post(async (req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that the needed credentials are given
        if (req.body.name == null || typeof(req.body.name) != 'string'){
            return res.status(400).send("name of member should be given in body");
        }else if (req.body.type == null || typeof(req.body.type) != 'string'){
            return res.status(400).send("type of member (whether academic or HR) should be given in body");
        }else if (req.body.email== null || !(validator.isEmail(req.body.email))){
            return res.status(400).send("email of member should be given in body");
        }else if (req.body.salary == null || typeof(req.body.salary) != 'number'){
            return res.status(400).send("salary of member should be given in body");
        }else if (req.body.officeLocation== null || typeof(req.body.officeLocation) != 'string'){
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
                let phoneNumber = 0;
                let SecondayMail = "";
                let gender = "";
                if (req.body.phoneNumber != null && typeof(req.body.phoneNumber) == 'number'){
                    phoneNumber = req.body.phoneNumber;
                }
                if (req.body.SecondayMail != null && typeof(req.body.SecondayMail) == 'string'){
                    SecondayMail = req.body.SecondayMail;
                }
                if (req.body.gender != null && typeof(req.body.gender) == 'string'){
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
                    if (req.body.faculty == null || typeof(req.body.faculty) != 'string'){
                        return res.status(400).send("faculty should be given in body");
                    }else if(req.body.department == null || typeof(req.body.department) != 'string'){
                        return res.status(400).send("department should be given in body");
                    }else if (req.body.dayOff == null || typeof(req.body.dayOff) != 'string'){
                        return res.status(400).send("dayOff of academic member should be given in body");
                    } else if (req.body.academicType== null || typeof(req.body.academicType) != 'string'){
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
                            if (ids.length == 0){
                                nID = 1;
                            }else{
                            console.log(ids);
                            const maxID = ids[ids.length - 1];
                            console.log(maxID);
                            const toBeParsed = maxID.id.substring(3);
                            const iID = parseInt(toBeParsed);
                            nID = iID + 1;  
                            }
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
                    gender: gender,
                    dayOff: dOff
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
                        await faculty.findOneAndUpdate({"name":req.body.faculty}, {"instructors": oldMem});
                        console.log("academic member added to instructors of this faculty");
                    }else{
                        //an academic member
                        oldMem = dep[0].teachingAssistants;
                        oldMem.push(acID[0]._id);
                        await department.findOneAndUpdate({"name":req.body.department}, {"teachingAssistants": oldMem});
                        console.log("academic member added to teaching assistants of this department");
                        await faculty.findOneAndUpdate({"name":req.body.faculty}, {"teachingAssistants": oldMem});
                        console.log("academic member added to teachingAssistants of this faculty");
                    }
                }
            }
            res.send("member added");
        }       
    } 
}catch(err){
    res.status(500).json({err:err.message})
}    
});

HrRouter.route('/updateStaffMember/:id')
.put(async(req,res,next) =>{
    try{
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
             if (req.body.officeLocation != null && typeof(req.body.officeLocation) == 'string'){
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
                    if(nextO[0].capacitySoFar + 1 <= nextO[0].capacity){
                        const nC = oldC - 1;
                        await Location.findByIdAndUpdate(prevOid, {"capacitySoFar": nC});
                        console.log("old office capacity decremented");
                        const nextC = nextO[0].capacitySoFar + 1;
                        await Location.findByIdAndUpdate(nextO[0]._id, {"capacitySoFar": nextC});
                        console.log("new office capacity so far is incremented");
                        //update this member
                        await members.findOneAndUpdate({"id": req.params.id}, {"officeLocation": nextO[0]._id});
                        console.log("member office updated");
                    }else{
                        return res.status(400).send("capacity of new office exceeded");
                    }
                }
             }else{
                return res.status(400).send("wrong data type");
             }
             res.send("staff member updated");
        }  
    }
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/deleteStaffMember/:id')
.delete(async(req,res,next) =>{
    try{
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
                var aDep = (await department.find({"name": dep}));
                var aFac = (await faculty.find({"name": fac}));
                if (aDep.length !=0 && aFac.length !=0){
                    var actualDep = aDep[0];
                    var actualFac = aFac[0];
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
                            await department.findByIdAndUpdate(actualDep._id, {"headOfDep": null});
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
                            await course.findOneAndUpdate({"courseCoordinator": acMem._id}, {"courseCoordinator": null});
                            console.log("member removed from being course coordinator of the corresponding course");
                        }
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
            }else{
                await members.findByIdAndDelete(mem[0]._id);
                console.log("member removed from members table");
            }
            res.send("member deleted");
        }
    } 
}catch(err){
    res.status(500).json({err:err.message})
}   
});

HrRouter.route('/assignHod/:depName')
.put(async(req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a department with the name = :depName
        var dep = await department.find({"name": req.params.depName});
        if(dep.length == 0){
            return res.status(400).send("department is not found");
        }
        else{
             //verify that the needed credentials are given
             if (req.body.id != null && typeof(req.body.id) == 'string'){
                 var hodM = await members.findOne({"id": req.body.id});
                 if (hodM){
                     var hod = await academicMember.findOne({"Memberid": hodM});
                     if (hod){
                        if (hod.department != req.params.depName +""){
                            return res.status(400).send("this member is not in this department");
                        }else{
                            await academicMember.findByIdAndUpdate(hod._id, {"type": "HeadOfDepartment"});
                            console.log("type of member changed to hod");
                            const inst = dep[0].instructors;
                            inst.push(hod._id);
                            //console.log(hod._id);
                            await department.findByIdAndUpdate(dep[0]._id, {"instructors": inst, "headOfDep": hod._id});
                            console.log("member added to instructors array in department");
                            console.log("department hod is assigned to department");
                            res.send("hod assigned");
                        }
                    }
                }  
            }
        }
    }
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/addSignIn/:id')
.put(async(req,res,next) =>{
    try{
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
        else if (req.body.year == null || typeof(req.body.year) != 'number'){
            return res.status(400).send("year should be given in body");
        }else if (req.body.month == null || typeof(req.body.month) != 'number'){
            return res.status(400).send("month should be given in body");
        }
        else if (req.body.day == null || typeof(req.body.day) != 'number'){
            return res.status(400).send("day should be given in body");
        }
        else if (req.body.hour == null || typeof(req.body.hour) != 'number'){
            return res.status(400).send("Hour should be given in body");
        }
        else if (req.body.minute == null || typeof(req.body.minute) != 'number'){
            return res.status(400).send("minute should be given in body");
        }else{
            var SpentHours;
            var SpentMin ;
            var finalDuration;
            const d = new Date(req.body.year, req.body.month-1, req.body.day, req.body.hour, req.body.minute);
            var rec = attendance.find({ $and: [{ "Memberid": mem[0]._id }, { "signIn": null}]});
            if (rec.length != 0){
                //check that the record is the same date as the body
                const givenYear = req.body.year;
                const givenMonth = req.body.month -1;
                const givenDay = req.body.day;
                const recYear = rec[0].signOut.getFullYear();
                const recMonth = rec[0].signOut.getMonth(); + 1; //because index in month starts by 0
                const recDay = rec[0].signOut.getDate();
                if (givenYear == recYear && givenMonth == recMonth && givenDay == recDay){
                    await attendance.findByIdAndUpdate(rec[0]._id, {"signIn": d});
                    console.log("sign in added");
                    var correspondingSignInHours= req.body.hour;
                    var correspondingSignInMinutes=req.body.minute;
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
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/addSignOut/:id')
.put(async(req,res,next) =>{
    try{
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
        else if (req.body.year == null || typeof(req.body.year) != 'number'){
            return res.status(400).send("year should be given in body");
        }else if (req.body.month == null || typeof(req.body.month) != 'number'){
            return res.status(400).send("month should be given in body");
        }
        else if (req.body.day == null || typeof(req.body.day) != 'number'){
            return res.status(400).send("day should be given in body");
        }
        else if (req.body.hour == null || typeof(req.body.hour) != 'number'){
            return res.status(400).send("Hour should be given in body");
        }
        else if (req.body.minute == null || typeof(req.body.minute) != 'number'){
            return res.status(400).send("minute should be given in body");
        }else{
            var SpentHours;
            var SpentMin ;
            var finalDuration;
            const d = new Date(req.body.year, req.body.month-1, req.body.day, req.body.hour, req.body.minute);
            var rec = await attendance.find({ $and: [{ "Memberid": mem[0]._id }, { "signOut": null}]});
            if (rec.length != 0){
                
                //check that the record is the same date as the body
                const givenYear = req.body.year;
                const givenMonth = req.body.month - 1;
                const givenDay = req.body.day;
                const recYear = rec[0].signIn.getFullYear();
                const recMonth = rec[0].signIn.getMonth(); + 1; //because index in month starts by 0
                const recDay = rec[0].signIn.getDate();
                if (givenYear == recYear && givenMonth == recMonth && givenDay == recDay){
                    
                    await attendance.findByIdAndUpdate(rec[0]._id, {"signOut": d});
                    console.log("sign out added");
                    var correspondingSignOutHours= req.body.hour;
                    console.log(correspondingSignOutHours);
                    var correspondingSignOutMinutes=req.body.minute;
                    var signIn = rec[0].signIn;
                    var correspondingSignInHour=signIn.getHours();
                    var correspondingSignInMin=signIn.getMinutes();
                    if(correspondingSignInHour<7){
                        var time2 = new Date('1995-12-17T02:00:00')
                        var time = new Date('1995-12-17T19:00:00')
                        var timeHour2 = time2.getHours();
                        var timeHour = time.getHours();
                        finalDuration = (timeHour- (correspondingSignOutHours-timeHour2))
                        console.log( correspondingSignOutHours + "  d5l " + finalDuration + timeHour) ;
                    }
                    else{
                    SpentHours = ( correspondingSignOutHours-correspondingSignInHour)
                    SpentMin = ( correspondingSignOutMinutes-correspondingSignInMin)/60
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
                    return res.status(400).send("there is no record missing a signout at this date");
                }
            }else{
                return res.status(400).send("there is no record missing a signout");
            }  
        }
    }
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/viewAttendance/:id')
.get(async(req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
      //verify that there is a member with this id
      const m = await members.find({"id": req.params.id});
      if (m.length == 0){
        return res.status(400).send("there is no member with this id");
      }else{
        //view the attendance record of this member
        const a = await attendance.find({"Memberid": m[0]._id});
        res.send(a);
        console.log("attendace shown");
      }
    }  
}catch(err){
    res.status(500).json({err:err.message})
}         
});

HrRouter.route('/viewMissing')
.get(async(req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //view the missings table
        const miss = await missing.find();
        res.send(miss);
        console.log("missing shown");
    } 
}catch(err){
    res.status(500).json({err:err.message})
} 
});

HrRouter.route('/updateSalary/:id')
.put(async(req,res,next) =>{
    try{
    //authenticate that this is a valid member
    //authorize that this is a Hr member
    const payload = jwt.verify(req.header('auth-token'),key);
    //console.log(payload.id);
    if (!((payload.id).includes("hr"))){ 
        //console.log(payload.id);
        return res.status(401).send("not authorized");
    }else{
        //verify that there is a member with this id
        const m = await members.find({"id": req.params.id});
        if (m.length == 0 ){
            return res.status(400).send("there is no member with this id");
        }else{
            //check if there is a promotion
            if (req.body.newSalary != null && typeof(req.body.newSalary) == 'number'){
                //update the salary
                //validate that it is a number
               await members.findByIdAndUpdate(m[0]._id, {"salary": req.body.newSalary});

            }
            //apply the deductions if any
            let miss = await missing.findOne({"Memberid": m[0]._id});
            if (miss != null){
                var missingDays = miss.missingDays;
                var missingHours = miss.missingHours;
                var mSalary = ((await members.findById(m[0]._id))).salary;
                var dayDed = missingDays * (mSalary/60);
                let hourDed = 0;
                let minDed = 0;
                if (missingHours >= 3){
                    hourDed =Math.floor(missingHours) * (mSalary/180);
                    minDed = (missingHours - (Math.floor(missingHours))) * 60 * (mSalary/180*60);
                }
                mSalary = mSalary - dayDed - hourDed - minDed;
                await members.findByIdAndUpdate(m[0]._id, {"salarySoFar": mSalary});
                console.log("salary deducted");
            }
            res.send("Salary updated");
        }
    } 
}catch(err){
    res.status(500).json({err:err.message})
} 
});

module.exports = HrRouter;